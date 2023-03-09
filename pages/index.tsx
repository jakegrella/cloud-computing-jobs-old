import { useEffect, useState } from "react";
import {
  CompanyJobCard,
  CompanyLocationJobsCard,
  Head,
  Map,
  SearchInput,
} from "../components";
import { useStore } from "../store";
import { IJob, ILocation } from "../types";
import { useWindowDimensions } from "../utils/hooks";
import { fetchJobs, fetchMappableLocations } from "../utils/httpRequests";
import styles from "./index.module.css";

// on page load
// -> retrieve and handle user location
// -> get newest jobs (limit 10)

let timeout: NodeJS.Timeout;

export default function Home() {
  const [
    initHomeMap,
    setInitHomeMap,
    homeMapLocations,
    setHomeMapLocations,
    homeMapLocationsWithJobs,
    setHomeMapLocationsWithJobs,
    setHomeMapLocationsWithoutJobs,
    setJobs,
    homePageView,
    mapBounds,
  ] = useStore((state) => [
    state.initHomeMap,
    state.setInitHomeMap,
    state.homeMapLocations,
    state.setHomeMapLocations,
    state.homeMapLocationsWithJobs,
    state.setHomeMapLocationsWithJobs,
    state.setHomeMapLocationsWithoutJobs,
    state.setJobs,
    state.homePageView,
    state.mapBounds,
  ]);
  const [newJobs, setNewJobs] = useState([]);

  const { width } = useWindowDimensions();

  // TODO: do we want to get user location on page load?
  // useEffect(() => {
  //   // request user location
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       // set map center to user location
  //       setInitHomeMap({
  //         center: { lat: latitude, lng: longitude },
  //         zoom: 12,
  //       });
  //     },
  //     () => {
  //       // set map center to NYC
  //       setInitHomeMap({
  //         center: { lat: 40.741895, lng: -73.989308 },
  //         zoom: 12,
  //       });
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // on update to map region
  useEffect(() => {
    console.log("mapBounds", mapBounds);
    if (mapBounds !== undefined) {
      // use timeout to prevent multiple fetches
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const bounds = {
          latMin: mapBounds.south,
          latMax: mapBounds.north,
          lngMin: mapBounds.west,
          lngMax: mapBounds.east,
        };

        async function getMappableLocations() {
          // fetch jobs in current map region
          try {
            const mappableLocations = await fetchMappableLocations(bounds);
            console.log("mappableLocations", mappableLocations);
            // set state for all mappable locations
            setHomeMapLocations(mappableLocations);

            // filter for only locations with jobs
            const mappableLocationsWithJobs = mappableLocations.filter(
              (location) => location.jobs.length
            );
            setHomeMapLocationsWithJobs(mappableLocationsWithJobs);
            // extract and update jobs
            let mappableJobs = [];
            mappableLocationsWithJobs.forEach((location) =>
              mappableJobs.push(...location.jobs)
            );
            console.log("mappableJobs", mappableJobs);
            setJobs(mappableJobs);

            // filter for only locations without jobs
            const mappableLocationsWithoutJobs = mappableLocations.filter(
              (location) => !location.jobs.length
            );
            setHomeMapLocationsWithoutJobs(mappableLocationsWithoutJobs);
          } catch (err) {
            console.error(err.message);
          }
        }
        getMappableLocations();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapBounds]);

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main className={styles.home}>
        <div className={styles.dataContainer}>
          <SearchInput />

          <div className={styles.jobsContainer}>
            {homeMapLocationsWithJobs.length ? (
              homeMapLocationsWithJobs.map((location: ILocation) => (
                <CompanyLocationJobsCard
                  key={location.id}
                  location={location}
                />
              ))
            ) : (
              <p className={styles.noneFound}>
                No companies found in mapped region. Try searching in a larger
                area or changing filters.
              </p>
            )}
          </div>
        </div>
        <div className={styles.mapContainer}>
          <Map
            center={initHomeMap.center}
            zoom={initHomeMap.zoom}
            locations={homeMapLocationsWithJobs} // could do homeMapLocations
            showMarkerInfoOverlay={
              width < 768 && homePageView === "map" ? true : false
            }
          />
        </div>
      </main>
    </div>
  );
}

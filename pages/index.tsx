import { useEffect, useState } from "react";
import { Card, Head, ListItem, Map, Search } from "../components";
import { useStore } from "../store";
import { ILocation } from "../types";
import { useWindowDimensions } from "../utils/hooks";
import { httpGetMappableLocations } from "../utils/httpRequests";
import styles from "./home.module.css";

let timeout: NodeJS.Timeout;

export default function Home() {
  const [initHomeMap, setInitHomeMap, mapBounds, homePageView, jobs, setJobs] =
    useStore((state) => [
      state.initHomeMap,
      state.setInitHomeMap,
      state.mapBounds,
      state.homePageView,
      state.jobs,
      state.setJobs,
    ]);
  const { width } = useWindowDimensions();
  const [locations, setLocations] = useState<ILocation[]>([]);

  // on page load
  useEffect(() => {
    // request user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // set map center to user location
        setInitHomeMap({
          center: { lat: latitude, lng: longitude },
          zoom: 12,
        });
      },
      () => {
        // set map center to NYC
        setInitHomeMap({
          center: { lat: 40.741895, lng: -73.989308 },
          zoom: 12,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on update to map region
  useEffect(() => {
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

        async function getMappableLocationsWithJobs() {
          // fetch jobs in current map region
          const mappableLocations = await httpGetMappableLocations(bounds);
          // filter for only locations with jobs
          const mappableLocationsWithJobs = mappableLocations.filter(
            (location) => location.jobs.length
          );
          setLocations(mappableLocationsWithJobs);

          let mappableJobs = [];
          mappableLocationsWithJobs.forEach((location) =>
            mappableJobs.push(...location.jobs)
          );
          setJobs(mappableJobs);
        }
        getMappableLocationsWithJobs();
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
        <Search
          placeholder={
            width > 768
              ? "Search by location, company, job title, etc."
              : "Search"
          }
        />

        <div className={`${styles.home_content} ${styles[homePageView]}`}>
          <Map
            center={initHomeMap.center}
            zoom={initHomeMap.zoom}
            cardClassName={styles.home_content_mapCard}
            locations={locations}
            showMarkerInfoOverlay={
              width < 768 && homePageView === "map" ? true : false
            }
          />

          <Card unpadded className={styles.home_content_jobList}>
            {jobs.length ? (
              jobs.map((i) => <ListItem key={i.id} job={i} />)
            ) : (
              <p className={styles.noneFound}>
                No jobs found in mapped region. Try searching in a larger area
                or changing filters.
              </p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

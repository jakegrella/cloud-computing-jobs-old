import { useEffect } from "react";
import { CompanyLocationCard, Head, Map, SearchInput } from "../components";
import { useStore } from "../store";
import { IJob, ILocation } from "../types";
import { useWindowDimensions } from "../utils/hooks";
import { fetchJobs, fetchMappableLocations } from "../utils/httpRequests";
import styles from "@/styles/home.module.css";

// on page load
// -> retrieve and handle user location
// -> get newest jobs (limit 10)

let timeout: NodeJS.Timeout;

function ViewButtonGroup() {
  const [homePageView, setHomePageView] = useStore((state) => [
    state.homePageView,
    state.setHomePageView,
  ]);

  function handleClick({ target }) {
    setHomePageView(target.innerHTML.toLowerCase());
  }

  return (
    <div className={styles.buttonGroup}>
      <div
        className={`${styles.buttonBackground} ${styles[homePageView]}`}
      ></div>
      <button onClick={handleClick}>Map</button>
      <button onClick={handleClick}>List</button>
    </div>
  );
}

export default function Home() {
  const [
    initHomeMap,
    setInitHomeMap,
    homeMapLocations,
    setHomeMapLocations,
    homePageView,
    setHomePageView,
    mapBounds,
  ] = useStore((state) => [
    state.initHomeMap,
    state.setInitHomeMap,
    state.homeMapLocations,
    state.setHomeMapLocations,
    state.homePageView,
    state.setHomePageView,
    state.mapBounds,
  ]);

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
    if (mapBounds !== undefined) {
      // use timeout to prevent multiple fetches
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const bounds = {
          latMin: mapBounds.getSouth().toString(),
          latMax: mapBounds.getNorth().toString(),
          lngMin: mapBounds.getWest().toString(),
          lngMax: mapBounds.getEast().toString(),
        };

        async function getMappableLocations() {
          // fetch jobs in current map region
          try {
            const mappableLocations = await fetchMappableLocations(bounds);

            // filter for only locations with jobs
            const mappableLocationsWithJobs = mappableLocations.filter(
              (location) => location.jobs.length
            );

            // set state for mappable locations with jobs
            setHomeMapLocations(mappableLocationsWithJobs);
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

          {width <= 768 && <ViewButtonGroup />}

          <div
            className={styles.jobsContainer}
            style={{
              display:
                width > 768 || homePageView === "list" ? "inherit" : "none",
            }}
          >
            {homeMapLocations.length ? (
              homeMapLocations.map((location: ILocation) => (
                <CompanyLocationCard key={location.id} location={location} />
              ))
            ) : (
              <p>
                No companies found in mapped region.
                <br />
                Try searching in a larger area or changing filters.
              </p>
            )}
          </div>
        </div>

        <div
          className={styles.mapContainer}
          style={{
            display: width > 768 || homePageView !== "list" ? "unset" : "none",
          }}
        >
          <Map
            center={initHomeMap.center}
            zoom={initHomeMap.zoom}
            locations={homeMapLocations}
          />
        </div>
      </main>
    </div>
  );
}

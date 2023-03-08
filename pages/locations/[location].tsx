import { useEffect } from "react";
import { Card, Head, ListItem, Map } from "../../components";
import { useStore } from "../../store";
import { useWindowDimensions } from "../../utils/hooks";
import { fetchMappableLocations } from "../../utils/httpRequests";
import styles from "./home.module.css";

let timeout: NodeJS.Timeout;

export default function JobsByLocation() {
  const [
    initHomeMap,
    setInitHomeMap,
    mapBounds,
    homePageView,
    setJobs,
    homeMapLocations,
    setHomeMapLocations,
    homeMapLocationsWithJobs,
    setHomeMapLocationsWithJobs,
    homeMapLocationsWithoutJobs,
    setHomeMapLocationsWithoutJobs,
  ] = useStore((state) => [
    state.initHomeMap,
    state.setInitHomeMap,
    state.mapBounds,
    state.homePageView,
    state.setJobs,
    state.homeMapLocations,
    state.setHomeMapLocations,
    state.homeMapLocationsWithJobs,
    state.setHomeMapLocationsWithJobs,
    state.homeMapLocationsWithoutJobs,
    state.setHomeMapLocationsWithoutJobs,
  ]);

  const { width } = useWindowDimensions();

  // TODO: if a user hits location page directly, need to fetch info
  // fetch jobs on page load
  useEffect(() => {
    console.log("page load mapBounds", mapBounds);
  }, []);

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
            console.log("hit error");
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
        <div className={`${styles.home_content} ${styles[homePageView]}`}>
          <Map
            center={initHomeMap.center}
            zoom={initHomeMap.zoom}
            locations={homeMapLocations}
            showMarkerInfoOverlay={
              width < 768 && homePageView === "map" ? true : false
            }
          />

          <Card unpadded className={styles.home_content_jobList}>
            {homeMapLocations.length ? (
              [...homeMapLocationsWithJobs, ...homeMapLocationsWithoutJobs].map(
                (l) => <ListItem key={l.id} location={l} />
              )
            ) : (
              <p className={styles.noneFound}>
                No companies found in mapped region. Try searching in a larger
                area or changing filters.
              </p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

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
    homeMapLocations,
    setHomeMapLocations,
  ] = useStore((state) => [
    state.initHomeMap,
    state.setInitHomeMap,
    state.mapBounds,
    state.homePageView,
    state.homeMapLocations,
    state.setHomeMapLocations,
  ]);

  const { width } = useWindowDimensions();

  // TODO: if a user hits location page directly, need to fetch info
  // fetch jobs on page load
  useEffect(() => {
    console.log("page load mapBounds", mapBounds);
  }, []);

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />
      <main className={styles.home}>
        <div className={`${styles.home_content} ${styles[homePageView]}`}>
          {/* <Map
            center={initHomeMap.center}
            zoom={initHomeMap.zoom}
            locations={homeMapLocations}
            showMarkerInfoOverlay={
              width < 768 && homePageView === "map" ? true : false
            }
          /> */}

          <Card unpadded className={styles.home_content_jobList}>
            {homeMapLocations.length ? (
              homeMapLocations.map((l) => <ListItem key={l.id} location={l} />)
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

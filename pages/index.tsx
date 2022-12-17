import { useEffect, useState } from "react";
import { Card, Head, ListItem, Map, Search } from "../components";
import { useStore } from "../store";
import { useWindowDimensions } from "../utils/hooks";
import { fetchMappableJobs } from "../utils/httpRequests";
import styles from "./home.module.css";

let timeout: NodeJS.Timeout;

export default function Home() {
  const [
    setInitMap,
    mapBounds,
    mapMarkers,
    setMapMarkers,
    homePageView,
    jobs,
    setJobs,
  ] = useStore((state) => [
    state.setInitMap,
    state.mapBounds,
    state.mapMarkers,
    state.setMapMarkers,
    state.homePageView,
    state.jobs,
    state.setJobs,
  ]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  const { width } = useWindowDimensions();

  /** on page load
   * request user location
   * if location provided set init map region to user location
   * else set init map region to NYC
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setInitMap({
          center: { lat: latitude, lng: longitude },
          zoom: 12,
        });
      },
      () => {
        setInitMap({
          center: { lat: 40.741895, lng: -73.989308 },
          zoom: 12,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** on update to map region
   * fetch jobs in current map region
   */
  useEffect(() => {
    if (mapBounds !== undefined) {
      // use timeout to prevent multiple fetches
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const latBound = {
          min: mapBounds.south,
          max: mapBounds.north,
        };
        const lngBound = {
          min: mapBounds.west,
          max: mapBounds.east,
        };

        async function getJobs() {
          const response = await fetchMappableJobs(latBound, lngBound);
          setJobs(response);
        }
        getJobs();
      }, 500);
    }
  }, [mapBounds]);

  /** on update to jobs
   * pull data from jobs for map markers
   * store as array in state
   */
  useEffect(() => {
    if (!jobs.length) setMapMarkers([]);
    else {
      let markerPositions = [];

      jobs.forEach((job) => {
        job.locations.forEach((location) => {
          markerPositions.push({
            center: { lat: location.latitude, lng: location.longitude },
            job,
            id: `${job.id}-${job.companyId}-${location.id}`,
          });
        });
      });

      const objectsEqual = (o1, o2) => {
        return o1 !== null &&
          typeof o1 === "object" &&
          Object.keys(o1).length > 0
          ? Object.keys(o1).length === Object.keys(o2).length &&
              Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
          : o1 === o2;
      };

      const arraysEqual = (a1, a2) => {
        return (
          a1.length === a2.length &&
          a1.every((o, idx) => objectsEqual(o, a2[idx]))
        );
      };

      if (!arraysEqual(markerPositions, mapMarkers))
        setMapMarkers(markerPositions);
    }
  }, [jobs]);

  useEffect(() => {
    if (width > 768) {
      setSearchPlaceholder("Search by location, company, job title, etc.");
    } else {
      setSearchPlaceholder("Search");
    }
  }, [width]);

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main className={styles.home}>
        <Search placeholder={searchPlaceholder} />
        <div className={`${styles.home_content} ${styles[homePageView]}`}>
          <Card unpadded className={styles.home_content_mapCard}>
            <Map />
          </Card>
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

import Head from "next/head";
import { useEffect } from "react";
import { Card, ListItem, Map, Search } from "../components";
import { useStore } from "../store";
import { fetchMappableJobs } from "../utils/httpRequests";
import styles from "./home.module.css";

let timeout;

export default function Home() {
  const setInitMap = useStore((state) => state.setInitMap);
  const mapBounds = useStore((state) => state.mapBounds);
  const setMapMarkers = useStore((state) => state.setMapMarkers);
  const homePageView = useStore((state) => state.homePageView);
  const jobs = useStore((state) => state.jobs);
  const setJobs = useStore((state) => state.setJobs);

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
    let markerPositions = [];

    if (jobs && jobs.length) {
      jobs.forEach((job) => {
        job.locations.forEach((location) => {
          markerPositions.push({
            center: { lat: location.latitude, lng: location.longitude },
            job,
          });
        });
      });
    }

    setMapMarkers(markerPositions);
  }, [jobs]);

  return (
    <div>
      <Head>
        <title>Cloud Computing Jobs</title>
        <meta
          name="description"
          content="The best job board for cloud-focused software engineers"
        />
      </Head>

      <main className={styles.home}>
        <Search placeholder="Search by location, company, job title, etc" />
        <div className={`${styles.home_content} ${styles[homePageView]}`}>
          <Card className={styles.home_content_mapCard}>
            <Map />
          </Card>
          <Card className={styles.home_content_jobList}>
            {jobs && jobs.length ? (
              jobs.map((i) => <ListItem key={i.id} job={i} />)
            ) : (
              <p>
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

import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, ListItem, Map, Search } from "../components";
import { useStore } from "../store";
import { IJob } from "../utils";
import styles from "./home.module.css";

async function fetchMappableJobs(latBound, lngBound) {
  const response = await fetch("/api/jobs/mappable", {
    method: "post",
    headers: new Headers({
      Authorization: "Bearer " + process.env.API_SECRET_KEY,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      latBound,
      lngBound,
    }),
  });

  const data = await response.json();
  console.log("fetchMappableJobs data", data);
  return data;
}

// NEED TO
// set map location on page load
// fetch new jobs every time map moves

let timeout;

export default function Home() {
  const [jobs, setJobs] = useState<IJob[] | undefined>();
  const map = useStore((state) => state.map);
  const setMap = useStore((state) => state.setMap);
  const setMapMarkers = useStore((state) => state.setMapMarkers);

  // on page load
  useEffect(() => {
    console.log("UE on page load");

    // request location
    navigator.geolocation.getCurrentPosition(
      // location provided
      (position) => {
        const { latitude, longitude } = position.coords;

        // set region to user location
        setMap({
          center: { lat: latitude, lng: longitude },
          zoom: 12,
        });
      },
      // no location provided
      () => {
        console.log("location not given");
        // set region to default Manhattan
        setMap({
          center: { lat: 40.741895, lng: -73.989308 },
          zoom: 12,
        });
        console.log("mapRegion", map);
      }
    );
  }, []);

  // on update to visible map region
  useEffect(() => {
    console.log("UE on update to map");

    // prevent multiple calls to fetch jobs when map updates occur within 1s
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const latBound = {
        min: map.center.lat - 0.25,
        max: map.center.lat + 0.25,
      };
      const lngBound = {
        min: map.center.lng - 0.25,
        max: map.center.lat + 0.25,
      };

      async function getJobs() {
        console.log("running GET JOBS");
        const response = await fetchMappableJobs(latBound, lngBound);
        setJobs(response);
      }
      getJobs();
    }, 1000);
  }, [map]);

  // on update to jobs
  useEffect(() => {
    console.log("UE on update to jobs");

    // init markerPositions
    let markerPositions = [];

    // markerPositions = array of marker locations
    jobs && // line should be able to be removed
      jobs.forEach((job) => {
        job.locations.forEach((location) => {
          markerPositions.push({
            center: { lat: location.latitude, lng: location.longitude },
          });
        });
      });

    // set map markers to array of marker locations
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
        <div className={styles.home_content}>
          <div className={styles.home_primaryContent}>
            <Card className={styles.home_primaryContent_mapCard}>
              <Map />
            </Card>
            {jobs ? (
              <Card className={styles.home_primaryContent_jobList}>
                {jobs.map((i) => (
                  <ListItem key={i.id} job={i} />
                ))}
              </Card>
            ) : (
              <Card>
                <p>no jobs</p>
              </Card>
            )}
          </div>

          <div className={styles.home_secondaryContent}>
            <Card>
              <h2>News</h2>
            </Card>
            <Card>
              <h2>Blog</h2>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

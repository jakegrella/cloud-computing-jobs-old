import { useEffect, useState } from "react";
import { CompanyJobCard, Head, SearchInput } from "../components";
import { IJob } from "../types";
import { fetchJobs } from "../utils/httpRequests";
// import { useStore } from "../store";
import styles from "./index.module.css";

// on page load
// -> retrieve and handle user location
// -> get newest jobs (limit 10)

export default function Home() {
  // const [setInitHomeMap] = useStore((state) => [state.setInitHomeMap]);
  const [newJobs, setNewJobs] = useState([]);

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

  useEffect(() => {
    (async () => {
      setNewJobs(await fetchJobs());
    })();
  }, []);

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main className={styles.landing}>
        <div className={styles.landing_search}>
          <h1>Find your next cloud computing job</h1>
          <SearchInput />
        </div>

        <div className={styles.landing_newJobs}>
          <h2>New Jobs</h2>
          <div className={styles.landing_newJobs_jobs}>
            {newJobs.map((newJob: IJob) => (
              <CompanyJobCard key={newJob.id} job={newJob} />
            ))}
          </div>
        </div>

        <footer className={styles.landing_footer}>
          <p>© {new Date().getFullYear()} Cloud Computing Jobs</p>
        </footer>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Head } from "../components";
import styles from "@/styles/home.module.css";
import { fetchJobs } from "@/utils/httpRequests/fetchJobs";
import { IJob } from "@/types";

export default function Home() {
  const [jobs, setJobs] = useState<IJob[]>([]);

  // on page load, get published jobs
  useEffect(() => {
    (async () => {
      const jobs = await fetchJobs();
      // setJobs(jobs)
    })();
  }, [])

  return (
    <div>
      <Head
        title="Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main className={styles.home}>
        <div className={styles.dataContainer}>
          <div className={styles.jobsContainer}></div>
        </div>
      </main>
    </div>
  );
}

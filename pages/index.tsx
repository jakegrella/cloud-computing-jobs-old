import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, ListItem, Map, Search } from "../components";
import { IJob } from "../utils";
import styles from "./home.module.css";

export default function Home() {
  const [jobs, setJobs] = useState<IJob[] | undefined>();

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch("/api/jobs", {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
        }),
      });
      const data = await response.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

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
        <div className={styles.home_jobSearch}>
          <Search
            className={styles.home_jobSearch_search}
            placeholder="Search by location, company, job title, etc"
          />
          {jobs && (
            <div className={styles.home_jobSearch_content}>
              <Card className={styles.home_jobSearch_content_mapCard}>
                <Map />
              </Card>
              <Card className={styles.home_jobSearch_content_jobList}>
                {jobs.map((i) => (
                  <ListItem key={i.id} job={i} />
                ))}
              </Card>
            </div>
          )}
        </div>
        <Card>
          <h2>News</h2>
        </Card>
        <Card>
          <h2>Blog</h2>
        </Card>
      </main>
    </div>
  );
}

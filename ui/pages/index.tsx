import Head from "next/head";
import List from "../components/list";
import Card from "../components/card";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const basePath = "http://localhost:8080";
  const [jobs, setJobs] = useState();

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(`${basePath}/api/jobs`);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      setJobs(data);
      console.log("jobs", jobs);
    }
    fetchJobs();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cloud Computing Jobs</title>
        <meta
          name="description"
          content="The best job board for cloud-focused software engineers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Card>{jobs && <List data={jobs} />}</Card>
      </main>
    </div>
  );
}

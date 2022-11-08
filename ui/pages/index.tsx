import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../components/card";
import ListItem from "../components/list-item";
import { IJob } from "../utils/types";

export default function Home() {
  const basePath = "http://localhost:8080";
  const [jobs, setJobs] = useState<IJob[] | undefined>();

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(`${basePath}/api/jobs`);
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Jobs</h1>
        {jobs && (
          <Card>
            {jobs.map((i) => (
              <ListItem key={i.id} job={i} />
            ))}
          </Card>
        )}
      </main>
    </div>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import { jobMetaDescription, metaKeywords } from "../../utils/htmlTags";
import { locationHelper } from "../../utils/locationHelper";
import { IJob } from "../../utils/types";

export default function Job() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<IJob | undefined>();

  useEffect(() => {
    async function fetchCompany() {
      if (id) {
        // don't run when id is undefined
        const response = await fetch(`/api/jobs/${id}`);
        const data: IJob = await response.json();
        setJob(data);
      }
    }
    fetchCompany();
  }, [id]);

  // using ". " as a separator will break as a splitter if there are acronyms like "U.S. " in the string

  return !job ? (
    <div>
      <p>loading</p>
    </div>
  ) : (
    <div>
      <Head>
        <title>
          {job.title} at {job.company.name} - Cloud Computing Jobs
        </title>
        <meta name="description" content={jobMetaDescription(job)} />
        <meta name="keywords" content={metaKeywords(job)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{job.title}</h1>
        <h2>
          at{" "}
          <Link href={`/companies/${job.company.username}`}>
            {job.company.name}
          </Link>
        </h2>
        <Card>
          <div>
            <h2>Quick Info</h2>
            <div>
              <div>
                <h3>Posted</h3>
                <p>{job.datePublished?.toISOString() ?? "Unpublished"}</p>
              </div>
              <div>
                <h3>Job Type</h3>
                <p>{job.type}</p>
              </div>
              <div>
                <h3>Location</h3>
                <p>{locationHelper(job.locations)}</p>
              </div>
              <div>
                <h3>Pay</h3>
                {/* <p>{formatPay(job.locations[0]}</p> need to format for multiple locations*/}
              </div>
              <div>
                <h3>Equity</h3>
                {/* <p>{formatPay(job.locations[0]}</p> need to format for multiple locations*/}
              </div>
              <div>
                <h3>Experience Level</h3>
                {/* <p>{formatPay(job.locations[0]}</p> need to format for multiple locations*/}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div>
            <h2>Description</h2>
            <p>{job.description}</p>
          </div>
        </Card>
        <Card>
          <div>
            <h2>Responsibilities</h2>
            <ul>
              {job.responsibilities.split(". ").map((r) => (
                <li key={r}>
                  <p>{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card>
          <div>
            <h2>Qualifications</h2>
            <ul>
              {job.qualifications.split(". ").map((q) => (
                <li key={q}>
                  <p>{q}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        {/* <Card>
          <div>
            <h2>Perks & Benefits</h2>
            <p>cool perks</p>
          </div>
        </Card> */}
        <Button>
          <Link href={job.posting}>Apply at {job.company.name}</Link>
        </Button>
      </main>
    </div>
  );
}

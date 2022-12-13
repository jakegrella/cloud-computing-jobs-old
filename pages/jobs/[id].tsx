import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card } from "../../components";
import {
  formatEquity,
  formatPay,
  jobMetaDescription,
  metaKeywords,
  relativeDate,
} from "../../utils";
import { IJob } from "../../types";

// TODO: using ". " as a separator will break as a splitter if there are acronyms like "U.S. " in the string

export default function Job() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<IJob | undefined>();
  const [showAllLocations, setShowAllLocations] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCompany() {
      if (id) {
        // don't run when id is undefined
        const response = await fetch(`/api/jobs/${id}`, {
          method: "get",
          headers: new Headers({
            Authorization: "Bearer " + process.env.API_SECRET_KEY,
          }),
        });
        const data: IJob = await response.json();
        setJob(data);
      }
    }
    fetchCompany();
  }, [id]);

  const locations = () => {
    const multipleLocations = job.locations.length > 1;

    return (
      <div>
        {multipleLocations ? (
          <h3 onClick={() => setShowAllLocations(!showAllLocations)}>
            {showAllLocations ? "Locations ⬇️" : "Locations ⬆️"}
          </h3>
        ) : (
          <h3>Location</h3>
        )}
        <div>
          {multipleLocations ? (
            showAllLocations ? (
              job.locations.map((l) => {
                const key = `${l.locality
                  .toLowerCase()
                  .replace(/ /g, "_")}-${l.administrativeArea
                  .toLowerCase()
                  .replace(/ /g, "_")}`;

                const content = `${l.locality}, ${l.administrativeArea}`;

                return <h2 key={key}>{content}</h2>;
              })
            ) : (
              <h2>{`${job.locations[0].locality}, ${
                job.locations[0].administrativeArea
              } +${job.locations.length - 1}`}</h2>
            )
          ) : (
            <h2>{`${job.locations[0].locality}, ${job.locations[0].administrativeArea}`}</h2>
          )}
        </div>
      </div>
    );
  };

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
                <h2>{relativeDate(job.datePublished)}</h2>
              </div>
              <div>
                <h3>Type</h3>
                <h2>{job.type}</h2>
              </div>
              <div>
                <h3>Experience</h3>
                <h2>{job.experience}</h2>
              </div>
              <div>
                <h3>Pay</h3>
                <h2>
                  {formatPay(
                    job.payRangeMin,
                    job.payRangeMax,
                    job.payRangeTimeFrame
                  )}
                </h2>
              </div>
              <div>
                <h3>Equity</h3>
                <h2>{formatEquity(job.equityRangeMin, job.equityRangeMax)}</h2>
              </div>
              {locations()}
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
        <Button>
          <Link href={job.posting}>Apply at {job.company.name}</Link>
        </Button>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, Head } from "../../components";
import {
  formatEquity,
  formatLocation,
  formatPay,
  jobMetaDescription,
  metaKeywords,
  relativeDate,
} from "../../utils";
import { fetchJob } from "../../utils/httpRequests";
import { IJob } from "../../types";
import styles from "./job.module.css";
import Image from "next/image";

export default function Job() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<IJob | undefined>(undefined);
  const [showAllLocations, setShowAllLocations] = useState<boolean>(false);

  // fetch company when job updates (on page load)
  useEffect(() => {
    async function init() {
      if (id) {
        // don't run when id is undefined
        setJob(await fetchJob(id));
      }
    }
    init();
  }, [id]);

  function locations() {
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
              job.locations.map((l) => <p key={l.id}>{formatLocation(l)}</p>)
            ) : (
              <p>
                {formatLocation(job.locations[0]) +
                  ` +${job.locations.length - 1} more`}
              </p>
            )
          ) : (
            <p>{`${job.locations[0].locality}, ${job.locations[0].administrativeArea}`}</p>
          )}
        </div>
      </div>
    );
  }

  function detailSection(title: string, content: string) {
    if (content) {
      return (
        <Card>
          <h2>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      );
    }
  }

  return !job ? (
    <div>
      <p>loading</p>
    </div>
  ) : (
    <div>
      <Head
        title={`${job.title} at ${job.company.name} - Cloud Computing Jobs`}
        description={jobMetaDescription(job)}
        keywords={metaKeywords(job)}
      />

      <main>
        <h1>{job.title}</h1>
        <div className={styles.job_company}>
          <h2>at</h2>
          <Link href={`/companies/${job.company.username}`}>
            <Image
              src={job.company.logo}
              alt={`logo of ${job.company.name}`}
              height={24}
              width={24}
            />
            <h2>{job.company.name}</h2>
          </Link>
        </div>

        <Card className={styles.job_info}>
          <h2>Quick Info</h2>
          <div>
            <h3>Posted</h3>
            <p>{relativeDate(job.datePublished)}</p>
          </div>
          <div>
            <h3>Type</h3>
            <p>{job.type}</p>
          </div>
          <div>
            <h3>Experience</h3>
            <p>{job.experience}</p>
          </div>
          <div>
            <h3>Pay</h3>
            <p>
              {formatPay(
                job.payRangeMin,
                job.payRangeMax,
                job.payRangeTimeFrame
              )}
            </p>
          </div>
          <div>
            <h3>Equity</h3>
            <p>{formatEquity(job.equityRangeMin, job.equityRangeMax)}</p>
          </div>
          {locations()}
        </Card>

        {detailSection("Description", job.description)}
        {detailSection("Responsibilities", job.responsibilities)}
        {detailSection("Qualifications", job.qualifications)}

        <Button>
          <Link href={job.posting}>Apply at {job.company.name}</Link>
        </Button>
      </main>
    </div>
  );
}

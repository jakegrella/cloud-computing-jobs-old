import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Head } from "../../components";
import { companyMetaDescription, jobsPlurality } from "../../utils";
import { fetchCompany } from "../../utils/httpRequests";
import { ICompany } from "../../types";
import styles from "./company.module.css";

export default function Company() {
  const router = useRouter();
  const { username } = router.query;

  const [company, setCompany] = useState<ICompany | undefined>(undefined);
  const [hq, setHq] = useState<string>("");

  // fetch company when username updates (on page load)
  useEffect(() => {
    async function init() {
      if (username) {
        // don't run when username is undefined
        const fetchedCompany: ICompany = await fetchCompany(username);
        setCompany(fetchedCompany);

        const headquarters = fetchedCompany.locations.find(
          (location) => location.headquarters === true
        );

        if (headquarters) {
          setHq(`${headquarters.locality}, ${headquarters.administrativeArea}`);
        }
      }
    }
    init();
  }, [username]);

  return !company ? (
    <div>
      <p>loading</p>
    </div>
  ) : (
    <div>
      <Head
        title={`${company.name} - Cloud Computing Jobs`}
        description={companyMetaDescription(company)}
      />

      <main className={styles.company}>
        <div className={styles.company_header}>
          <Image
            src={company.logo}
            alt={`logo of ${company.name}`}
            width={36}
            height={36}
          />
          <h1>{company.name}</h1>
        </div>

        <Card>
          <p>{company.mission}</p>
        </Card>

        <Card>
          <h2>
            {company.jobs.length} Open {jobsPlurality(company.jobs.length)}
          </h2>

          {company.jobs.length ? (
            company.jobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <p className={styles.company_job}>{job.title}</p>
              </Link>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </Card>

        <Card className={styles.company_info}>
          <h2>About {company.name}</h2>
          <div>
            <h3>Overview</h3>
            <p>{company.overview}</p>
          </div>
          <div>
            <h3>Headquarters</h3>
            <p>{hq}</p>
          </div>
        </Card>
      </main>
    </div>
  );
}

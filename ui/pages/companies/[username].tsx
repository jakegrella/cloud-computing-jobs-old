import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { companyMetaDescription } from "../../utils/htmlTags";
import { ICompany } from "../../utils/types";
import { jobsPlurality } from "../../utils/words";
import styles from "./company.module.css";

export default function Company() {
  const router = useRouter();
  const { username } = router.query;

  const basePath = "http://localhost:8080";
  const [company, setCompany] = useState<ICompany | undefined>();

  useEffect(() => {
    async function fetchCompany() {
      if (username) {
        // don't run when username is undefined
        const response = await fetch(`${basePath}/api/companies/${username}`);
        const data: ICompany = await response.json();
        console.log(data);
        setCompany(data);
      }
    }
    fetchCompany();
  }, [username]);

  return !company ? (
    <div>
      <p>loading</p>
    </div>
  ) : (
    <div>
      <Head>
        <title>{company.name} - Cloud Computing Jobs</title>
        <meta name="description" content={companyMetaDescription(company)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.company}>
        <h1>{company.name}</h1>

        <Card>
          <div>
            <h2>
              {company.jobs.length} Open {jobsPlurality(company.jobs.length)}
            </h2>

            {company.jobs.map((i) => (
              <Link href={`/jobs/${i.id}`} key={i.id}>
                <p>{i.title}</p>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <div>
            <h2>About {company.name}</h2>
            <div className={styles.companyInfo}>
              <div>
                <h3>Overview</h3>
                <p>{company.overview}</p>
              </div>
              <div>
                <h3>Headquarters</h3>
                <p>
                  {company.headquarters.city}, {company.headquarters.state}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
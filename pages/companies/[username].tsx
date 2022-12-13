import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card } from "../../components";
import { companyMetaDescription, jobsPlurality } from "../../utils";
import { ICompany } from "../../types";
import styles from "./company.module.css";

export default function Company() {
  const router = useRouter();
  const { username } = router.query;

  const [company, setCompany] = useState<ICompany | undefined>();
  const [hq, setHq] = useState<string | undefined>();
  const [mapInfo, setMapInfo] = useState<object | undefined>();

  useEffect(() => {
    async function fetchCompany() {
      if (username) {
        // don't run when username is undefined
        const response = await fetch(`/api/companies/${username}`, {
          method: "get",
          headers: new Headers({
            Authorization: "Bearer " + process.env.API_SECRET_KEY,
          }),
        });
        const data: ICompany = await response.json();
        setCompany(data);

        const headquarters = data.locations.find(
          (obj) => obj.headquarters === true
        );
        setHq(`${headquarters.locality}, ${headquarters.administrativeArea}`);

        const mapStuff = {
          company: data.name,
          latitude: data.locations[0].latitude,
          longitude: data.locations[0].longitude,
        };
        setMapInfo(mapStuff);
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
            <div>
              <div>
                <h3>Overview</h3>
                <p>{company.overview}</p>
              </div>
              <div>
                <h3>Headquarters</h3>
                <p>{hq}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

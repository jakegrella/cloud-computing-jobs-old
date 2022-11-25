import Head from "next/head";
import { useEffect, useState } from "react";
import { Card, ListItem } from "../../components";
import { ICompany } from "../../utils";

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[] | undefined>();

  useEffect(() => {
    async function fetchCompanies() {
      const response = await fetch("/api/companies", {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
        }),
      });
      const data = await response.json();
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  return (
    <div>
      <Head>
        <title>Companies - Cloud Computing Jobs</title>
        <meta
          name="description"
          content="The best job board for cloud-focused software engineers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Companies</h1>
        {companies && (
          <Card>
            {companies.map((i) => (
              <ListItem key={i.id} company={i} />
            ))}
          </Card>
        )}
      </main>
    </div>
  );
}

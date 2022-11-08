import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import ListItem from "../../components/list-item";
import { ICompany } from "../../utils/types";

export default function Companies() {
  const basePath = "http://localhost:8080";
  const [companies, setCompanies] = useState<ICompany[] | undefined>();

  useEffect(() => {
    async function fetchCompanies() {
      const response = await fetch(`${basePath}/api/companies`);
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

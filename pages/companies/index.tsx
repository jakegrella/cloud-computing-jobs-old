import { useEffect, useState } from "react";
import { Card, Head, ListItem } from "../../components";
import { fetchCompanies } from "../../utils/httpRequests";
import { ICompany } from "../../types";

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  // fetch companies on page load
  useEffect(() => {
    async function init() {
      const fetchedCompanies = await fetchCompanies();
      setCompanies(fetchedCompanies);
    }
    init();
  }, []);

  return (
    <div>
      <Head
        title="Companies - Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
        faviconHref="/favicon.ico"
      />

      <main>
        <h1>Companies</h1>
        <Card unpadded>
          {companies.map((i) => (
            <ListItem key={i.id} company={i} />
          ))}
        </Card>
      </main>
    </div>
  );
}

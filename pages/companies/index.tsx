import { useEffect, useState } from "react";
import { Card, Head, ListItem } from "../../components";
import { fetchCompanies } from "../../utils/httpRequests";
import { ICompany } from "../../types";
import styles from "./company.module.css";

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  // fetch companies on page load
  useEffect(() => {
    async function init() {
      setCompanies(await fetchCompanies());
    }
    init();
  }, []);

  return (
    <div>
      <Head
        title="Companies - Cloud Computing Jobs"
        description="The best job board for cloud-focused software engineers"
      />

      <main>
        <h1>Companies</h1>
        <div className={styles.companiesContainer}>
          {!!companies.length &&
            companies.map((i) => (
              <Card key={i.id} unpadded className={styles.companyCard}>
                <ListItem company={i} />
              </Card>
            ))}
        </div>
      </main>
    </div>
  );
}

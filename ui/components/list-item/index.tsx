import Image from "next/image";
import Link from "next/link";
import styles from "./list-item.module.css";

export default function ListItem({ job = undefined, company = undefined }) {
  // format depending on whether data is job or company
  let c;
  if (job) c = job.company;
  else c = company;

  return (
    <Link href="/">
      <div className={styles["list-item"]}>
        <div className={styles["top"]}>
          <Image
            src={c.logo}
            className={styles["list-item_company-logo"]}
            alt={`logo of ${c.name}`}
            width={36}
            height={36}
          />
          {company ? (
            <div>
              <h2>{c.name}</h2>
              <h3>{company.jobs.length} Open Jobs</h3>
            </div>
          ) : (
            <div>
              <h3>{c.name}</h3>
              <h2>{job.title}</h2>
            </div>
          )}
        </div>
        <h3>{c.mission}</h3>
        {company && (
          <div className={styles["list-item_job-list"]}>
            {company.jobs.map((job) => (
              // <Link href="/sdsad">
              <h2 key={job.id}>{job.title}</h2>
              // </Link>
            ))}
          </div>
        )}
        <hr />
      </div>
    </Link>
  );
}

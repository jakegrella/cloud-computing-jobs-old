import Image from "next/image";
import Link from "next/link";
import styles from "./list-item.module.css";

export function ListItem({ job = undefined, company = undefined }) {
  // format depending on whether data is job or company
  if (job) company = job.company;

  return (
    <Link href={job ? `/jobs/${job.id}` : `/companies/${company.username}`}>
      <div className={styles["list-item"]}>
        <div className={styles["top"]}>
          <Image
            src={company.logo}
            className={styles["list-item_company-logo"]}
            alt={`logo of ${company.name}`}
            width={36}
            height={36}
          />
          {job ? (
            <div>
              <h3>{company.name}</h3>
              <h2>{job.title}</h2>
            </div>
          ) : (
            <div>
              <h2>{company.name}</h2>
              <h3>{company.jobs.length ?? "0"} Open Jobs</h3>{" "}
            </div>
          )}
        </div>
        <h3>{company.mission}</h3>
        {company && (
          <div className={styles["list-item_job-list"]}>
            {company.jobs &&
              company.jobs.map((job) => (
                // <Link href="/"> // nested Links causing errors
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

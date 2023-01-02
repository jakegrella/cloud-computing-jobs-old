import Link from "next/link";
import { ListItemHeader } from "./list-item-header";
import styles from "./list-item.module.css";

export function ListItem({
  job = undefined,
  company = undefined,
  location = undefined,
}) {
  // format depending on whether data is job or company
  if (job && !company) company = job.company;

  return (
    <Link href={job ? `/jobs/${job.id}` : `/companies/${company.username}`}>
      <div className={styles.listItem}>
        <ListItemHeader
          imageSrc={company.logo}
          imageAlt={`logo of ${company.name}`}
          title={company.name}
          subtitle={
            location?.jobs.length
              ? `${company.jobs?.length} Open Job${
                  company.jobs?.length !== 1 ? "s" : ""
                }`
              : `${company.jobs?.length} Open Job${
                  company.jobs?.length !== 1 ? "s" : ""
                } ${company.jobs?.length > 0 ? " (at another location)" : ""}`
          }
        />

        <h3>{company.mission}</h3>

        {!location && !!company.jobs?.length && (
          <div className={styles.listItem_newJobs}>
            <h3>New Jobs</h3>
            {company.jobs.slice(0, 3).map((job) => (
              // <Link href="/"> // nested Links causing errors
              <p key={job.id}>{job.title}</p>
              // </Link>
            ))}
          </div>
        )}

        {location && !!location.jobs?.length && (
          <div className={styles.listItem_newJobs}>
            <h3>New Jobs at This Location</h3>
            {location.jobs
              .map(
                (job) => (
                  // <Link href="/"> // nested Links causing errors
                  <p key={job.id}>{job.title}</p>
                )
                // </Link>
              )
              .slice(0, 3)}
          </div>
        )}

        <hr />
      </div>
    </Link>
  );
}

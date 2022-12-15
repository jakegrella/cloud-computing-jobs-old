import Link from "next/link";
import { ListItemHeader } from "./list-item-header";
import styles from "./list-item.module.css";

export function ListItem({ job = undefined, company = undefined }) {
  // format depending on whether data is job or company
  if (job) company = job.company;

  return (
    <Link href={job ? `/jobs/${job.id}` : `/companies/${company.username}`}>
      <div className={styles.listItem}>
        <ListItemHeader
          imageSrc={company.logo}
          imageAlt={`logo of ${company.name}`}
          title={company.name}
          subtitle={job ? job.title : `${company.jobs.length} Open Jobs`}
        />

        <h3>{company.mission}</h3>

        {company.jobs?.length && (
          <div className={styles.listItem_newJobs}>
            <h3>New Jobs</h3>
            {company.jobs.slice(0, 3).map((job) => (
              // <Link href="/"> // nested Links causing errors
              <p key={job.id}>{job.title}</p>
              // </Link>
            ))}
          </div>
        )}

        <hr />
      </div>
    </Link>
  );
}

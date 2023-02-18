import Image from "next/image";
import Link from "next/link";
import { Clock, GlobeHemisphereWest, Money } from "phosphor-react";
import { IJob } from "../../types";
import styles from "./companyJobCard.module.css";

export function CompanyJobCard({ job }: { job: IJob }) {
  return (
    <div key={job.id} className={styles.jobCard}>
      <div className={styles.jobCard_header}>
        <Link href={`/companies/${job.company.username}`}>
          <Image
            src={job.company.logo}
            alt={`${job.company.name} logo`}
            className={styles.jobCard_header_logo}
            width={36}
            height={36}
          />
        </Link>
        <div>
          <Link href={`/companies/${job.company.username}`}>
            <h2 className={styles.jobCard_header_companyName}>
              {job.company.name}
            </h2>
          </Link>
          <h4>{job.company.mission}</h4>
        </div>
      </div>
      <div className={styles.jobCard_bottom}>
        <Link href={`/jobs/${job.id}`}>
          <h3>{job.title}</h3>
        </Link>
        <div className={styles.jobCard_quickInfo}>
          <div className={styles.jobCard_quickInfo_item}>
            <Clock className={styles.jobCard_quickInfo_item_icon} />
            <h4>time</h4>
          </div>
          <div className={styles.jobCard_quickInfo_item}>
            <Money className={styles.jobCard_quickInfo_item_icon} />
            <h4>money</h4>
          </div>
          <div className={styles.jobCard_quickInfo_item}>
            <GlobeHemisphereWest
              className={styles.jobCard_quickInfo_item_icon}
            />
            <h4>remote</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

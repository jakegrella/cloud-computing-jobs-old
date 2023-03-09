import Image from "next/image";
import { Clock, GlobeHemisphereWest, Money } from "phosphor-react";
import { IJob, ILocation } from "../../types";
import { relativeDate, formatPay } from "../../utils";
import styles from "./companyLocationJobsCard.module.css";

export function CompanyLocationJobsCard({ location }: { location: ILocation }) {
  return (
    <div key={location.id} className={styles.jobCard}>
      <div className={styles.jobCard_header}>
        <div className={styles.jobCard_header_company}>
          <Image
            src={location.company.logo}
            alt={`${location.company.name} logo`}
            className={styles.jobCard_header_logo}
            width={36}
            height={36}
          />
          <h2>{location.company.name}</h2>
        </div>
        <h4>{location.company.mission}</h4>
      </div>
      {location.jobs.map((job: IJob) => (
        <div key={job.id}>
          <a href={job.posting} target="_blank" rel="noopener noreferrer">
            <h3>{job.title}</h3>
          </a>
          <div className={styles.jobCard_quickInfo}>
            <div className={styles.jobCard_quickInfo_item}>
              <Clock className={styles.jobCard_quickInfo_item_icon} />
              <h4>{relativeDate(job.datePublished)}</h4>
            </div>
            <div className={styles.jobCard_quickInfo_item}>
              <Money className={styles.jobCard_quickInfo_item_icon} />
              <h4>
                {formatPay(
                  job.payRangeMin,
                  job.payRangeMax,
                  job.payRangeTimeFrame
                )}
              </h4>
            </div>
            <div className={styles.jobCard_quickInfo_item}>
              <GlobeHemisphereWest
                className={styles.jobCard_quickInfo_item_icon}
              />
              <h4>remote</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

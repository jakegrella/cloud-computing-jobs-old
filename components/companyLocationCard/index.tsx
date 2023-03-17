import Image from "next/image";
import { Clock, Money } from "phosphor-react";
import { IJob, ILocation } from "../../types";
import { relativeDate, formatPay } from "../../utils";
import styles from "./companyLocationCard.module.css";

export function CompanyLocationCard({ location }: { location: ILocation }) {
  return (
    <div key={location.id} className={styles["company-location-card"]}>
      <div className={styles["company-location-card__header"]}>
        <Image
          src={location.company.logo}
          alt={`${location.company.name} logo`}
          className={styles["company-location-card__header__company-logo"]}
          width={40}
          height={40}
        />
        <div>
          <h2>{location.company.name}</h2>
          <h4>{location.company.mission}</h4>
        </div>
      </div>

      {location.jobs.map((job: IJob) => (
        <div key={job.id} className={styles["company-location-card__job"]}>
          <a href={job.posting} target="_blank" rel="noopener noreferrer">
            <h3>{job.title}</h3>
          </a>
          <div className={styles["company-location-card__job__info"]}>
            <div className={styles["company-location-card__job__info__item"]}>
              <Clock />
              <h4>{relativeDate(job.datePublished)}</h4>
            </div>
            <div className={styles["company-location-card__job__info__item"]}>
              <Money />
              <h4>
                {formatPay(
                  job.payRangeMin,
                  job.payRangeMax,
                  job.payRangeTimeFrame
                )}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

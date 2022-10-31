import ListItem from "../list-item";
import styles from "./list.module.css";

export default function List({ data }) {
  // if data is a job, send job
  // if data is a company, send company
  // to ListItem

  return (
    <div className={styles["list"]}>
      {data.map((job) => (
        <ListItem key={job.id} job={job} />
      ))}
    </div>
  );
}

import ListItem from "../list-item";
import styles from "./list.module.css";

// GET /companies
const companies = {
  data: [
    {
      name: "Anduril Industries",
      id: 1,
      logo: "https://pbs.twimg.com/profile_images/1324780274954117120/AEWA1pSU_400x400.png",
      mission:
        "Transforming US & allied military capabilities with advanced technology.",
      jobs: [
        {
          id: 1,
          title: "Senior Mesh Network Software Engineer",
          posting:
            "https://jobs.lever.co/anduril/d42f0fcc-c891-4fee-8ef1-f1dd76736150",
          active: true,
          datePosted: 1667139198000,
        },
        {
          id: 2,
          title: "Senior Mesh Network Software Engineer",
          posting:
            "https://jobs.lever.co/anduril/d42f0fcc-c891-4fee-8ef1-f1dd76736150",
          active: true,
          datePosted: 1667139198000,
        },
      ],
    },
  ],
};

// GET /jobs
const jobs = {
  data: [
    {
      id: 1,
      title: "Senior Mesh Network Software Engineer",
      posting:
        "https://jobs.lever.co/anduril/d42f0fcc-c891-4fee-8ef1-f1dd76736150",
      active: true,
      datePosted: 1667139198000,
      company: {
        name: "Anduril Industries",
        id: 1,
        logo: "https://pbs.twimg.com/profile_images/1324780274954117120/AEWA1pSU_400x400.png",
        mission:
          "Transforming US & allied military capabilities with advanced technology.",
      },
    },
  ],
};

export default function List() {
  return (
    <div className={styles["list"]}>
      {jobs.data.map((job) => (
        <ListItem key={job.id} job={job} />
      ))}

      {companies.data.map((company) => (
        <ListItem key={company.id} company={company} />
      ))}
    </div>
  );
}

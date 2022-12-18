import { JobExperience, JobType } from "../../types";
import { addJob } from "../jobs/addJob";

interface IAWSJob {
  basic_qualifications: string;
  business_categort: string;
  city: string;
  company_name: string;
  country_code: string;
  description: string;
  department_cost_center: any;
  description_short: string;
  display_distance: any;
  id: string;
  id_icims: string;
  is_intern: any;
  is_manager: any;
  job_category: string;
  job_family: string;
  job_function_id: any;
  job_path: string;
  job_schedule_type: string;
  location: string;
  normalized_location: string;
  optional_search_labels: string[];
  posted_date: string;
  preferred_qualifications: string;
  primary_search_label: string;
  source_system: string;
  state: string;
  title: string;
  university_job: string;
  updated_time: string;
  url_next_step: string;
  team: {
    id: any;
    business_category_id: any;
    identifier: any;
    label: any;
    created_at: any;
    updated_at: any;
    image_file_name: any;
    image_content_type: any;
    image_file_size: any;
    image_updated_at: any;
    thumbnail_file_name: any;
    thumbnail_content_type: any;
    thumbnail_file_size: any;
    thumbnail_updated_at: any;
    hide_jobs: any;
    title: any;
    headline: any;
    description: any;
  };
}

export async function aws(jobs: IAWSJob[]) {
  const formattedJobs = jobs.map((job) => {
    const qualifications = `Basic Qualifications\u003cbr/\u003e \u003cbr/\u003e${job.basic_qualifications}\u003cbr/\u003e \u003cbr/\u003ePreferred Qualifications\u003cbr/\u003e \u003cbr/\u003e${job.preferred_qualifications}`;

    let type: JobType;
    switch (job.job_schedule_type) {
      case "full-time":
        type = "Full Time";
        break;
      case "part-time":
        type = "Part Time";
        break;
      default:
        break;
    }

    let headquarters = false;
    let thoroughfare = "";
    let postalCode = "";

    if (job.city === "Seattle" && job.state === "WA") {
      headquarters = true;
      thoroughfare = "440 Terry Ave N";
      postalCode = "98109";
    } else if (job.city === "Bellevue" && job.state === "WA") {
      headquarters = true;
      thoroughfare = "1001 106th Ave NE";
      postalCode = "98004";
    } else if (job.city === "Arlington" && job.state === "VA") {
      headquarters = true;
      thoroughfare = "1800 S Bell St";
      postalCode = "22202";
    } else if (job.city === "Nashville" && job.state === "TN") {
      headquarters = true;
      thoroughfare = "401 Commerce St";
      postalCode = "37219";
    }

    const formattedJob = {
      id: 0, // 0 will not exist in database
      title: job.title,
      posting: `https://amazon.jobs${job.job_path}`,
      description: job.description,
      responsibilities: "",
      qualifications,
      type,
      experience: "" as JobExperience,
      company: {
        id: 0, // wrong but doesn't matter. company checked by username
        username: "amazon-web-services",
        name: "Amazon Web Services",
        logo: "https://pbs.twimg.com/profile_images/1599829788369113089/FrdYoQ1o_400x400.jpg",
        mission:
          "AWS provides a massive global cloud infrastructure that allows you to quickly innovate, experiment and iterate.",
        overview:
          "In 2006, Amazon Web Services (AWS) began offering IT infrastructure services to businesses in the form of web services -- now commonly known as cloud computing. One of the key benefits of cloud computing is the opportunity to replace up-front capital infrastructure expenses with low variable costs that scale with your business. With the Cloud, businesses no longer need to plan for and procure servers and other IT infrastructure weeks or months in advance. Instead, they can instantly spin up hundreds or thousands of servers in minutes and deliver results faster. Today, Amazon Web Services provides a highly reliable, scalable, low-cost infrastructure platform in the cloud that powers hundreds of thousands of businesses in 190 countries around the world.",
        jobs: [], // needed for typescript, do not use
        locations: [], // needed for typescript, do not use
      },
      locations: [
        {
          id: 0,
          headquarters,
          thoroughfare,
          locality: job.city,
          administrativeArea: job.state,
          postalCode,
          country: job.country_code,
          latitude: null,
          longitude: null,
          companyId: 0,
        },
      ],
    };

    return formattedJob;
  });

  formattedJobs.forEach(async (job) => {
    try {
      // TODO: add check to determine if job already exists in DB
      await addJob(job);
    } catch (err) {
      throw new Error(`Error adding aws job: ${err.message}`);
    }
  });

  return;
}

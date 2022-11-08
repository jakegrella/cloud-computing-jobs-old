import express from "express";
import cors from "cors";
import companies from "./routes/companies";
import jobs from "./routes/jobs";
import locations from "./routes/locations";

const app = express();

const origin = [
  /localhost/,
  "https://cloudcomputingjobs.com",
  "https://cloud-computing-jobs.vercel.app",
  "https://cloud-computing-jobs-a9wv6cjvy-jakegrella.vercel.app/",
];

app.use(
  cors({
    origin,
    methods: "GET, POST, PUT, OPTIONS",
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/companies", companies);
app.use("/api/jobs", jobs);
app.use("/api/locations", locations);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

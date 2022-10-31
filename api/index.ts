import express from "express";
import cors from "cors";
import jobs from "./routes/jobs";
import companies from "./routes/companies";

const app = express();

const origin = [
  /localhost/,
  "https://cloudcomputingjobs.com",
  "https://cloud-computing-jobs.vercel.app",
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

app.use("/api/jobs", jobs);
app.use("/api/companies", companies);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

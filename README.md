# Cloud Computing Jobs

Cloud Computing Jobs aims to be the best job board for cloud-focused software engineering jobs by making it easy for engineers to find a job that they actually want.

## About The Repo

This repository includes the code for the website frontend, API, and database schema.

## UI

Technology:

- Next.js
- React
- TypeScript
- Vercel

## API

The API lives alongside the UI Next.js code, utilizing Next.js API routes. Next.js takes care of a lot of the implementation work that would typically be done with a package like Express.

### API routes

| Method | Route                 | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | /companies            | get all companies       |
| POST   | /companies            | add a company           |
| GET    | /companies/[username] | get company by username |
| GET    | /jobs                 | get all jobs            |
| POST   | /jobs                 | add a job               |
| GET    | /jobs/[id]            | get job by id           |

Technology:

- Next.js
- TypeScript
- Prisma

## Backend

Backend code lives in the `/prisma` directory.

Technology:

- MySQL
- Prisma

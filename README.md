# Cloud Computing Jobs

Cloud Computing Jobs aims to be the best job board for cloud-focused software engineering jobs by making it easy for engineers to find a job that they actually want.

## About The Repo

This repository contains all code related to cloudcomputingjobs.com: the frontend, API, and database configuration.

## UI

The UI is the point of contact for our users. The UI is being developed mobile-first, and accessibility is kept top of mind. The app is deployed using Vercel because of how quickly and easily it allows for changes to be pushed.

The site was styled dark-mode-first™️, but work is being done to develop a light mode as well to match user display preference.

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

Backend code lives in the `/prisma` directory. Prisma is an ORM tool that affords a great developer experience, especially for creating a database schema.

This project utilizes a MySQL database.

Technology:

- MySQL
- Prisma

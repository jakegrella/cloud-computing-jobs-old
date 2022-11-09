# Cloud Computing Jobs

Cloud Computing Jobs aims to be the best job board for cloud-focused software engineering jobs.

## About The Repo

This is a monolithic application comprised of three parts: a UI, an API layer, and a backend database configuration.

## UI

The UI is the point of contact for our users. The UI is being developed mobile-first, and I intend to keep accessibility top of mind. The app is deployed using Vercel because of how quickly and easily it allows me to make changes.

Technology:

- Next.js
- React
- Vercel

## API

The API lives alongside the UI Next.js code. Next.js takes care of a lot of the implementation work for us that would typically be done with a package like Express.

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
- Node.js
- Prisma

## Backend

The backend is where any code related to our database configuration lives

Technology:

- MySQL
- Prisma

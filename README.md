# Cloud Computing Jobs

Cloud Computing Jobs aims to be the best job board for cloud-focused software engineering jobs.

## About The Repo

This is a monolithic application comprised of three parts: a UI, an API layer, and a backend database configuration.

### UI

The UI is the point of contact for our users. The UI is being developed mobile-first, and I intend to keep accessibility top of mind. The app is deployed using Vercel because of how quickly and easily it allows me to make changes.

Technology:

- Next.js
- React
- SCSS
- Vercel

### API

The API directory holds all of the code that connects the frontend to the database.

API routes

There are also cron jobs that run in order to pull the latest jobs from a variety of external APIs and populate the job board. While many of the jobs added to Cloud Computing Jobs are handpicked, this allows for more new jobs to be displayed.

Technology:

- Node.js
- Prisma

### Backend

The backend is where any code related to our database configuration lives

Technology:

- MySQL
- Prisma

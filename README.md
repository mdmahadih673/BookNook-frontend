# BookNook Frontend

BookNook is an online library where readers can browse books, borrow available copies, and manage books they contribute. This repository contains the responsive Next.js frontend.

## Live Sites

- Frontend: https://book-nook-frontend-two.vercel.app
- Backend API: https://book-nook-backend-two.vercel.app

## Features

- Browse the library and sort books by title, availability, or newest first.
- View book descriptions, cover images, categories, and copy availability.
- Create an account or sign in with email/password, Google, or GitHub.
- Add books with an uploaded cover image, description, category, and copy count.
- Edit or delete books you added from **My Books**.
- Borrow available books for 14 days and return them from **My Borrows**.
- Edit your profile name and upload a profile photo.
- Responsive layouts, loading skeletons, and a custom not-found page.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home page, featured carousel, and latest arrivals |
| `/books` | Browse and sort the book collection |
| `/books/[id]` | Book details and borrow action |
| `/signIn` | Sign in with password or a social provider |
| `/Register` | Create an account |
| `/add-book` | Add a book with an uploaded cover |
| `/my-books` | Manage books added by the signed-in user |
| `/my-borrows` | View and return borrowed books |
| `/profile` | View and edit profile information |

## Tech Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Better Auth with MongoDB
- Express.js and MongoDB backend API
- ImgBB for book cover and profile photo uploads

## Run Locally

### Requirements

- Node.js and npm
- A running BookNook backend
- MongoDB connection string
- Google and GitHub OAuth credentials if using social sign-in
- ImgBB API key for image uploads

### Install and start

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser. Start the backend separately; its default local URL is http://localhost:5000.

## Environment Variables

Create a `.env.local` file in the frontend project root. Keep real credentials private and do not commit the file.

| Variable | Description |
| --- | --- |
| `BETTER_AUTH_URL` | Better Auth base URL; use `http://localhost:3000` locally and the deployed frontend URL in production |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign and encrypt auth data |
| `MONGODB_URL` | MongoDB connection string used by Better Auth |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `NEXT_PUBLIC_API_BASE` | Backend API base URL; locally `http://localhost:5000`, production `https://book-nook-backend-two.vercel.app` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key used for image uploads |

For Google OAuth, add these authorized redirect URIs to the Google Web application:

```text
http://localhost:3000/api/auth/callback/google
https://book-nook-frontend-two.vercel.app/api/auth/callback/google
```

For GitHub OAuth, configure the matching callback URL for the environment:

```text
http://localhost:3000/api/auth/callback/github
https://book-nook-frontend-two.vercel.app/api/auth/callback/github
```

The backend also needs its own `MONGODB_URL` and `BETTER_AUTH_URL` settings. See the [backend README](https://github.com/mdmahadih673/BookNook-backend#readme).

## Repositories

- [Frontend source](https://github.com/mdmahadih673/BookNook-frontend)
- [Backend source](https://github.com/mdmahadih673/BookNook-backend)

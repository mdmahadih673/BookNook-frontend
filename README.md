# BookNook

BookNook is a small online library where readers can discover books, borrow available copies, and return them when finished.

**Live site:** [book-nook-frontend-two.vercel.app](https://book-nook-frontend-two.vercel.app)

## Features

- Browse the full book collection and sort books by title, availability, or newest first.
- View book details, cover images, descriptions, and available copy counts.
- Create an account or sign in with email/password, Google, or GitHub.
- Add books with an uploaded cover image, category, description, and copy count.
- Edit or delete books you added from the My Books page.
- Borrow available books for 14 days and return them from My Borrows.
- Update your profile name and photo.

## Tech stack

- Next.js App Router, React, TypeScript, and Tailwind CSS
- Better Auth with MongoDB
- Express.js and MongoDB for the API
- ImgBB for book cover image uploads

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Configure the required environment variables in the frontend and backend `.env` files before starting the app.

## Repositories

- [Frontend](https://github.com/mdmahadih673/BookNook-frontend)
- [Backend](https://github.com/mdmahadih673/BookNook-backend)

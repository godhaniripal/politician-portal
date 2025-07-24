# Politician Portal

A full-stack web platform for politicians to submit their achievements, with admin approval and public display of verified works.

## Features
- Politician work/achievement submission with image upload (Supabase Storage)
- Admin dashboard with manual login (custom username/password)
- Admin can approve/reject submissions
- Only approved achievements are shown on the public page
- MongoDB for data storage
- Next.js 13+ (App Router), TypeScript, Tailwind CSS

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Supabase account (for image uploads)

## Environment Variables
Create a `.env` file in the root directory with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MONGODB_URI=your_mongodb_connection_string
```

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

3. **Admin Login:**
   - Go to `/admin/login`
   - Default credentials (see `lib/admin-config.ts`):
     - Username: `admin`
     - Password: `projectM2025!`

## Project Structure
- `app/` - Next.js app directory (pages, API routes)
- `components/` - Reusable React components
- `model/` - Mongoose models
- `lib/` - Utility libraries and config
- `utils/` - Database connection utility

## Deployment
- You can deploy to Vercel, Netlify, or any Node.js hosting that supports Next.js API routes.
- Make sure to set the environment variables in your deployment platform.

## License
MIT

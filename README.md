# Blood Donor Management System

## Overview
- Backend: Node.js + Express in `src/backend/app.js`
- Frontend: static HTML/CSS/JS in `front_end`
- Database: MongoDB via `MONGO_URI` environment variable

## Local Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Blood_Bank
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/blood_bank_db?retryWrites=true&w=majority
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open the frontend in your browser:
   - `http://localhost:3000`

## GitHub Deployment
1. Initialize git (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a repository on GitHub.
3. Add remote and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

## Deploy Backend to Render
1. Sign in to Render and connect GitHub.
2. Create a new **Web Service**.
3. Select your repo and branch (`main`).
4. Root Directory: `/`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variable:
   - `MONGO_URI` = your MongoDB connection string
8. Deploy.

> Note: Render does not provide hosted MongoDB by default, so use MongoDB Atlas or other hosted MongoDB.

## Deploy Frontend to Vercel
### Option 1: Deploy `front_end` as a static site
1. Sign in to Vercel and connect GitHub.
2. Create a new project from the same repository.
3. Set the root directory to `front_end`.
4. Leave Build Command blank.
5. Leave Output Directory blank.
6. Deploy.

### Option 2: Deploy from repo root using `vercel.json`
- The repository includes `vercel.json` to serve `front_end` as a static site.
- Create a Vercel project from this repo and deploy from root.

## Notes
- The backend API runs on Render.
- The frontend can be hosted on Vercel as a static site.
- If you want a single full-stack deployment, Render is the easiest path.

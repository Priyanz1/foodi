# Foodi Reels (Full Stack)

A full-stack React + Node.js/Express application for uploading / viewing short video reels ("food reels"), with **like** and **save** functionality.

---

## 🚀 Features

- Upload food reels (video) as a food partner
- View reels feed (authenticated users)
- Like/unlike reels (counts stored per reel)
- Save/unsave reels (per user)
- Authentication via JWT tokens (cookie + header support)

---

## 🧱 Repository structure

- `backend/` – Express API, MongoDB models, auth
- `frontend/` – React (Vite) app with feed UI

---

## 🛠️ Prerequisites

- Node.js (>= 18)
- npm (or yarn)
- MongoDB (local or cloud)

---

## ✅ Backend setup

1. Copy `.env.example` (if present) to `.env` and set your values.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the API server:

```bash
cd backend
node index.js
```

> The backend listens on `process.env.PORT`. Run from `backend/` so `backend/.env` is loaded by `dotenv`.

### Backend endpoints (high level)

- `POST /api/user/register` / `POST /api/user/login` – user auth
- `POST /api/foodpartner/register` / `POST /api/foodpartner/login` – partner auth
- `POST /api/food/createfood` – create a reel (partner-only)
- `GET /api/food/food` – fetch reels list (authenticated)
- `POST /api/food/like` – toggle like for a reel
- `POST /api/food/save` – toggle save for a reel

---

## ✅ Frontend setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open browser at the URL shown (default is `http://localhost:5173`).

---

## 🗂 Environment variables (common)

The frontend uses `VITE_API_URL` to call the backend.

In `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

In `backend/.env` (example):

```env
PORT=3000
DB_URL=mongodb://localhost:27017/foodi
JWT_SECRET=your_secret_here
FOODPARTNER_JWT_SECRET=your_food_partner_secret_here
# IMAGEKIT (optional, for uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_path
```

---

## ✅ Notes / Good to know

- The backend now always returns proper HTTP status codes (200/400/401/500) and includes a `status` field in JSON for easier client handling.
- The feed response includes `isLiked` and `isSaved` flags per reel for the current user.

---

## 🧪 Testing the save/like experience

1. Log in as a user.
2. Visit the home feed.
3. Tap the heart ❤️ to like/unlike.
4. Tap the bookmark 🔖 to save/unsave.

---

If you have any questions or want additional features (search, profiles, comments, or share links), feel free to ask!

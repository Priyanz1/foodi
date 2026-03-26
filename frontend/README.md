# Foodi Frontend

React + Vite app for Foodi “food reels” (feed UI, like/save, auth screens).

## Setup

```bash
cd frontend
npm install
npm run dev
```

Dev server default: `http://localhost:5173`

## Environment variables

Create/update `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

## Build for production

```bash
cd frontend
npm run build
```

Output folder: `dist/` (deploy it to any static hosting).

## Auth notes

- Frontend stores JWT in `localStorage` key: `token`
- Requests include `Authorization: Bearer <token>`
- Backend CORS must allow the frontend origin (the backend currently hardcodes `http://localhost:5173`)

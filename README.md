# Korean Snacks Dictionary

A personal dictionary for Korean snacks with Google sign-in and Google Drive persistence.

Live app target: [https://federicoroldos.github.io/snacks-dictionary/](https://federicoroldos.github.io/snacks-dictionary/)

## Features

- Catalog Korean snacks with Korean name, English name, brand, rating, notes, and optional image.
- Google sign-in to keep each user's data separate.
- Google Drive `appDataFolder` sync (JSON file auto-created and updated on every change).
- CRUD operations: add, edit, delete entries with confirmation.
- 5-star rating with half-star support.
- Sorting: alphabetical (Korean or English) and best rated.
- Search by name, brand, or notes.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from the example:

```bash
cp .env.example .env
```

3. Fill in your Firebase web app credentials in `.env`.

4. Start the dev server:

```bash
npm run dev
```

## Google OAuth + Drive Setup

Follow `SETUP_GOOGLE_OAUTH.md` for complete instructions to create a new Google Cloud project, configure OAuth consent, set redirect URIs, and wire env vars for this app.

## Data Storage

Snack data is stored as JSON in the user's Google Drive `appDataFolder`.
Uploaded images are stored in the user's Google Drive under `Korean Snacks Dictionary/images`.

## Deployment Notes

- Vite base path is set to `/snacks-dictionary/` in `vite.config.ts` for GitHub Pages project deployment.
- Legal pages are at `privacy.html` and `terms.html`.
- If you use a custom domain, configure your own `CNAME`.

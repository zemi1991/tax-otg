# Tax On The Go (Tax OTG)

Personal receipt keeper for Malaysian (LHDN) individual tax reliefs — installable web app (PWA).

- **App:** https://zemi1991.github.io/tax-otg/
- **Data:** Supabase (Postgres + private Storage), protected by Row Level Security — only the signed-in owner can read or write. Sign-ups are disabled.
- **This repo holds only the app code.** No receipts or personal data are stored here. `config.js` contains the Supabase project URL and the *public* anon key, which is designed to be shipped in client apps.

| File | Purpose |
|---|---|
| `index.html` | The whole app (UI, Supabase calls, on-device OCR via Tesseract.js) |
| `config.js` | Supabase project URL + public anon key |
| `manifest.webmanifest`, `icons/` | Install name "Tax OTG" and app icon |
| `sw.js` | Service worker — caches the app so it opens instantly |

Development source and database setup (`schema.sql`) live in the private project repo.

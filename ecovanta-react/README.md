# ECOVANTA website (React + TypeScript + Tailwind CSS)

    npm install
    npm run dev        # local dev server
    npm run build      # production build in dist/
    npm run typecheck

- **Edit content** (copy, stats, FAQ, links, contact placeholders): `src/content.ts`
- **Connect a backend**: set `api` in `src/content.ts` or edit `src/api.ts` (`submitPickup`)
- **Design tokens / styles**: `src/index.css` (CSS variables, light/dark) + `tailwind.config.js` (brand colours)
- Stats, testimonials, partner logos, blog posts and contact details are placeholders. Replace before launch.

## Receive pickup requests by email
1. Get a free access key at https://web3forms.com (enter the email that should receive requests).
2. Paste it into `formKey` in `src/content.ts`. Each request arrives as an email with name, phone, pickup address and Google Maps link.
3. Without a key the form runs in demo mode and sends nothing.

## Save requests in Google Sheets (recommended)
1. New Google Sheet > Extensions > Apps Script > paste `apps-script/Code.gs` > Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).
2. Copy the Web app URL into `sheetUrl` in `src/content.ts`.
3. Each request becomes a row (with a Status dropdown) and an email to you. Opening the URL in a browser should show "ECOVANTA pickup endpoint is live."

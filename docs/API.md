# API contract

The front end already works end to end, saving to the browser. To go live, build a small API with these routes and set `VITE_API_URL` (for example `https://api.greenacres.ac.tz/v1`) before `npm run build`. No UI code changes are needed: `src/data/db.ts` sends every write to the API and loads `/snapshot` on start.

Database tables: `db/schema.sql`. All bodies are JSON. Staff routes need a session cookie (`credentials: include`).

| Method | Path | Body | Used by |
|---|---|---|---|
| GET | `/snapshot` | none | Loads all tables for the signed-in role (public: none needed) |
| POST | `/applications` | Application | Online admission form |
| PATCH | `/applications/:id` | `{ stage }` | Admissions pipeline |
| POST | `/messages` | Message | Contact page |
| PATCH | `/messages/:id` | `{ read }` | CMS Inbox |
| POST | `/subscribers` | `{ id, createdAt, contact }` | Footer and News sign-up |
| POST | `/alumni` | Alumnus | Alumni page |
| PUT | `/pages/:page/:lang` | `{ heading, intro, cta, status }` | CMS Website pages (published copy shows on the site) |
| PATCH | `/posts/:slug` | `{ status }` | CMS News (Draft and Scheduled hide a post) |
| PATCH | `/staff/:key` | `{ onWebsite }` | CMS Staff |
| PATCH | `/media/:name` | `{ alt }` | CMS Media library |
| POST | `/sms/campaigns` | Campaign | Send notices (server forwards to Bermi Connect, sender ID GREENACRES) |
| PUT | `/settings/roles` | `number[][]` | CMS Settings |

Shapes are the TypeScript types at the top of `src/data/db.ts`.

Server-side jobs to add with the API:
1. On `POST /applications`: send the confirmation SMS with the reference number through Bermi Connect, and the mobile money prompt for the application fee.
2. On `PATCH /applications/:id`: send the stage SMS shown in the pipeline.
3. On `POST /messages`: email the office (info@ or bunazi@ by campus).
4. Write every staff action to `audit_log`.

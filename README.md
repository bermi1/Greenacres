# Green Acres Schools · website and Smart School System

A modern, bilingual (English / Kiswahili) rebuild of **greenacres.ac.tz**, plus the click-through MVP of the Green Acres Smart School System, prepared by **Bermi Techs**.

Every word, photo, video and PDF on the public site comes from the school's existing website. Nothing is invented: where the old site had no fact (fees, exam breakdowns given only as images), the page says so.

## What is inside

| Area | Routes | Notes |
|---|---|---|
| Public website | `/`, `/about`, `/academics`, `/admissions`, `/facilities`, `/results`, `/news`, `/news/:slug`, `/gallery`, `/alumni`, `/contact` | 347 photos, 8 videos, 6 joining-instruction PDFs, 12 news posts, 17 photo albums. EN/SW switch remembered per browser. |
| MVP (concept, sample data) | `/system`, `/apply`, `/parent`, `/office/admissions`, `/office/messages`, `/office/teacher-ai` | Online admission (4 steps), Parent Hub (mobile, Kiswahili), admissions pipeline, SMS notices with live TZS 18 cost, teacher copilot. |
| Control Centre (CMS, concept) | `/cms`, `/cms/pages`, `/cms/news`, `/cms/staff`, `/cms/media`, `/cms/sms`, `/cms/results`, `/cms/settings` | Sign in with any email/password (demo). The Media library and News editor use the real imported content. |

What works for real today, with no backend:
- Contact form, news subscription and the finished admission form open **WhatsApp** to +255 739 222 237 with the message filled in. Contact also offers email.
- Alumni registration opens an email to info@greenacres.ac.tz with the details filled in.
- Joining instructions download as PDFs. Videos play in a built-in viewer.

Everything in `/system`, `/apply` (before the WhatsApp step), `/parent`, `/office/*` and `/cms/*` is a working prototype on sample data and is labelled as such. Nothing is sent or charged.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # typecheck + production build into dist/
npm run preview
```

Stack: React 18, Vite 5, TypeScript, Tailwind CSS 3, React Router 6, lucide-react icons. No emoji anywhere.

## Design

Implements the "Green Acres Smart School System · MVP" design canvas (Overview, Admissions, Admissions office, Parent Hub, Messaging, Teacher AI, 10 website pages and 8 CMS modules): green `#0E6B2E`, deep green `#0B3F1D`, gold `#F5C400`, paper `#F6F8F5`, Manrope headings and Inter body. Real photography replaces every placeholder, and the real school crest replaces the "GA" monogram.

Motion is gentle and respects `prefers-reduced-motion`: hero cross-fade with a slow zoom, fade-up on scroll, count-up stats, a photo marquee and a full-screen photo/video viewer (keyboard arrows and Esc).

Performance: each page is its own lazy chunk (the home bundle is about 85 KB gzipped). Photos are WebP in two sizes (`public/media/thumb` 640px, `public/media/img` 1600px) and lazy-loaded. Videos are re-encoded to 720p H.264 with poster frames.

## Content

- `src/content/site.ts`: contacts, campuses, navigation, levels, facilities, FAQs, events, alumni voices, exam figures and English/Kiswahili copy.
- `src/content/generated/*.json`: posts, albums and the media index, generated from the old site's WordPress export.
- `scripts/build_content.py`: rebuilds those JSON files from a WordPress export folder (`pages.json`, `posts.json`, `canon.json`, `manifest.json`, `featured.json`). Run with `python3 -I scripts/build_content.py <export_dir>`.

## Deploy

Any static host works. `dist/` is the site; all unknown paths must fall back to `index.html` (already set up for Netlify in `public/_redirects` and for Vercel in `vercel.json`). For Nginx: `try_files $uri /index.html;`.

## Next steps (full build)

1. Backend for admissions, Parent Hub sign-in and the CMS (save edits, roles, audit log).
2. Bulk SMS through Bermi Connect (sender ID `GREENACRES`, TZS 18 per SMS) and mobile money for application fees.
3. ForShule export for enrolled students and parent groups.
4. School to confirm: fees, A-Level combinations, this year's event dates, Form Four and Form Six result breakdowns.

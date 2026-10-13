# Bookmarks

A hand-picked directory of useful websites. Next.js (App Router) + Supabase.

## Setup

1. Create a Supabase project.
2. In the SQL editor, run `supabase/migrations/0001_init.sql`, then `supabase/seed.sql`, then the other migrations in order (`0002`–`0004`; `0004` fills in taglines for the seeded bookmarks).
3. `cp .env.example .env.local` and fill in the project URL and anon key (Project Settings → API).
   Add the same two variables in Vercel. Optional: `NEXT_PUBLIC_DISCORD_URL` (invite link) shows the Discord banner and footer icon.
4. Sign-in (Authentication → Providers in Supabase):
   - **Email** works out of the box (magic link).
   - **Google** and **GitHub**: enable each provider and paste its OAuth client ID/secret.
   - Authentication → URL Configuration: set the Site URL to your domain and add
     `http://localhost:3000/**` and `https://YOUR-DOMAIN/**` to the redirect allow list.
5. `npm install && npm run dev`

## Editing content

Everything lives in Supabase tables — edit rows in the dashboard:

| Table | What it drives |
| --- | --- |
| `bookmarks` | Every card and `/b/[slug]` page. `featured_position` = home hero, `pick_position` = "Featured" row. `created_at` orders "Latest additions". `ad_position` = sponsored "AD" toast. Optional: `tagline` (2–3 words on cards), `subscriber` (gold tick + spotlight), `deal`/`deal_code` ("Top deals"), `startup_position`, `trending_position`, `about`, `features`, `pricing`, `platforms`, `screenshots` (extra gallery images). |
| `categories` | Sidebar, `/categories` and their descriptions. |
| `collections` | `/collections`; `bookmark_slugs` lists members in order. |
| `posts` | `/blog`; separate paragraphs in `body` with a blank line. `featured_position` = "Featured articles" (else the newest three). |
| `glossary_terms` | `/glossary`. |
| `saves`, `list_saves` | Each signed-in user's saved bookmarks, collections and articles (private via row-level security). |

Pages are cached and refresh from the database every 5 minutes; redeploy to see changes immediately.

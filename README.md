# Bookmarks

A hand-picked directory of useful websites. Next.js (App Router) + Supabase.

## Setup

1. Create a Supabase project.
2. In the SQL editor, run `supabase/migrations/0001_init.sql`, then `supabase/seed.sql`.
3. `cp .env.example .env.local` and fill in the project URL and anon key (Project Settings → API).
   Add the same two variables in Vercel.
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
| `bookmarks` | Every card and `/b/[slug]` page. `featured_position` = home hero, `pick_position` = "Featured" row. `created_at` orders "Latest additions". |
| `categories` | Sidebar, `/categories` and their descriptions. |
| `collections` | `/collections`; `bookmark_slugs` lists members in order. |
| `posts` | `/blog`; separate paragraphs in `body` with a blank line. |
| `glossary_terms` | `/glossary`. |
| `saves` | Each signed-in user's saved bookmarks (private via row-level security). |

Pages are cached and refresh from the database every 5 minutes; redeploy to see changes immediately.

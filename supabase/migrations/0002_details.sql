-- Optional detail-page fields. All empty by default; the UI hides whatever is blank.
alter table bookmarks
  add column about text not null default '',            -- longer write-up under the one-line description
  add column features text[] not null default '{}',     -- "Features & use cases" bullets
  add column pricing text not null default '',          -- e.g. Free, Freemium, Paid
  add column platforms text[] not null default '{}',    -- e.g. {Web,macOS,iOS}
  add column screenshots text[] not null default '{}';  -- extra gallery images after the thumbnail

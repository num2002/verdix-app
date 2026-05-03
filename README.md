# BUUxC Planet C Website

React/Vite website and lightweight CMS dashboard for BUUxC Planet C sustainability platform.

## Features

- Homepage hero slideshow with admin management
- Editable footer, articles, experts, and navigation menus
- Amata Awards page with extracted presentation slide assets
- Supabase-ready data layer with localStorage fallback
- Production build served as static files

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Build

```bash
npm run build
```

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor, then set:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Do not commit `.env`; keep production secrets on the server.

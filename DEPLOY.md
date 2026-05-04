# Deploy to a VPS

This project is a React/Vite static site. Build it with Node.js, then serve the generated `dist` directory with Nginx.

## Production Checklist

- Point a domain to the VPS public IP.
- Install Node.js 20 LTS or newer, Git, and Nginx on the VPS.
- Create a production `.env.production` from `.env.production.example`.
- Run `supabase/schema.sql` in the Supabase SQL editor before building.
- Create Supabase Auth users for people who should update CMS content, then mark admin users with `app_metadata.role = admin`.
- Enable HTTPS with Certbot after Nginx works over HTTP.

## First-Time Server Setup

```bash
sudo apt update
sudo apt install -y nginx git curl

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo mkdir -p /var/www/verdix-app
sudo chown -R "$USER":"$USER" /var/www/verdix-app
```

## Upload or Clone the App

Clone the repository on the VPS:

```bash
git clone https://github.com/num2002/verdix-app.git /var/www/verdix-app
cd /var/www/verdix-app
```

Or, if the folder already exists:

```bash
cd /var/www/verdix-app
git pull
```

## Environment

Create the production env file:

```bash
cp .env.production.example .env.production
nano .env.production
```

Set real values:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

Vite embeds these values during build, so rebuild after changing `.env.production`.

## Supabase Security

`supabase/schema.sql` allows public reads, but CMS writes require a Supabase Auth user with `app_metadata.role = admin`.

In Supabase Dashboard, open **Authentication > URL Configuration** and set:

```text
Site URL: https://example.com
Redirect URLs: https://example.com/**
```

Create the first admin user in **Authentication > Users**. Confirm the email if your project requires email confirmation, then run this in the Supabase SQL editor:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@example.com';
```

After changing app metadata, log out and log in again so the browser receives a fresh JWT with the admin role.

Regular registered users do not receive the admin role and cannot write CMS data through Supabase RLS.

## Build

```bash
npm ci
npm run build
```

The production files will be in:

```text
/var/www/verdix-app/dist
```

## Nginx

Copy the Nginx config and update `server_name`:

```bash
sudo cp deploy/nginx-verdix-app.conf /etc/nginx/sites-available/verdix-app
sudo nano /etc/nginx/sites-available/verdix-app
sudo ln -s /etc/nginx/sites-available/verdix-app /etc/nginx/sites-enabled/verdix-app
sudo nginx -t
sudo systemctl reload nginx
```

Open the domain in a browser. If it loads correctly over HTTP, add HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

## Redeploy After Changes

```bash
cd /var/www/verdix-app
git pull
npm ci
npm run build
sudo systemctl reload nginx
```

## Quick Health Checks

```bash
curl -I http://example.com
sudo nginx -t
sudo journalctl -u nginx --no-pager -n 50
```

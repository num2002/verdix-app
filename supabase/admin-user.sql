-- Create the user in Supabase Dashboard first:
-- Authentication > Users > Add user
--
-- Email: admin@verdixgreen.com
-- Password: set it in the Supabase Dashboard, then change it after first login.
--
-- After the user exists, run this SQL to grant CMS admin access.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@verdixgreen.com';


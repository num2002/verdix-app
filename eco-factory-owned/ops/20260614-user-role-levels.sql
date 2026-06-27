ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'standard_user';

ALTER TABLE public.users
  ALTER COLUMN role SET DEFAULT 'standard_user'::public.user_role;

UPDATE public.users
SET role = 'standard_user'::public.user_role,
    updated_at = now()
WHERE role = 'factory'::public.user_role;

UPDATE public.users
SET role = 'super_admin'::public.user_role,
    updated_at = now()
WHERE lower(email) IN ('khomsans@gmail.com', 'eco@verdixgreen.com');

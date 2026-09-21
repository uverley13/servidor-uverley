create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'cliente' check (role in ('cliente', 'admin')),
  balance integer not null default 0 check (balance >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price integer not null default 0 check (price >= 0),
  icon text not null default 'MonitorSmartphone',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  service_id uuid not null references public.services(id),
  status text not null default 'Pendiente' check (status in ('Pendiente', 'Procesando', 'Completado', 'Cancelado')),
  amount integer not null check (amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.recharges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null check (amount > 0),
  receipt_path text not null,
  status text not null default 'Pendiente' check (status in ('Pendiente', 'Aprobado', 'Rechazado')),
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (user_id, receipt_path)
);

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.recharges enable row level security;

create policy "Public can view active services" on public.services for select using (active = true);
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users view own recharges" on public.recharges for select using (auth.uid() = user_id);
create policy "Users create own recharges" on public.recharges for insert with check (auth.uid() = user_id);

-- Las operaciones administrativas deben ejecutarse mediante funciones RPC seguras
-- que validen el rol del usuario y usen transacciones atómicas para evitar duplicados.

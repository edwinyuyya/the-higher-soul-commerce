-- Kolom tambahan untuk pesanan produk satuan / paket dan Human Design.
-- Jalankan sekali di Supabase → SQL Editor. Aman dijalankan ulang.
alter table public.orders add column if not exists order_code text;
alter table public.orders add column if not exists items text;
alter table public.orders add column if not exists birth_time text;
alter table public.orders add column if not exists birth_place text;

-- Enable Row Level Security on all tables
alter table clients enable row level security;
alter table client_files enable row level security;
alter table document_items enable row level security;
alter table notes enable row level security;
alter table activity_log enable row level security;

-- Allow any authenticated user full access (single-firm model)
create policy "authenticated full access" on clients
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on client_files
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on document_items
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on notes
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on activity_log
  for all to authenticated using (true) with check (true);

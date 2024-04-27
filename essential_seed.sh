export PGPASSWORD=postgres
echo "Dumping Auth Data into seed.sql"
pg_dump -h localhost -U postgres -d postgres --column-inserts --data-only --enable-row-security --port=54322 --table=auth.users > supabase/seed.sql
echo "Dumping Public Schema Data into seed.sql"
pg_dump -h localhost -U postgres -d postgres -n public --data-only --column-inserts --enable-row-security --port=54322 >> supabase/seed.sql;


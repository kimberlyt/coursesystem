# coursesystem

1. Restore db script to generate tables run vcommand below 

psql -U username -d courses  < path\to\coursesdump.sql

2. Please run this command in the courses folder:

nodemon start





















BACKUP (CREATE SQL SCRIPT) 

pg_dump --create -s -U kim -d courses >  C:\Users\jkanj\OneDrive\documents\coursesdump.sql
# coursesystem

How to run the code:

1. Go in terminal and navigate to the folder you want to place this project in then right this command
git clone -b coursesapp https://github.com/kimberlyt/coursesystem.git

2. Go to psql shell:
CREATE DATABASE courses;

3. In the terminal/ cmd navigate to the bin of where you stored psql eg. C:\Program Files\PostgreSQL\13\bin and
Restore my db script to generate tables run vcommand below replacing username and path
eg C:\Users\...\...\....\....\coursesystem\courses\coursesdump.sql


psql -U username -d courses  < path\to\coursesdump.sql



4. Navigate to the courses folder 
eg C:\Users\...\...\...\test\coursesystem\courses and run this command

nodemon start

5. in your browser open up http://localhost:3000/login and to navigate to admin that has the CRUD Operations you can go to http://localhost:3000//admin/login in the browser

5.The end



















DISREGARD THIS

BACKUP (CREATE SQL SCRIPT) 

pg_dump --create -s -U username -d database_name >  C:\Users\...\...\documents\coursesdump.sql
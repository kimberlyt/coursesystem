#!/bin/bash
psql -U postgres -d courses -c "CREATE TABLE mytable(id serial, name varchar) "
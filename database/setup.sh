#!/bin/bash

# only run this script once

mkdir postgres_data

echo " ### Building and Running Docker ###"
docker-compose up --detach

# bad code smell, however I want to make sure
# docker is running
echo "Adding in init data to db"
sleep 1
python3 create_users.py
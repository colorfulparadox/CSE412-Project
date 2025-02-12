#!/bin/bash

# only run this script once


if [ -d "./postgres_data" ]; then
    echo "script was ran before. run clean up script"
    exit 1
fi


mkdir postgres_data

echo " ### Building and Running Docker ###"
docker-compose up --detach


sleep 1

mkdir .venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r python_requirements.txt
python3 create_users.py
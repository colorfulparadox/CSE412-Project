#!/bin/bash

# only run this script once


if [ -d "./postgres_data" ]; then
    echo "script was ran before. run clean up script"
    exit 1
fi


mkdir postgres_data

echo " ### Building and Running Docker ###"
docker-compose up --detach


sleep 3

echo " ### Inserting Test Data! ###"

mkdir .venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r python_requirements.txt
python3 load_data.py
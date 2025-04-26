if [ -d "./.venv" ]; then
    echo "start flask"
    source .venv/bin/activate
    cd src
    flask run
else
    echo "run setup.sh first"
fi

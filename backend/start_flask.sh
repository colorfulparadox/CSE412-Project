if [ -d "./.venv" ]; then
    echo "start flask"
    source .venv/bin/activate
    cd src
    flask run --debug --host=0.0.0.0 --port=5001
else
    echo "run setup.sh first"
fi

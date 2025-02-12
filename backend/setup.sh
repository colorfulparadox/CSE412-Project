if [ -d "./.venv" ]; then
    echo "Starting python environment"
    source .venv/bin/activate
else
    echo "Creating and starting python environment"
    mkdir .venv
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r python_requirements.txt
fi
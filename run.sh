
echo "### RUNNING APP ###"

echo "# REBUIDLING WEBSITE #"
cd frontend/webapp
npm install
npm run build
cd ../..

echo "# RUNNING FLASK APP #"
echo "# ACCESS APP VIA 'localhost:5001'"
cd backend
./start_flask.sh
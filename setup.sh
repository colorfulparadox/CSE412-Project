
echo "### RUNNING SETUP SCRIPT ###"

echo "# SETTING UP DB #"
cd database
./cleanup.sh
./setup.sh
cd ..

echo "# BUIDLING WEBSITE #"
cd frontend/webapp
npm install
npm run build
cd ../..

echo "# SETTING UP BACKEND DEP #"
cd backend
./setup.sh
cd ..
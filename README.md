# CSE412 Group Project

### Group: Alexis Arce, Kaleb Maull, Preston Wilson, Skyler Riske

#### Setting up the Postgres Database
To begin setting up the DB first make sure you have the Docker app installed.
Once installed run Docker and execute ./setup.sh

#### Running the database after setup
When you run ./setup.sh the DB will run till you turn it off. 
You can turn the DB off in the Docker app. You can also run the container from the app as well. 

#### Setting up python dev environment
Sometimes VS Code fails to select the correct interpreter for the
Python environment. If this occurs and you are on Mac do this:
- cmd-shift-p
- Search up Python: Select Interpreter
- Select 'Enter interpreter path...
- Select 'Find'
- Select the .venv file that is part of the project
- Go to bin and find select python3 as your interpreter

NOTE: If you have hidden files off and are unable to find it hit cmd + shift + . (period)

#### Python Dependencies
If a dependency is added or removed run:
```
pip3 freeze > python_requirements.txt
```
in the correct directory to update the python_requirements.txt
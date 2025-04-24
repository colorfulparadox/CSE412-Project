import psycopg2.pool
from flask import Flask, send_from_directory, jsonify, request, redirect, url_for, make_response
from flask_cors import CORS
import os


from user import login_user, LoginResult

app = Flask(__name__, static_folder="../../frontend/webapp/dist", static_url_path=None)
CORS(app, origins="http://localhost:3000", supports_credentials=True)


db_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=1,
    maxconn=20,
    dbname="postgres",
    user="postgres",
    password="password",
    host="localhost",
    port="5430"
)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>", methods=["GET"])
def root(path):
    file_path = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)

    auth_cookie = request.cookies.get("auth_token")

    if not auth_cookie:
        if request.path not in ["/", "/login"]:
            return redirect("/")
    else:
        if request.path == "/login":
            return redirect("/userprofile")

    return send_from_directory(app.static_folder, "index.html")


@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    #print(request.form)

    result, auth_token = login_user(db_pool, username, password)

    if result == LoginResult.SUCCESS:
        response = make_response({"message": "Login successful", "status": "success"})
        response.set_cookie('auth_token', auth_token, max_age=60 * 60 * 24 * 30)
        return response, 200
    else:
        if result == LoginResult.DB_ERROR:
            print(auth_token)
        return {"message": "Invalid username or password", "status": "error"}, 401

'''
@app.route("/user/auth", methods=["GET"])
def auth_user():
    pass

@app.route("/login", methods=["POST"])
def login_user():
    response = make_response("Logged In")
    response.set_cookie(
        "authToken", "123", 
        httponly=True, 
        secure=True, 
        samesite="None", 
        path="/"
    )
    return response

@app.route("/user/create", methods=["POST"])
def create_user():
    pass
'''

if __name__ == "__main__":
    app.run(debug=True, port=5454)
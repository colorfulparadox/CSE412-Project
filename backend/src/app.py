from flask import Flask, send_from_directory, jsonify, request, redirect, url_for, make_response
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../../frontend/webapp/dist", static_url_path=None)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def root(path):
    file_path = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)

    return send_from_directory(app.static_folder, "index.html")

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
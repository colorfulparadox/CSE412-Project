from flask import Flask, send_from_directory, jsonify, request, redirect, url_for, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

@app.route("/")
def root():
    pass

@app.route("/user/auth", methods=["GET"])
def auth_user():
    pass

@app.route("/user/login", methods=["POST"])
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


if __name__ == "__main__":
    app.run(debug=True, port=5454)
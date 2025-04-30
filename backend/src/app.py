from urllib import response
import psycopg2.pool
import psycopg2.extras
from flask import Flask, send_from_directory, jsonify, request, redirect, url_for, make_response
from flask_cors import CORS
import os


from user import *

app = Flask(__name__, static_folder="../../frontend/webapp/dist", static_url_path=None)
CORS(app, origins="http://localhost:5001", supports_credentials=True)


db_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=1,
    maxconn=20,
    dbname="postgres",
    user="postgres",
    password="password",
    host="localhost",
    port="5430"
)

def run_query(query, args=None):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute(query, args)

        # Only fetch results if it's a SELECT query
        if query.strip().lower().startswith("select"):
            result = cur.fetchall()
        else:
            conn.commit()
            result = None

        cur.close()
        return result

    finally:
        if conn:
            db_pool.putconn(conn)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>", methods=["GET"])
def root(path):
    file_path = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)

    auth_token = request.cookies.get("auth_token")
    auth_check_response = verify_auth_token_redirect(db_pool, auth_token)

    print(request.path)
    print(auth_token)


    if auth_check_response:
        if request.path != "/" and request.path != "/login" and request.path != "/globalpokedex" and request.path != "/statcompare":
            return auth_check_response, 301
    elif auth_check_response is None and request.path == "/login":
            return redirect("/")


    return send_from_directory(app.static_folder, "index.html")


@app.route("/login", methods=["POST"])
def login():
    print("HELLO TIME TO LOG IN USER")
    username = request.form.get("username")
    password = request.form.get("password")
    #print(request.form)
    time = 86400

    result, auth_token = login_user(db_pool, username, password, time)

    if result == LoginResult.SUCCESS:
        response = make_response({"message": "Login successful", "status": "success"})
        response.set_cookie('auth_token', auth_token, max_age=time, samesite='Lax', secure=False)
        return response, 200
    else:
        if result == LoginResult.DB_ERROR:
            print(auth_token)
        return jsonify({"message": "Invalid username or password", "status": "error"}), 401

@app.route("/signup", methods=["POST"])
def signup():
    name = request.form.get("name")
    username = request.form.get("username")
    password = request.form.get("password")
    print(request.form)

    result, message = create_new_user(db_pool, name, username, password)

    if result == SignUpResult.SUCCESS:
        response = make_response({"message": "Signup successful", "status": "success"})
        return response, 200
    else:
        return jsonify({"message": f"{message}", "status": "error"}), 401


    return jsonify({"message": "Invalid username or password", "status": "error"}), 401

@app.route("/pokemon/<pokedexid>", methods=["GET"])
def get_pokemon(pokedexid):
    # I could just also do another endpoint for accessing by 
    # pokemon name, and having the logic in the website.
    # This is kinda slick though.
    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        resp = run_query("SELECT * FROM pokemon WHERE pokedex_num = %s;", (pokedexid,))
        return make_response(resp)

    except ValueError:
        # use pokemon name
        resp = run_query("SELECT * FROM pokemon WHERE LOWER(name) LIKE %s;", (pokedexid,))
        print(pokedexid, resp)
        return make_response(resp)

@app.route("/pokemon", methods=["GET"])
def get_all_pokemon():
    resp = run_query("SELECT * FROM pokemon")
    return make_response(resp)

@app.route("/pokedex/", methods=["GET"])
def get_pokedex():

    authid = request.cookies.get('auth_token')

    resp = run_query("""
                     SELECT * 
                     FROM pokemon 
                     WHERE pokedex_num IN (
                        SELECT pokedex_num 
                        FROM pokedex 
                        WHERE uid IN (SELECT uid FROM auth_tokens WHERE auth_key = %s));
                     """, (authid,))
    return make_response(resp)

@app.route("/pokedex/add/<pokedexid>", methods=["GET"])
def add_pokemon(pokedexid):
    authid = request.cookies.get('auth_token')

    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        run_query("""
            INSERT INTO pokedex (uid, pokedex_num)
            VALUES (
                (SELECT uid FROM auth_tokens WHERE auth_key = %s),
                %s
            )
            ON CONFLICT (uid, pokedex_num) DO NOTHING;
        """, (authid, pokedexid,))
        return jsonify(response="good")

    except ValueError:
        # use pokemon name
        run_query("""
            INSERT INTO pokedex (uid, pokedex_num)
            SELECT 
                (SELECT uid FROM auth_tokens WHERE auth_key = %s),
                pokedex_num
            FROM pokemon
            WHERE LOWER(name) = LOWER(%s)
            ON CONFLICT (uid, pokedex_num) DO NOTHING;
        """, (authid, pokedexid,))
        return jsonify(response="good")

@app.route("/pokedex/remove/<pokedexid>", methods=["GET"])
def remove_pokemon(pokedexid):

    authid = request.cookies.get('auth_token')

    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        run_query("""
            DELETE FROM pokedex
            WHERE uid = (SELECT uid FROM auth_tokens WHERE auth_key = %s)
            AND pokedex_num = %s
        """, (authid, pokedexid,))
        return jsonify(response="good")

    except ValueError:
        # use pokemon name
        run_query("""
                    DELETE FROM pokedex
                    WHERE uid = (SELECT uid FROM auth_tokens WHERE auth_key = %s)
                    AND pokedex_num = (
                    SELECT pokedex_num FROM pokemon WHERE LOWER(name) = LOWER(%s)
                    );
                    """, (authid, pokedexid,))
        return jsonify(response="good")

@app.route("/pokedex/<pokedexid>", methods=["GET"])
def get_filtered_pokedex(pokedexid):
    authid = request.cookies.get('auth_token')

    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        resp = run_query("""
                        SELECT * 
                        FROM pokemon 
                        WHERE pokedex_num IN (
                            SELECT pokedex_num 
                            FROM pokedex 
                            WHERE uid = (SELECT uid FROM auth_tokens WHERE auth_key = %s)) AND pokedex_num = %s;
                    """, (authid, pokedexid,))

        return make_response(resp)

    except ValueError:
        resp = run_query("""
                        SELECT * 
                        FROM pokemon 
                        WHERE pokedex_num IN (
                            SELECT pokedex_num 
                            FROM pokedex 
                            WHERE uid = (SELECT uid FROM auth_tokens WHERE auth_key = %s)) AND LOWER(name) = LOWER(%s);
                    """, (authid, pokedexid,))

    return make_response(resp)

@app.route("/profile", methods=["GET"])
def get_profile_data():
    authid = request.cookies.get('auth_token')

    resp = run_query("""
        SELECT username, name, blurb
        FROM trainer
        WHERE uid IN (SELECT uid FROM auth_tokens where auth_key = %s)
    """, (authid,))
    return make_response(resp)

@app.route('/profile/set', methods=["POST"])
def set_profile_data():
    authid = request.cookies.get('auth_token')
    newdata = request.get_json()

    username = newdata.get('username', '')
    name = newdata.get('name', '')
    blurb = newdata.get('blurb', '')

    resp = run_query("""
        UPDATE trainer
        SET username = %s,
            name = %s,
            blurb = %s
        WHERE uid IN (SELECT uid FROM auth_tokens where auth_key = %s);
    """, (username, name, blurb, authid, ))
    
    return make_response(jsonify("good"))

@app.route('/profile/setpw', methods=["POST"])
def set_profile_password():
    authid = request.cookies.get('auth_token')

    print(request.get_json())
    return make_response(jsonify("good"))

@app.route("/logout", methods=["POST"])
def logout():
    auth_token = request.cookies.get("auth_token")
    logout_user(db_pool, auth_token)
    response = make_response(jsonify({"message": "logged out"}))
    response.set_cookie(
        "auth_token", "",
        expires=0,
        path="/"
    )
    return response, 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
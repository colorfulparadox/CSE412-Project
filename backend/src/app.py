from urllib import response
import psycopg2.pool
import psycopg2.extras
from flask import Flask, send_from_directory, jsonify, request, redirect, url_for, make_response
from flask_cors import CORS
import os


from user import login_user, LoginResult

app = Flask(__name__, static_folder="../../frontend/webapp/dist", static_url_path=None)
CORS(app, origins="http://localhost:5173", supports_credentials=True)


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
        return jsonify({"message": "Invalid username or password", "status": "error"}), 401

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

@app.route("/pokedex", methods=["GET"])
def get_pokedex():
    
    resp = run_query("""
                     SELECT * 
                     FROM pokemon 
                     WHERE pokedex_num IN (
                        SELECT pokedex_num 
                        FROM pokedex 
                        WHERE uid = %s);
                     """, ('1',))
    return make_response(resp)

@app.route("/pokedex/add/<pokedexid>", methods=["GET"])
def add_pokemon(pokedexid):
    uid = '1'
    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        run_query("""
                    INSERT INTO pokedex (uid, pokedex_num)
                    VALUES (%s, %s)
                    ON CONFLICT (uid, pokedex_num) DO NOTHING;
                    """, (uid, pokedexid,))
        return jsonify(response="good")

    except ValueError:
        # use pokemon name
        run_query("""
                    INSERT INTO pokedex (uid, pokedex_num)
                    SELECT %s, pokedex_num
                    FROM pokemon
                    WHERE LOWER(name) = LOWER(%s)
                    ON CONFLICT (uid, pokedex_num) DO NOTHING;
                        """, (uid, pokedexid,))
        return jsonify(response="good")

@app.route("/pokedex/remove/<pokedexid>", methods=["GET"])
def remove_pokemon(pokedexid):
    uid = '1'
    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        run_query("""
                    DELETE FROM pokedex
                    WHERE uid = %s
                    AND pokedex_num = %s
                    """, (uid, pokedexid,))
        return jsonify(response="good")

    except ValueError:
        # use pokemon name
        run_query("""
                    DELETE FROM pokedex
                    WHERE uid = %s
                    AND pokedex_num = (
                    SELECT pokedex_num FROM pokemon WHERE LOWER(name) = LOWER(%s)
                    );
                    """, (uid, pokedexid,))
        return jsonify(response="good")

@app.route("/pokedex/<pokedexid>", methods=["GET"])
def get_filtered_pokedex(pokedexid):
    uid = '1'
    
    try:
        pokedexid = int(pokedexid)
        # use pokedex id
        resp = run_query("""
                        SELECT * 
                        FROM pokemon 
                        WHERE pokedex_num IN (
                            SELECT pokedex_num 
                            FROM pokedex 
                            WHERE uid = %s) AND pokedex_num = %s;
                    """, (uid, pokedexid,))

        return make_response(resp)

    except ValueError:
        resp = run_query("""
                        SELECT * 
                        FROM pokemon 
                        WHERE pokedex_num IN (
                            SELECT pokedex_num 
                            FROM pokedex 
                            WHERE uid = %s) AND LOWER(name) = LOWER(%s);
                    """, (uid, pokedexid,))

    return make_response(resp)

@app.route("/profile/<authid>", methods=["GET"])
def get_profile_data(authid):
    resp = run_query("""
        SELECT uid, username, name, blurb
        FROM trainer
        WHERE uid = %s
    """, (authid,))
    return make_response(resp)

@app.route('/profile/set/<authid>', methods=["POST"])
def set_profile_data(authid):
    print(request.get_json())
    return make_response(jsonify("good"))

if __name__ == "__main__":
    app.run(debug=True, port=5454)
import psycopg2
import bcrypt
import uuid
from enum import Enum
from datetime import datetime, timedelta
from flask import redirect, make_response

class LoginResult(Enum):
    SUCCESS = 0,
    ERROR = 1,
    DB_ERROR = 2

class SignUpResult(Enum):
    SUCCESS = 0,
    ERROR = 1,
    DB_ERROR = 2

def check_auth_token(db_pool, key: str) -> bool:
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                    SELECT exp_date FROM auth_tokens WHERE auth_key = %s
                    """, (key,))
            result = cur.fetchone()

            if result is None:
                return False

            exp_date = result[0]

            if exp_date < datetime.today().date():
                cur.execute("""
                        DELETE FROM auth_tokens WHERE auth_key = %s
                    """, (key,))
                conn.commit()
                return False

            return True

    except Exception as e:
        print("DB Error:", e)
        conn.rollback()
        return False
    finally:
        db_pool.putconn(conn)

def verify_auth_token_redirect(db_pool, key: str):
    valid = check_auth_token(db_pool, key)
    if not valid:
        response = make_response(redirect("/login"))
        response.set_cookie(
            "auth_token", "",
            expires=0,
            path="/"
        )
        return response

    return None

def hash_password(password: str) -> bytes:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(8))

def create_auth_token(cur, uid: str, time: float) -> str:
    now = datetime.now()
    expires = now + timedelta(seconds=time)

    auth_token = str(uuid.uuid4())
    cur.execute("""
        INSERT INTO auth_tokens (auth_key, uid, issue_date, exp_date) 
        VALUES (%s, %s, %s, %s)
    """, (auth_token, uid, now, expires))
    return auth_token

def create_new_user(db_pool, name: str, username: str, password: str): 
    pass
    #password = "password".encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt(8))
    #resp = run_query("INSERT INTO trainer VALUES (%s, %s, %s);", (username, name, hash_password))


def login_user(db_pool, username: str, password: str, time: float) -> tuple[LoginResult, str]:
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT uid, password 
                FROM trainer 
                WHERE username = %s;
            """, (username,))
            result = cur.fetchone()

            if result is None:
                return LoginResult.ERROR, ""
            uid = result[0]
            db_password = bytes(result[1])

            if bcrypt.checkpw(password.encode("utf-8"), db_password):
                token = create_auth_token(cur, uid, time)
                conn.commit()
                return LoginResult.SUCCESS, token
            return LoginResult.ERROR, ""
    except Exception as e:
        print("DB Error:", e)
        conn.rollback()
        return LoginResult.ERROR, e
    finally:
        db_pool.putconn(conn)
    return LoginResult.ERROR, ""

def logout_user(db_pool, key: str):
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                    DELETE FROM auth_tokens WHERE auth_key = %s;
                """, (key,))
            conn.commit()
    except Exception as e:
        print("DB Error:", e)
        conn.rollback()
    finally:
        db_pool.putconn(conn)
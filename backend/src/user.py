import psycopg2
import bcrypt
import uuid
from enum import Enum


SALT_SIZE = 16

class LoginResult(Enum):
    SUCCESS = 0,
    ERROR = 1,
    DB_ERROR = 2

def check_auth_token(token: str) -> bool:
    pass

def create_auth_token(cur, username: str) -> str:
    auth_token = str(uuid.uuid4())
    cur.execute("""
        UPDATE trainer
        SET auth_token = %s
        WHERE username = %s;
    """, (auth_token, username))
    return auth_token

def create_new_user(db_pool, name: str, username: str, password: str): 
    password = "password".encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt(8))
    resp = run_query("INSERT INTO trainer VALUES (%s, %s, %s);", (username, name, hash_password))


def login_user(db_pool, username: str, password: str) -> tuple[LoginResult, str]:
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT password 
                FROM trainer 
                WHERE username = %s;
            """, (username,))
            result = cur.fetchone()

            if result is None:
                return LoginResult.ERROR, ""
            db_password = bytes(result[0])

            if bcrypt.checkpw(password.encode("utf-8"), db_password):
                token = create_auth_token(cur, username)
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

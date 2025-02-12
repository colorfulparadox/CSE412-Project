import psycopg2
import bcrypt

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="password",
    host="localhost",
    port="5430"
)

try:
    cur = conn.cursor()
    
    username = "admin"
    password = "password".encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt())
    email = "heewook.lee@asu.edu"

    cur.execute("""
        INSERT INTO UserData (username, password, email)
        VALUES (%s, %s, %s)
        ON CONFLICT (username) DO NOTHING;
    """, (username, hash_password, email))
    conn.commit()
    cur.close()
except Exception as e:
    conn.rollback()
    print(f"Adding Users to DB Error: {e}")
    exit(1)

import psycopg2
import bcrypt
import csv

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="password",
    host="127.0.0.1",
    port="5430"
)

try:
    cur = conn.cursor()
    
    '''
    username = "admin"
    password = "password".encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt(16))
    email = "heewook.lee@asu.edu"

    cur.execute("""
        INSERT INTO UserData (username, password, email)
        VALUES (%s, %s, %s)
        ON CONFLICT (username) DO NOTHING;
    """, (username, hash_password, email))
    '''
    
    with open("data/pokemon.csv") as file:
        reader = csv.reader(file, delimiter=",")
        next(reader, None)
        for row in reader:
            if row[9]:
                cur.execute("""
                    INSERT INTO pokemon (name, bst, hp, atk, def, spatk, spdef, speed, type1, type2, pokedex_num)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]))
            else:
                cur.execute("""
                    INSERT INTO pokemon (name, bst, hp, atk, def, spatk, spdef, speed, type1, pokedex_num)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[10]))
    

    password = "password".encode('utf-8')
    hash_password = bcrypt.hashpw(password, bcrypt.gensalt(16))

    with open("data/trainers.csv") as file:
        reader = csv.reader(file, delimiter=",")
        next(reader, None)
        usercount = 0
        for row in reader:
            cur.execute("""
                INSERT INTO trainer (username, name, blurb, password)
                VALUES (%s, %s, %s, %s)
                """, (("user"+str(usercount)), row[1], row[2], hash_password))
            usercount += 1
    
    with open("data/pokedex.csv") as file:
        reader = csv.reader(file, delimiter=",")
        next(reader, None)
        for row in reader:
            cur.execute("""
                INSERT INTO pokedex (uid, pokedex_num)
                VALUES (%s, %s)
                """, (row[0], row[1]))
    
    conn.commit()
    cur.close()
except Exception as e:
    conn.rollback()
    print(f"Adding Users to DB Error: {e}")
    exit(1)

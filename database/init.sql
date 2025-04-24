
DROP TABLE IF EXISTS trainer;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS pokedex;

CREATE TABLE trainer (
    uid CHAR(10) PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    blurb TEXT,
    password BYTEA NOT NULL,
    auth_token TEXT
);

CREATE TABLE pokemon (
    name VARCHAR(50) NOT NULL,
    bst SMALLINT NOT NULL CHECK (bst >= 0),
    hp SMALLINT NOT NULL CHECK (hp >= 0),
    atk SMALLINT NOT NULL CHECK (atk >= 0),
    def SMALLINT NOT NULL CHECK (def >= 0),
    spatk SMALLINT NOT NULL CHECK (spatk >= 0),
    spdef SMALLINT NOT NULL CHECK (spdef >= 0),
    speed SMALLINT NOT NULL CHECK (speed >= 0),
    
	type1 VARCHAR(20) NOT NULL CHECK (
        type1 IN ('normal', 'fire', 'water', 'electric', 'grass', 'ice', 
                  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
                  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy')
    ),
	
    type2 VARCHAR(20) CHECK (
        type2 IN ('normal', 'fire', 'water', 'electric', 'grass', 'ice', 
                  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
                  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') OR type2 IS NULL
    ),

    CHECK (type1 <> type2 OR type2 IS NULL),

    pokedex_num INT PRIMARY KEY
);

CREATE TABLE pokedex (
    uid CHAR(10) NOT NULL,
    pokedex_num INT NOT NULL,
    PRIMARY KEY (uid, pokedex_num),
    FOREIGN KEY (uid) REFERENCES trainer(uid) ON DELETE CASCADE,
    FOREIGN KEY (pokedex_num) REFERENCES pokemon(pokedex_num) ON DELETE CASCADE
);


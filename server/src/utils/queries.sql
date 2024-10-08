    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    profile_image TEXT  
    );

  CREATE TABLE IF NOT EXISTS chickens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    age INTEGER,
    breed TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );


  CREATE TABLE IF NOT EXISTS walks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    chicken_id INTEGER,
    title TEXT,
    location TEXT,
    duration REAL,
    distance REAL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chicken_id) REFERENCES chickens(id)
  );

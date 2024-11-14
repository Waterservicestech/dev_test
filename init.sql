-- creating user table
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

-- creating post table
CREATE TABLE IF NOT EXISTS "post" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  userId INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES "user"(id) ON DELETE CASCADE
);

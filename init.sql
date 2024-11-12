USE test_db;

-- Build a User table
CREATE TABLE IF NOT EXISTS User (
  id        INT          AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName  VARCHAR(100) NOT NULL,
  email     VARCHAR(100) NOT NULL,
);

-- Build a Post Table
CREATE TABLE IF NOT EXISTS Post (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  userId      INT          NOT NULL,
  FOREIGN KEY (userId)     REFERENCES User(id) ON DELETE CASCADE
);
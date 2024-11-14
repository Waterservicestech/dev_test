USE test_db;

CREATE TABLE user (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE post (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId CHAR(36) NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
);

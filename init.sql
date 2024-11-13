USE test_db;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL, 
    email varchar(100) NOT NULL
)

DROP TABLE IF EXISTS post;

CREATE TABLE post (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    userId int NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
)

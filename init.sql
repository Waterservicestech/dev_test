USE test_db;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(userId) REFERENCES user(id)
);
USE test_db;

CREATE TABLE user (
    id int AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL
);


CREATE TABLE post (
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    userId int NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) 
);
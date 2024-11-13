USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE user (
    id int AUTO_INCREMENT,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY (id)
);
--TODO Crie a tabela de posts;
CREATE TABLE post (
    id int AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    postDescription varchar(100) NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (userId) REFERENCES user(id)
);
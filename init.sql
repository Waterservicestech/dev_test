USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

--TODO Crie a tabela de posts;
CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
);
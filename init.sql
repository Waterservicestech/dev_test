USE test_db;

-- Remove tabelas caso existam.
DROP TABLE IF EXISTS user, post;

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
    CONSTRAINT fk_post_user FOREIGN KEY (userId) REFERENCES user(id)
);
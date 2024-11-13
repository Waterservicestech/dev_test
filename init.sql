USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firtsName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
--TODO Crie a tabela de posts;

CREATE TABLE IF NOT EXISTS post(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    FOREING KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

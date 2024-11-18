USE test_db;

-- Garantindo o usuário no container
CREATE USER IF NOT EXISTS 'root' @'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'root' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

-- Criar a tabela de usuários
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Criar a tabela de posts
CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES user (id)
);
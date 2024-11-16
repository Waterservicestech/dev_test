USE test_db;

--TODO Crie a tabela de user;

--TODO Crie a tabela de posts;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE Post (
    id INT AUTO PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description_post VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
)
USE test_db;

--TODO Crie a tabela de user;
    CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE, 
        --Garante a integridade dos dados, um email só poderá ser usado por um único usuario.
    );
--TODO Crie a tabela de posts;
    CREATE TABLE posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        --DEfine que se um dado for excluído na tabela user, também será excluído na tabela posts(em refêrencia a chave estrangeira).
    );
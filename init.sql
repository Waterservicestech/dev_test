USE test_db;

-- Criação da tabela de usuários
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,         
  firstName VARCHAR(100) NOT NULL,            
  lastName VARCHAR(100) NOT NULL,             
  email VARCHAR(100) NOT NULL UNIQUE,         
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de posts
CREATE TABLE post (
  id INT AUTO_INCREMENT PRIMARY KEY,         
  title VARCHAR(100) NOT NULL,                
  description VARCHAR(100) NOT NULL,          
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,                       
  FOREIGN KEY (userId) REFERENCES user(id)   
);

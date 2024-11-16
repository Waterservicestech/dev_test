CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE "post" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES "user"(id)
);

INSERT INTO "user" (firstName, lastName, email)
VALUES ('nome', 'sobrenome', 'nome@email.com');

INSERT INTO "post" (title, description, userId)
VALUES ('Titulo exemplo', 'Descrição de exemplo', 1);

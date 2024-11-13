USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE IF NOT EXISTS "users" (
    "id" int NOT NULL AUTO_INCREMENT,
    "firstName" varchar(100) NOT NULL,
    "lastName" varchar(100) NOT NULL,
    "email" varchar(100) NOT NULL,
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- id – Tipo: Int, autoincremental, chave primária (PK).
-- firstName – Tipo: Varchar(100), não nulo.
-- lastName – Tipo: Varchar(100), não nulo.
-- email – Tipo: Varchar(100), não nulo.

--TODO Crie a tabela de posts;
CREATE TABLE IF NOT EXISTS "posts" (
    "id" int NOT NULL AUTO_INCREMENT,
    "title" varchar(100) NOT NULL,
    "description" varchar(100) NOT NULL,
    "userId" int NOT NULL,
    CONSTRAINT "PK_post" PRIMARY KEY ("id")
    CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "users"("id")
)

-- id – Tipo: Int, autoincremental, chave primária (PK).
-- title – Tipo: Varchar(100), não nulo.
-- description – Tipo: Varchar(100), não nulo.
-- userId – Tipo: Int, não nulo (chave estrangeira referenciando a tabela user)
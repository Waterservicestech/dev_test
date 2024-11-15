USE test_db;

--TODO Crie a tabela de user;

create table user (
id int primary key auto_increment,
firstName varchar(100) not null, 
lastName  varchar(100) not null,
email varchar(100) not null
);

--TODO Crie a tabela de posts;

create table post (
id int primary key auto_increment,
titulo varchar(100) not null, 
descricao varchar(100) not null, 
foreigh key (userId) references user (id)
);


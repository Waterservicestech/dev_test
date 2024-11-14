CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

--TODO Crie a tabela de user;
create table user (id int auto_increment, firstName varchar (100) NOT NULL, lastName varchar(100) NOT NULL, email varchar (100) NOT NULL, primary key(id));
--TODO Crie a tabela de posts;
create table posts (id int auto_increment, title varchar (100) NOT NULL, description varchar(100) NOT NULL, userld int (4) NOT NULL, primary key (id), foreign key (userld) references user (id))

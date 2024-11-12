USE test_db;

--TODO Crie a tabela de user;
create table user (
  id bigint unsigned not null auto_increment,
  firstName varchar(100) not null,
  lastName varchar(100) not null,
  email varchar(100) not null,
  primary key (id)
);


--TODO Crie a tabela de posts;

create table post (
  id bigint unsigned not null auto_increment,
  title varchar(100) not null,
  description varchar(100) not null,
  userId bigint unsigned not null,
  primary key (id),
  foreign key user_fk (userId) references user(id)
);

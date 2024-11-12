USE test_db;

create table user (
  id bigint unsigned not null auto_increment,
  firstName varchar(100) not null,
  lastName varchar(100) not null,
  email varchar(100) not null,
  primary key (id)
);

create table post (
  id bigint unsigned not null auto_increment,
  title varchar(100) not null,
  description varchar(100) not null,
  userId bigint unsigned not null,
  primary key (id),
  foreign key user_fk (userId) references user(id)
);

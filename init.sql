USE test_db;

CREATE TABLE IF NOT EXISTS `user` (
  id int AUTO_INCREMENT NOT NULL,
  firstName varchar(100) NOT NULL,
  lastName varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS post (
  id int AUTO_INCREMENT NOT NULL,
  title varchar(100) NOT NULL,
  description varchar(100) NOT NULL,
  userId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES `user`(id)
);
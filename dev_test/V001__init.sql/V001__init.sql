create table user (
                      id int not null auto_increment,
                      first_name varchar(100) not null,
                      last_name varchar(100) not null,
                      email varchar(100) not null,

                      primary key (id)
) engine=InnoDB default charset=utf8;

create table post (
                      id int not null auto_increment,
                      title varchar(100) not null,
                      description varchar(100) not null,
                      user_id int not null,

                      primary key (id)
) engine=InnoDB default charset=utf8;

alter table post add foreign key(user_id) references user(id);
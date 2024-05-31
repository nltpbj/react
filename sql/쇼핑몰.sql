create table users(
	uid varchar(20) not null primary key,
	upass varchar(200) not null,
    uname varchar(20) not null,
    address1 varchar(500),
    address2 varchar(500),
    phone varchar(20),
    photo varchar(200),
    regDate datetime default now()
);

insert into users(uid, upass, uname)
values('blue','pass','이블루');
insert into users(uid, upass, uname)
values('red','pass','김레드');
insert into users(uid, upass, uname)
values('green','pass','최그린');

select * from users;

update users set phone='010-2222-1212', address1='서울 동작구 보래매로8',
address2='104동-202호' where uid='green';

update users set photo=null where uid > '';

create table books(
	bid int auto_increment primary key,
    title varchar(500) not null,
    price int default 0,
    contents text,
    isbn varchar(100),
    publisher varchar(100),
    image varchar(200),
    author varchar(200),
    regDate datetime default now()
);

drop table books;
desc books;

select * from books;

select count(*) from books;

select *,date_format(regDate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice
from books
order by bid desc
limit 0, 5;

alter table books add column updateDate datetime;

alter table books add column bigimage varchar(200);
desc books;

create table likes(
	uid varchar(20) not null,
    bid int not null,
    regDate datetime default now(),
    primary key(uid, bid),
	foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);
 
 select * from likes;

select *,date_format(regDate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice,
(select count(*) from likes where books.bid=likes.bid) lcnt,
(select count(*) from likes where books.bid=likes.bid and uid='green') ucnt
from books
order by bid desc
limit 0, 5;

select *,date_format(regDate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice,
(select count(*) from likes where books.bid=likes.bid) lcnt,
(select count(*) from likes where books.bid=likes.bid and uid='green') ucnt
from books
where bid=20;

create table review(
	rid int auto_increment primary key,
    bid int not null,
    uid varchar(20) not null,
    contents text not null,
    regdate datetime default now(),
    foreign key(bid) references books(bid),
    foreign key(uid) references users(uid)
);

desc review;

select * from review;
select * from users;

drop view view_review;

create view view_review as
select r.*, u.uname, u.photo, date_format(r.regdate,'%Y-%m-%d %T') fmtdate
from review r, users u
where r.uid=u.uid;

select * from view_review
where bid=20
order by rid desc
limit 0, 3;

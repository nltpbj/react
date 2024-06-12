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

select *,date_format(regDate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice,
(select count(*) from likes where books.bid=likes.bid) lcnt,
(select count(*) from likes where books.bid=likes.bid and uid='green') ucnt,
(select count(*) from review where books.bid=review.bid) rcnt
from books
order by bid desc
limit 0, 6;

create table cart(
	uid varchar(20) not null,
	bid int not null,
    qnt int default 1,
    regDate datetime default now(),
    primary key(uid, bid),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

desc cart;

create view view_cart as
select  c.*, b.title, b.image , b.price, format(b.price,0) fmtprice
from cart c, books b
where c.bid=b.bid;

select * from view_cart;

drop view view_cart;
drop table cart;

create table purchase(
	pid char(13) not null primary key,
    uid varchar(20) not null,
    uname varchar(20) not null,
    phone varchar(20) not null,
    address1 varchar(500) not null,
    address2 varchar(500) not null,
    pdate datetime default now(),
    sum int default 0,
    status int default 0, /*0:결제대기 1:결제확인 2:배송준비 3:배송완료 4:주문완료*/
	foreign key(uid) references users(uid)
);

/*주문상품 정보 */
create table orders(
  pid char(13) not null,
  bid int not null,
  price int default 0,
  qnt int default 0,
  primary key(pid, bid),
  foreign key(pid) references purchase(pid),
  foreign key(bid) references cart(bid)
);

select *, date_format(pdate,'%Y-%m-%d %T') as fmtdate,
format(sum,0) fmtsum
from purchase where uid='red';

delete from purchase where pid>'';

select o.*, b.title, b.image 
from orders o, books b
where o.bid=b.bid and pid='deeeeded-6ae8';

select * from users;
insert into users(uid, upass, uname)
values('admin', 'pass', '관리자');

select *, date_format(pdate,'%Y-%m-%d %T') as fmtdate,
format(sum,0) fmtsum
from purchase
where uname like '%김%'
order by pdate desc
limit 0, 5;

select * from users where uid='red';
select *, date_format(regdate,'%Y-%m-%d %T') as fmtdate from users;

select *, date_format(regdate,'%Y년%m월%d일 %T') as fmtdate from users
order by fmtdate desc, uname;

select *, date_format(regdate,'%Y년%m월%d일 %T') as fmtdate 
from users
where uid="kim";

desc users;

insert into users(uid,upass,uname)
values('hong','pass','홍길동');

update users
set uname='리헨즈', address1='서울', address2='102-1002', phone='010-1234-5555' 
where uid='kim';

delete from users
where uid='hong';

select count(*) as total from users;

create table bbs(
	bid int auto_increment primary key,
    title varchar(500) not null,
    contents text,
    uid varchar(20) not null,
    regDate datetime default now(),
    foreign key(uid) references users(uid)
);

desc bbs;

insert into bbs(title, uid)
values('웨일을 열고 웨일온 회의로 이동합니다.','red');
insert into bbs(title, uid)
values('웨일을 열고 웨일온 회의로 이동합니다.','red');
insert into bbs(title, uid)
values('스프링은 Java 기반의 애플리케이션 프레임워크이다','red');
insert into bbs(title, uid)
values('웨일을 열고 웨일온 회의로 이동합니다.','red');
insert into bbs(title, uid)
values('웨일을 열고 웨일온 회의로 이동합니다.','blue');
insert into bbs(title, uid)
values('스프링은 Java 기반의 애플리케이션 프레임워크이다','kiin');
insert into bbs(title, uid)
values('웨일을 열고 웨일온 회의로 이동합니다.','chovy');

insert into bbs(title, uid)
select title,uid from bbs;

select count(*) from bbs;

create view view_bbs as
select b.*, u.uname, u.photo
from bbs b, users u
where b.uid=u.uid;

select *, date_format(regdate,'%Y년%m월%d일 %T') as fmtdate
from view_bbs
where uname like '%레드%'
order by bid desc
limit 0, 5;

select * 
from users 
where uid like 'c%';

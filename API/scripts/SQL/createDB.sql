DROP TABLE IF EXISTS opening_day;
CREATE TABLE opening_day(
    id int AUTO_INCREMENT primary key,
    day_label varchar(50) not null,
    opening_time time not null,
    closing_time time not null,

    constraint opening_time < closing_time
);

DROP TABLE IF EXISTS locality;
CREATE TABLE locality(
    id int AUTO_INCREMENT primary key,
    name varchar(50) not null,
    postal_code int not null
);

DROP TABLE IF EXISTS blood_type;
CREATE TABLE blood_type(
    id int AUTO_INCREMENT primary key,
    type varchar(50) not null,
    rhesus varchar(1) not null,
    check (rhesus in ('+','-'))
);

DROP TABLE IF EXISTS donation_center;
CREATE TABLE donation_center(
    id int AUTO_INCREMENT primary key,
    name varchar(50) not null,
    phone_number varchar(50) not null,
    check(phone_number LIKE'04__/%'),
    email_address varchar(50),
    check(email_address LIKE '%@%.%'),
    fax varchar(14),
    check(fax LIKE'+32 % %'),

    street_name varchar(50) not null,
    street_number int not null,
    locality int not null,
        foreign key (locality) references locality(id)
);

DROP TABLE IF EXISTS open_day;
CREATE TABLE open_day(
    center_id int not null,
        foreign key (center_id) references donation_center(id),
    day_id int not null,
        foreign key (day_id) references opening_day(id),
    primary key (center_id,day_id)
);

DROP TABLE IF EXISTS donation_available;
CREATE TABLE donation_available(
    center_id int not null,
        foreign key (center_id) references donation_center(id),
    blood_type_id int not null,
        foreign key (blood_type_id) references blood_type(id),
    primary key (center_id,blood_type_id)
);

DROP TABLE IF EXISTS donation_type;
CREATE TABLE donation_type(
    id int AUTO_INCREMENT primary key,
    name varchar(50) not null unique,
    time_of_donation date not null,
);

DROP TABLE IF EXISTS time_between_donation;
CREATE TABLE time_between_donation(
    first_donation_type_id int not null,
        foreign key (first_donation_type_id) references donation_type(id),
    next_donation_type_id int not null,
        foreign key (next_donation_type_id) references donation_type(id),
    interval time not null,
    primary key (first_donation_type_id,next_donation_type_id)
);

DROP TABLE IF EXISTS user_account:
CREATE TABLE user_account(
    id int AUTO_INCREMENT primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    birthday date not null,
    email_address varchar(50) not null unique,
        check(email_address LIKE '%@%.%'),
    login varchar(50) not null unique,
    password varchar(50) not null,
    blood_type int not null,
        foreign key (blood_type) references blood_type(id),
)

DROP TABLE IF EXISTS donation;
CREATE TABLE donation(
    id int AUTO_INCREMENT primary key,
    date date not null,
    user_id int not null,
        foreign key (user_id) references user_account(id),
    donation_type_id int not null,
        foreign key (donation_type_id) references donation_type(id),
    donation_center_id int not null,
        foreign key (donation_center_id) references donation_center(id),
    
    check (date > (select date from donation where user_id = user_id order by date desc limit 1) 
        + (select interval from time_between_donation 
        where  next_donation_type_id = donation_type_id and first_donation_type_id = (select donation_type_id from donation where user_id = user_id order by date desc limit 1)))
);


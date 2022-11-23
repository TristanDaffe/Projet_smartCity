DROP TABLE IF EXISTS opening_day CASCADE;
CREATE TABLE opening_day(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    day_label varchar(50) not null,
    opening_time time not null,
    closing_time time not null CHECK (opening_time < closing_time)
);

DROP TABLE IF EXISTS locality CASCADE;
CREATE TABLE locality(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) not null,
    postal_code int not null
);

DROP TABLE IF EXISTS blood_type CASCADE;
CREATE TABLE blood_type(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type varchar(50) not null,
    rhesus varchar(1) not null,
    check (rhesus in ('+','-'))
);

DROP TABLE IF EXISTS donation_center CASCADE;
CREATE TABLE donation_center(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) not null,
    phone_number varchar(50) not null,
    check(phone_number LIKE'04__/%'),
    email_address varchar(50),
    check(email_address LIKE '%@%.%'),
    fax varchar(15),
    check(fax LIKE'+32 % %'),

    street_name varchar(50) not null,
    street_number int not null,
    locality int not null,
        foreign key (locality) references locality(id)
);

DROP TABLE IF EXISTS open_day CASCADE;
CREATE TABLE open_day(
    center_id int not null,
        foreign key (center_id) references donation_center(id),
    day_id int not null,
        foreign key (day_id) references opening_day(id),
    primary key (center_id,day_id)
);

DROP TABLE IF EXISTS donation_available CASCADE;
CREATE TABLE donation_available(
    center_id int not null,
        foreign key (center_id) references donation_center(id),
    blood_type_id int not null,
        foreign key (blood_type_id) references blood_type(id),
    primary key (center_id,blood_type_id)
);

DROP TABLE IF EXISTS donation_type CASCADE;
CREATE TABLE donation_type(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) not null unique,
    time_of_donation time not null
);

DROP TABLE IF EXISTS time_between_donation CASCADE;
CREATE TABLE time_between_donation(
    first_donation_type_id int not null,
        foreign key (first_donation_type_id) references donation_type(id),
    next_donation_type_id int not null,
        foreign key (next_donation_type_id) references donation_type(id),
    interval interval not null,
    primary key (first_donation_type_id,next_donation_type_id)
);

DROP TABLE IF EXISTS user_account CASCADE;
CREATE TABLE user_account(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    birthday date not null,
    email_address varchar(50) not null unique,
        check(email_address LIKE '%@%.%'),
    login varchar(50) not null unique,
    password varchar(50) not null,
    blood_type int not null,
        foreign key (blood_type) references blood_type(id)
);

DROP TABLE IF EXISTS donation CASCADE;
CREATE TABLE donation(
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date date not null,
    user_id int not null,
        foreign key (user_id) references user_account(id),
    donation_type_id int not null,
        foreign key (donation_type_id) references donation_type(id),
    donation_center_id int not null,
        foreign key (donation_center_id) references donation_center(id)    
);

/* Insert */
INSERT INTO opening_day(day_label, opening_time, closing_time) VALUES
('Monday', '08:00:00', '12:00:00'),
('Tuesday', '08:00:00', '12:00:00'),
('Wednesday', '08:00:00', '12:00:00'),
('Thursday', '08:00:00', '12:00:00'),
('Friday', '08:00:00', '12:00:00'),
('Saturday', '08:00:00', '12:00:00'),
('Sunday', '08:00:00', '12:00:00');

INSERT INTO blood_type(type, rhesus) VALUES
('A', '+'),
('A', '-'),
('B', '+'),
('B', '-'),
('AB', '+'),
('AB', '-'),
('O', '+'),
('O', '-');

INSERT INTO donation_type(name, time_of_donation) VALUES
('Blood', '00:20:00'),
('Plasma', '00:45:00'),
('Platelets', '01:30:00');

INSERT INTO time_between_donation(first_donation_type_id, next_donation_type_id, interval) VALUES
(1, 1, '3 month'),
(1, 2, '2 week'),
(1, 3, '4 week'),
(2, 1, '2 week'),
(2, 2, '2 week'),
(2, 3, '2 week'),
(3, 1, '3 week'),
(3, 2, '2 week'),
(3, 3, '3 week');

INSERT INTO locality(name, postal_code) VALUES
('Namur', 5000),
('Belgrade', 5001),
('Champion', 5020),
('Jambes', 5100),
('Jemeppe-sur-Sambre', 5190),
('Sambreville', 5060),
('Gembloux', 5030);

INSERT INTO user_account(first_name, last_name, birthday, email_address, login, password, blood_type) VALUES
('John', 'Doe', '1990-01-01', 'john.doe@gmail.com', 'johnDoeLeBoss', '1234', 1),
('Jane', 'Doe', '1990-01-01', 'jane.doe@gmail.com', 'janeDoeLaBoss', '1234', 2),
('John', 'Smith', '1990-01-01', 'john.smith@gmail.com', 'johnSmithLeBoss', '1234', 3);

Insert into donation_center(name, phone_number, email_address, fax, street_name, street_number, locality) VALUES
('Namur', '0495/123.45.67', 'caca@caca.lol', '+32 4 123 45 67', 'Rue de la Paix', 1, 1);

Insert into open_day(center_id, day_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

Insert into donation_available(center_id, blood_type_id) VALUES
(1, 1),
(1, 2),
(1, 3);

Insert into donation(date, user_id, donation_type_id, donation_center_id) VALUES
('2019-01-01', 1, 1, 1),
('2019-01-01', 2, 1, 1),
('2019-01-01', 3, 1, 1);


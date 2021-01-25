CREATE DATABASE IF NOT EXISTS portal_hackathones CHARACTER SET = "utf8mb4" COLLATE = "utf8mb4_unicode_ci";
use portal_hackathones;
CREATE TABLE IF NOT EXISTS competitor (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    active_user ENUM ('true', 'false') NOT NULL DEFAULT 'true',
    user_name VARCHAR(50) not null,
    surname VARCHAR(50) not null,
    register_date timestamp not null,
    email varchar(50) not null,
    professional_profile ENUM (
        'desarrollador',
        'diseñador',
        'marketing',
        'otro'
    ),
    rol ENUM ('user', 'organizer'),
    user_password varchar(100) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
);
create table if not exists link (
    id integer auto_increment primary key,
    url varchar(100) not null,
    web_name varchar(30) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
);
create table if not exists tech (
    id integer auto_increment primary key,
    tech_name varchar(50) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
);
create table if not exists hackathon (
    id integer auto_increment primary key,
    hackathon_place enum ('online', 'presencial', 'semipresencial') not null,
    city varchar(50),
    start_date date not null,
    end_date date not null,
    hackathon_status enum ('pendiente', 'realizado', 'cancelado') default 'pendiente',
    hackathon_info text,
    id_organizer integer not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    constraint hackaton_fk1 FOREIGN KEY(id_organizer) REFERENCES competitor(id) ON DELETE CASCADE
);
create table if not exists competitor_hackathon (
    id_competitor int not null,
    id_hackathon int not null,
    inscription_status enum ('inscrito', 'cancelado', 'asistente') default 'inscrito',
    ranking int not null default 0,
    id_booking varchar(20) not null,
    primary key (id_competitor, id_hackathon),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    constraint competitor_hackathon_fk1 FOREIGN KEY(id_competitor) REFERENCES competitor(id) ON DELETE CASCADE,
    constraint competitor_hackathon_fk2 FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE
);
create table if not exists hackathon_link (
    id_hackathon integer not null,
    id_link integer not null,
    primary key (id_hackathon, id_link),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    constraint hackathon_link_fk1 FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE,
    constraint hackathon_link_fk2 FOREIGN KEY(id_link) REFERENCES link(id) ON DELETE CASCADE
);
create table if not exists hackathon_tech (
    id_hackathon integer not null,
    id_tech integer not null,
    primary key (id_hackathon, id_tech),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    constraint hackathon_tech_fk1 FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE,
    constraint hackathon_tech_fk2 FOREIGN KEY(id_tech) REFERENCES tech(id) ON DELETE CASCADE
);
-- Create a table of admins
create table if not exists admin (
    id_admin int unsigned auto_increment primary key,
    code varchar(100) unique,
    key_admin varchar(100) not null unique,
    name varchar(100) not null,
    email varchar(100) not null unique,
    state boolean not null default 0,
    password varchar(100) not null,
    creationDate timestamp default current_timestamp,
    updateDate timestamp default current_timestamp on update current_timestamp
);
-- Modifications in the database:
-- Change default value in table 'competitor' and column 'active_user'
alter table competitor
alter column active_user
set default 'false';
-- Add a column 'code' in table 'competitor'
alter table competitor
add column code varchar(100) not null;
-- Add a column 'thematic' in table 'hackaton'
alter table hackathon
add column thematic varchar(100) not null;
-- Change defaul value in table 'competitor' and column 'register_date' for current_timestamp
alter table competitor
modify column register_date timestamp not null default current_timestamp;
-- Create new table of hackathon_tech1
create table if not exists hackathon_tech1 (
    id_tech1 int unsigned auto_increment,
    id_hackathon int not null,
    tech_name varchar(50) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    primary key (id_tech1, id_hackathon),
    constraint hackathon_tech1_fk1 FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE
);
-- Create new table of hackathon_link1
create table if not exists hackathon_link1 (
    id_link1 int unsigned AUTO_INCREMENT,
    id_hackathon int not null,
    url varchar(100) not null,
    web_name varchar(30) not null,
    primary key (id_link1, id_hackathon),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    constraint hackathon_link1_fk1 FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE
);
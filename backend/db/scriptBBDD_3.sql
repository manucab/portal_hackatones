CREATE DATABASE IF NOT EXISTS portal_hackathones CHARACTER SET="utf8mb4" COLLATE="utf8mb4_unicode_ci";
use portal_hackathones;

CREATE TABLE IF NOT EXISTS competitor (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
	active_user ENUM ('true','false') NOT NULL DEFAULT 'false',
	user_name VARCHAR(50) not null,
    surname VARCHAR(50) not null,
    register_date timestamp not null default current_timestamp ,
    email varchar(50) not null,
    professional_profile ENUM ('desarrollador','diseñador','marketing','otro') not null default 'otro',
    rol ENUM ('user','organizer') not null,
    code varchar(100) not null default 'empty-code',
    deleted_user ENUM ('true','false')  default 'false',
    profile_picture varchar(500) not null default 'urlpordefecto', 
    user_password varchar(100) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
) ;


create table if not exists link (
	id integer auto_increment primary key,
    url varchar(100) not null unique,
    web_name varchar(30) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
);

create table if not exists tech (
	id integer auto_increment primary key,
    tech_name varchar(50) not null unique,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
);

create table if not exists hackathon (
	id integer auto_increment primary key,
    hackathon_name varchar(100) not null,
	hackathon_place enum ('online','presencial','semipresencial') not null,
    city varchar(50) not null default 'no-info',
    start_date date not null,
    end_date date not null,
    hackathon_status enum ('pendiente','realizado','cancelado') not null default 'pendiente',
    hackathon_info text not null,
    id_organizer integer not null,
    cover_picture varchar(500) not null default 'urlpordefecto',
    thematic varchar(100) not null,
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    
    constraint hackaton_fk1 
		FOREIGN KEY(id_organizer) REFERENCES competitor(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS post (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
	title varchar(300) not null,
    content text not null,
    publication_date date not null,
    hidden enum('true','false') not null default 'true',
    fulltext(title,content),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp
) ;

create table if not exists comment (
	id integer not null auto_increment,
    id_competitor integer not null,
    id_hackathon integer not null,
    content text not null,
        hidden enum('true','false') not null default 'false',
    primary key (id, id_hackathon, id_competitor),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    
    constraint comment_fk1 
		FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE,
	 constraint comment_fk2 
		FOREIGN KEY(id_competitor) REFERENCES competitor(id) ON DELETE CASCADE    
);



create table if not exists competitor_hackathon (
	id_competitor int not null,
	id_hackathon int not null,
    inscription_status enum ('inscrito','cancelado','asistente') not null default 'inscrito',
    ranking int not null default 0,
    id_booking varchar(20) not null,
    rate integer,
    primary key (id_competitor,id_hackathon),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    
    constraint competitor_hackathon_fk1 
		FOREIGN KEY(id_competitor) REFERENCES competitor(id) ON DELETE CASCADE,
	 constraint competitor_hackathon_fk2 
		FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE
);

create table if not exists hackathon_link (
	id_hackathon integer not null,
    id_link integer not null,
    primary key (id_hackathon, id_link),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    
    constraint hackathon_link_fk1 
		FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE,
	 constraint hackathon_link_fk2 
		FOREIGN KEY(id_link) REFERENCES link(id) ON DELETE CASCADE    
);

create table if not exists hackathon_tech (
	id_hackathon integer not null,
    id_tech integer not null,
    primary key (id_hackathon, id_tech),
    creation_date timestamp not null default current_timestamp,
    last_update timestamp not null default current_timestamp on update current_timestamp,
    
    constraint hackathon_tech_fk1 
		FOREIGN KEY(id_hackathon) REFERENCES hackathon(id) ON DELETE CASCADE,
	 constraint hackathon_tech_fk2 
		FOREIGN KEY(id_tech) REFERENCES tech(id) ON DELETE CASCADE    
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


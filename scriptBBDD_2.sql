CREATE DATABASE IF NOT EXISTS portal_hackatones CHARACTER SET="utf8mb4" COLLATE="utf8mb4_unicode_ci";
use portal_hackatones;

CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
	activo ENUM ('true','false') NOT NULL DEFAULT 'true',
	nombre VARCHAR(50) not null,
    apellidos VARCHAR(50) not null,
    fecha_registro timestamp not null ,
    email varchar(50) not null,
    especialidad ENUM ('desarrollador','diseñador','marketing','otro'),
    usr_password varchar(50) not null,
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp
) ;

CREATE TABLE IF NOT EXISTS organizador (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
	activo ENUM ('true','false') NOT NULL DEFAULT 'true',
	nombre VARCHAR(50) not null,
    apellidos VARCHAR(50) not null,
    fecha_registro timestamp not null ,
    email varchar(50) not null,
    usr_password varchar(50) not null,
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp
) ;

create table if not exists enlace (
	id integer auto_increment primary key,
    url varchar(100) not null,
    nombre varchar(30) not null,
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp
);

create table if not exists tecnologia (
	id integer auto_increment primary key,
    nombre varchar(50) not null,
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp
);

create table if not exists hackaton (
	id integer auto_increment primary key,
	formato enum ('online','presencial','semipresencial') not null ,
    fecha_inicio date not null,
    fecha_fin date not null,
    estado enum ('pendiente','realizado','cancelado') default 'pendiente',
    descripcion text ,
    id_organizador integer not null,
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp,
    
    constraint hackaton_fk1 
		FOREIGN KEY(id_organizador) REFERENCES organizador(id) ON DELETE CASCADE
);



create table if not exists usuario_hackaton (
	id_usuario int not null,
	id_hackaton int not null,
    estado enum ('inscrito','cancelado','asistente') default 'inscrito',
    ranking int not null default 0,
    id_reserva varchar(20) not null,
    primary key (id_usuario,id_hackaton),
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp,
    
    constraint usuario_hackaton_fk1 
		FOREIGN KEY(id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
	 constraint usuario_hackaton_fk2 
		FOREIGN KEY(id_hackaton) REFERENCES hackaton(id) ON DELETE CASCADE
);

create table if not exists hackaton_enlace (
	id_hackaton integer not null,
    id_enlace integer not null,
    primary key (id_hackaton, id_enlace),
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp,
    
    constraint hackaton_enlace_fk1 
		FOREIGN KEY(id_hackaton) REFERENCES hackaton(id) ON DELETE CASCADE,
	 constraint hackaton_enlace_fk2 
		FOREIGN KEY(id_enlace) REFERENCES enlace(id) ON DELETE CASCADE    
);

create table if not exists hackaton_tecnologia (
	id_hackaton integer not null,
    id_tecnologia integer not null,
    primary key (id_hackaton, id_tecnologia),
    fecha_creacion timestamp not null default current_timestamp,
    ultima_modificacion timestamp not null default current_timestamp,
    
    constraint hackaton_tecnologia_fk1 
		FOREIGN KEY(id_hackaton) REFERENCES hackaton(id) ON DELETE CASCADE,
	 constraint hackaton_tecnologia_fk2 
		FOREIGN KEY(id_tecnologia) REFERENCES tecnologia(id) ON DELETE CASCADE    
);


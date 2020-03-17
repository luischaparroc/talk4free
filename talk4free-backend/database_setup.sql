CREATE DATABASE IF NOT EXISTS talk4freeDB;
USE talk4freeDB;

CREATE TABLE IF NOT EXISTS rooms(
       id INT UNIQUE AUTO_INCREMENT NOT NULL,
       session_id VARCHAR(256) NOT NULL,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL,
       lang VARCHAR(256) NOT NULL,
       lvl VARCHAR(256) NOT NULL,
       max_user INT NOT NULL,
       active BOOLEAN DEFAULT false,
       created_by INT NOT NULL,
       users VARCHAR(800),
       active_users INT DEFAULT 1,
       PRIMARY KEY(id))
       ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users(
       id INT UNIQUE AUTO_INCREMENT NOT NULL,
       room_id INT,
       email VARCHAR(256) NOT NULL,
       username VARCHAR(256) NOT NULL,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL,
       active BOOLEAN DEFAULT false,
       adm BOOLEAN DEFAULT false,
       img VARCHAR(600) NOT NULL,
       PRIMARY KEY(id),
       FOREIGN KEY(room_id) REFERENCES rooms(id));

CREATE TABLE IF NOT EXISTS reports(
       id INT UNIQUE AUTO_INCREMENT NOT NULL,
       reported_by INT NOT NULL,
       accused_by INT NOT NULL,
       descrip VARCHAR(256) NOT NULL,
       penalt_on VARCHAR(256) NOT NULL,
       created_at DATETIME NOT NULL,
       updated_at DATETIME NOT NULL,
       PRIMARY KEY(id),
       FOREIGN KEY(reported_by) REFERENCES users(id),
       FOREIGN KEY(accused_by) REFERENCES users(id));

set names utf8mb4;

CREATE USER IF NOT EXISTS 'ubuntu'@'localhost';
SET PASSWORD FOR 'ubuntu'@'localhost' = 'talk4free2020';
GRANT ALL PRIVILEGES ON * . * TO 'ubuntu'@'localhost';
FLUSH PRIVILEGES;
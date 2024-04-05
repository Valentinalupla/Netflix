
use freedb_backend_movies;
CREATE TABLE movies(
idMovies int auto_increment primary key, 
title varchar(45) not null, 
genre varchar(45) not null, 
image varchar(1000) not null,
category varchar(45) not null, 
yearMovie int
);
CREATE TABLE users(
idUsers int auto_increment primary key, 
user varchar(45) not null, 
password varchar(45) not null, 
name varchar(45) not null,
email varchar(45) not null, 
plan_details varchar(45) not null
);
CREATE TABLE actors(
idActor int auto_increment primary key, 
name varchar(45) not null, 
lastName varchar(45) not null, 
country varchar(45) not null,
birthday date not null
);

INSERT INTO movies (title, genre, image, category, yearMovie)
VALUE ('Pulp Fiction', 'Crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'Top 10', 1994),
('La vita è bella', 'Comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'Top 10', 1996),
('Forrest Gump', 'Comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'Top 10', 1994); 

INSERT INTO users (user, password, name, email, plan_details)
VALUE ('laura_dev', 'laura', 'Laura', 'laura@gmail.com', 'Standard'),
('maria_dev', 'maria', 'Maria', 'maria@gmail.com', 'Standard'),
('ester_dev', 'ester', 'Ester', 'ester@gmail.com', 'Standard');

INSERT INTO actors (name, lastName, country, birthday)
VALUE ('Tom', 'Hanks', 'Estados Unidos', '1956-07-09'),
('Roberto', 'Benigni', 'Italia', '1956-10-27'),
('John', 'Travolta', 'Estados Unidos', '1954-02-18');

SELECT * FROM movies;
SELECT title, genre FROM movies WHERE yearMovie > 1990;
SELECT * FROM movies WHERE category = 'Top 10';
UPDATE movies SET yearMovie = 1997 WHERE idMovies = 2;

SELECT * FROM actors;
SELECT * FROM actors WHERE birthday >= 1950 OR birthday <= 1960;
SELECT * FROM actors WHERE MONTHNAME(birthday) = 'october';
SELECT name, lastName FROM actors WHERE country = 'Estados Unidos';

SELECT * FROM users WHERE plan_details = 'Standard';

DELETE FROM users WHERE idUsers = 2;

ALTER TABLE actors ADD image VARCHAR(50);
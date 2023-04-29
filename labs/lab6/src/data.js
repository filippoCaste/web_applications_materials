"use strict";

import { Film, FilmLibrary } from "./film";
import dayjs from "dayjs";

const film1 = new Film(1, 'Pulp Fiction');
// film1.score = 2;

const film2 = new Film(2, '21 Grams', false);
film2.date = 'March 17, 2023';
film2.score = 2;

const film3 = new Film(3, "Star Wars");

const film4 = new Film(4, "Matrix", false);

const film5 = new Film(5, "Shrek 2", true);
film5.date = "March 21, 2023";
film5.score = 5;

const film6 = new Film(6, "Shrek", true);
film6.date = "March 21, 2022";
film6.score = 5;

const film7 = new Film(7, "Mare Fuori", true);
film7.date = dayjs();
film7.score = 5;

const film8 = new Film(8, "Una pezza di Lundini", true);
film8.date = "February 2, 2023";
film8.score = 5;

const film9 = new Film(9, "Saw IV");
film9.date = "2022-07-12";
film9.score = 4;

const film10 = new Film(10, "Il processo di Norimberga");
film10.date = "2023-04-24";
film10.score = 4;

const FILMS = new FilmLibrary();
FILMS.addNewFilm(film5);
FILMS.addNewFilm(film1);
FILMS.addNewFilm(film3);
FILMS.addNewFilm(film2);
FILMS.addNewFilm(film4);
FILMS.addNewFilm(film6);
FILMS.addNewFilm(film7);
FILMS.addNewFilm(film8);
FILMS.addNewFilm(film9);
FILMS.addNewFilm(film10);

export {FILMS}
"use strict";
const dayjs = require('dayjs');

function Film(id, title, isFavorite) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite || false; // if not || it assigns 'undefined'
}

function FilmLibrary(film) {
    this.films = [];

    this.addNewFilm = (film) => {
        this.films.push(film);
    }

    this.print = () => {
        console.log("\nList of available films:");
        this.films.sort((f1,f2) => f1.id - f2.id);
        this.films.forEach((f) => {
            console.log(` - ${f.id}, ${f.title}, ${f.isFavorite}, ${(f.date)||'not set'}, ${f.score || 'not assigned'}`);
        }, 0, this.films)
    }

    this.sortByDate = () => {
        this.sortedFilms = [...this.films.filter((f) => (f.date!=undefined))];
        this.sortedFilms.sort((f1, f2) => f1.date-f2.date);
        this.sortedFilms = [...this.sortedFilms, ...this.films.filter((f) => f.date==undefined)];
    }

    this.printSorted = () => {
        console.log("\nList of sorted films (by date):");
        this.sortedFilms.forEach((f) => {
            console.log(` - ${f.id}, ${f.title}, ${f.isFavorite}, ${(f.date)||'not set'}, ${f.score || 'not assigned'}`);
        }, 0, this.sortedFilms)
    }

    this.deleteFilm = (idn) => {
        let ind = this.films.indexOf( this.films.filter((f) => f.id === idn)[0])
        this.films.splice(ind,1);
    }

    this.resetWatchedFilms = () => {
        this.films.forEach((f) => {
            f.date = undefined;
        })
    }

    this.getRated = () => {
        const my_copy = this.films.filter((f) => f.score);
        my_copy.sort((f1,f2) => f2.score - f1.score);

        console.log("\nList of available films sorted by score:")
        my_copy.forEach((f) => {
            console.log(` - ${f.id}, ${f.title}, ${f.isFavorite}, ${(f.date)||'not set'}, ${f.score || 'not assigned'}`);
        }, 0, my_copy)
    }
}


const film1 = new Film(1, 'Pulp Fiction', true);
film1.date = dayjs("March 10, 2023");
film1.score = 5;

const film2 = new Film(2, '21 Grams', true);
film2.date = dayjs('March 17, 2023');
film2.score = 4;

const film3 = new Film(3, "Star Wars");

const film4 = new Film(4, "Matrix", false);

const film5 = new Film(5, "Shrek 2");
film5.date = dayjs("March 21, 2023");
film5.score = 3;

const film6 = new Film(6, "Shrek");
film6.date = dayjs("March 21, 2022");
film6.score = 5;

const film7 = new Film(7, "Mare Fuori", true);
film7.date = dayjs("April 13, 2023");
film7.score = 5;

const film8 = new Film(8, "Una pezza di Lundini", true);
film8.date = dayjs("May 2, 2023");
film8.score = 5;

const film9 = new Film(9, "Saw IV");
film9.date = dayjs("2022-07-12");
film9.score = 4.5;
/* 
    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2023, Score: 5
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2023, Score: 4
    Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned> 
    Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not assigned>
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2023, Score: 3
*/

const library = new FilmLibrary();
library.addNewFilm(film5);
library.addNewFilm(film1);
library.addNewFilm(film3);
library.addNewFilm(film2);
library.addNewFilm(film4);
library.addNewFilm(film6);
library.addNewFilm(film7);
library.addNewFilm(film8);
library.addNewFilm(film9);
library.print();

library.sortByDate();
library.printSorted();

console.log("\n\nDeleting a film...");
library.deleteFilm(2);
library.print();

library.resetWatchedFilms();
library.print();

library.getRated();

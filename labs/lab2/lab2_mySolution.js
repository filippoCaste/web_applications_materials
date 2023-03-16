"use strict";

const sqlite = require('sqlite3');
const dayjs = require('dayjs')

const db = new sqlite.Database("films.db", (err) => {if(err) throw err;})

function Film(id, title, isFavorite, date, rating) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite || 0; // if not || it assigns 'undefined'
    this.date = (date && dayjs(date)) || undefined;
    this.rating = rating || undefined;

    this.toString = () => `${this.id} - ${this.title}`
}

function FilmLibrary() {
    this.films = [];

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films";
            db.all(sql, [], (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                    rows.forEach((r) => {
                        filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    })
                    resolve(filmList);
                }
            })
        })
    }

    this.getFavorites = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE favorite=?";
            db.all(sql, [1], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                        rows.forEach((r) => {
                            filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                        })
                    resolve(filmList);
                }
            })
        })
    }

    this.getByDate = (date) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchdate=?";

            db.all(sql, [date], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                        rows.forEach((r) => {
                            filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                        })
                    resolve(filmList);
                }
            })
        })
    }

    this.getBeforeDate = (date) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchdate<?";

            db.all(sql, [date], (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                        rows.forEach((r) => {
                            filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                        })
                    resolve(filmList);
                }
            })
        })
    }

    this.getGreater = (score) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE rating>?";
            db.all(sql, [score], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                        rows.forEach((r) => {
                            filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                        })
                    resolve(filmList);
                }
            })
        })
    }

    this.getByTitleString = (s) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE title LIKE ?"
            db.all(sql, [`%${s}%`], (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    const filmList = [];
                        rows.forEach((r) => {
                            filmList.push(new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                        })
                    resolve(filmList);
                }
            })
        })
    }

    this.storeFilm = (film) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO films(id,title,favorite,watchdate,rating) VALUES (?,?,?,?,?);"

            db.run(sql, [film.id, film.title, film.isFavorite, film.date, film.rating], (err)=> {
                if(err){
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }

    this.deleteFilmById = (id) => {
        return new Promise((resolve,reject) => {
            const sql = "DELETE FROM films WHERE id=?";

            db.run(sql, [id], (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }

    this.deleteAllDates = () => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE films SET watchdate=NULL"

            db.run(sql, [], (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
}

const fl = new FilmLibrary();
fl.getAll().then((filmList) => {console.log("#all films: " + filmList.length)})

fl.getFavorites().then((filmList) => {console.log(`#favorites: ${filmList.length}`)});

fl.getByDate("2023-03-17").then((filmList) => {console.log(`#by date: ${filmList.length}`)})

fl.getBeforeDate("2023-03-20").then((filmList) => {console.log(`#before date: ${filmList.length}`)})

fl.getGreater(3).then((filmList) => {console.log(`#greater than score: ${filmList.length}`)})

fl.getByTitleString("cti").then((filmList) => {console.log("film containing cti: " + filmList)});

// fl.storeFilm(new Film(6, "Shrek 2", 1)).then(console.log(`Film added`))

// fl.deleteFilmById(2).then(console.log("Film deleted"))

fl.deleteAllDates().then(console.log("All dates deleted"));

'use strict';

const {Film, FilmLibrary} = require('./film.js');
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

function listFilms() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err.message);
            else {
                const films = rows.map((f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
                resolve(films);
            }
        });
    });
}

function getFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE id=?';
        db.get(sql, parseInt(id), (err,row) => {
            if (err)
                reject(err.message);
            else {
                const film = new Film(row.id, row.title, row.favorite, row.watchdate, row.rating);
                resolve(film);
            }
        })
    })
}

function createFilm(film) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO films(title, favorite, watchdate, rating, user) VALUES (?,?,?,?,1);";
        db.run(sql, [film.title, film.isFavorite, film.date.format('YYYY-MM-DD'), film.score], (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(film); 
            }
        })
    })
}

function updateFilm(filmId, title, favorite, date, score) {
    // const film = getFilm(filmId);
    
    // const t = title===undefined ? film.title : title;
    // console.log(t);
    // const f = favorite || film.isFavorite ;
    // const d = date || film.date; 
    // const s = score || film.score ;

    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=?";
        db.run(sql, [title, favorite, date.format('YYYY-MM-DD'), score, filmId], (err) => {
            if(err) {
                reject(err.message);
            } else {
                resolve(getFilm(filmId));
            }
        })
    })
}

function updateRate(filmId, rate) {

    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET rating=? WHERE id=?';
        db.run(sql, [parseInt(rate), filmId], (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve();
            }
        })
    })

}

function updateFavorite(filmId, isFavorite){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite=? WHERE id=?';
        db.run(sql, [isFavorite, filmId], (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve();
            }
        })

    })
}

function deleteFilm(filmId){
    return new Promise((resolve, reject) => {
        const sql='DELETE FROM films WHERE id=?';
        db.run(sql, filmId, (err) => {
            if(err) 
                reject(err.message);
            else
                resolve();
        })
    })
}

exports.listFilms = listFilms ;
exports.getFilm = getFilm ;
exports.createFilm = createFilm ;
exports.updateFilm = updateFilm ;
exports.updateRate = updateRate ;
exports.updateFavorite = updateFavorite;
exports.deleteFilm = deleteFilm ;

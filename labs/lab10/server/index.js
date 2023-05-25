"use strict";

const dayjs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const {Film, FilmLibrary} = require('./film.js');
const dao = require('./films-dao');


const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/films', (req,res) => {
    console.log("List all films\n");
    dao.listFilms().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.get('/api/films/:filterName', (req,res) => {
    console.log("Filtered films according to filtername: " + req.params.filterName );
    dao.listFilms().then((result) => {
        let out ;
        switch (req.params.filterName) {
            case 'filter-all':
                out=result;
                break;
            case 'filter-best':
                out = result.filter((f) => f.score === 5)
                break;
            case 'filter-favorite':
                out = result.filter((f) => f.isFavorite)
                break;
            case 'filter-lastmonth':
                out = result.filter((f) => {
                    const limitDate = dayjs().subtract(30, 'days');
                    if (f.date != undefined && f.date.isAfter(limitDate) && !f.date.isAfter(dayjs())) {
                        return true;
                    } else {
                        return false;
                    }
                })
                break;
            case 'filter-unseen':
                out = result.filter((f) => f.date == undefined);
                break;            
        }
        res.json(out);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.get('/api/films/filmId/:filmId', (req,res) => {
    console.log("Retrieve film with id: " + req.params.filmId);
    dao.getFilm(req.params.filmId).then((result) => {
        console.log(result);
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.post('/api/create', (req,res) => {
    console.log('Creating a new Film');
    const date = dayjs(req.body.date) || '';
    const film = new Film(undefined, req.body.title, req.body.isFavorite, date, req.body.score);
    dao.createFilm(film).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.put('/api/update/:filmId', (req,res) => {
    console.log('Update an existing film with id: ' + req.params.filmId);
    const date = dayjs(req.body.date) || '';
    dao.updateFilm(req.params.filmId, req.body.title, req.body.isFavorite, date, req.body.score).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.put('/api/update/:filmId/rate', (req,res) => {
    console.log('Update rate of film with id: ' + req.params.filmId);

    dao.updateRate(req.params.filmId, req.body.rate).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.put('/api/update/:filmId/isFavorite', (req,res) => {
    console.log('Update isFavorite of film with id: ' + req.params.filmId);

    dao.updateFavorite(req.params.filmId, req.body.isFavorite).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.delete('/api/delete/:filmId', (req,res) => {
    console.log('Deleting film with id: ' + req.params.filmId);

    dao.deleteFilm(req.params.filmId).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.listen(3000, () => console.log("Server started!"));

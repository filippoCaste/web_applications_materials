'use strict';

const APIURL = 'http://localhost:3000/api';

async function listFilms() {
    try {
        const response = await fetch(APIURL + '/films');
        if(response.ok) {
            const films = await response.json();
            return films;
        } else {
            //stop
            const message = await response.text();
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network Error: " + error.message) ;
    }
}

async function listFilteredFilms(filterName) {
    try {
        const response = await fetch(APIURL + `/films/${filterName}`);
        if (response.ok) {
            const films = await response.json();
            return films;
        } else {
            //stop
            const message = await response.text();
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network Error: " + error.message);
    }
}

async function addNewFilm(title, isFavorite, date, rate) {
    try {
        const response = await fetch(APIURL + `/create`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "isFavorite": isFavorite,
                "date": date,
                "rate": rate
            })
        });
        if (response.ok) {
            const films = await response.json();
            return films;
        } else {
            //stop
            const message = await response.text();
            throw new Error("Application error: " + message)
        }
    } catch(error) {
        throw new Error("network error: " + error.message)
    }
}

async function editFilm(filmId, title, isFavorite, date, rate) {
    try {
        const response = await fetch(APIURL + `/update/${filmId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "isFavorite": isFavorite,
                "date": date,
                "score": rate
            })
        });
        if (response.ok) {
            const films = await response.json();
            return films;
        } else {
            //stop
            const message = await response.text();
            throw new Error("Application error: " + message)
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

async function deleteFilm(filmId) {
    try {
        const response = await fetch(APIURL + `/delete/${filmId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const films = await response.json();
            return films;
        } else {
            //stop
            const message = await response.text();
            throw new Error("Application error: " + message)
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

export {listFilms, listFilteredFilms, addNewFilm, editFilm, deleteFilm}
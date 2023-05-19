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

export {listFilms, listFilteredFilms}
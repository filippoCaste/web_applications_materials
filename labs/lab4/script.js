'use strict';


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
film7.date = dayjs();
film7.score = 5;

const film8 = new Film(8, "Una pezza di Lundini", true);
film8.date = dayjs("February 2, 2023");
film8.score = 5;

const film9 = new Film(9, "Saw IV");
film9.date = dayjs("2022-07-12");
film9.score = 4;

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


// --------

const max_rating = 5;

const printStars = (numf) => {
    let str = "";
    for (let i = 0; i < numf; i++) {
        str += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star-fill\" viewBox=\"0 0 16 16\"><path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\" /></svg > "
    }
    for (let i = 0; i < max_rating - numf; i++) {
        str += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z\" /></svg > ";
    }
    return str;
}


// Title 	Favorite 	Last watch date 	Rating
const createFilmRow  = (film) => {

    const tr = document.createElement('tr');
    
    const tdTitle = document.createElement('td');
    tdTitle.innerText = film.title;
    tr.appendChild(tdTitle);

    const tdFavorite = document.createElement('td');
    let checkboxString = "<input type='checkbox'";
    if(film.isFavorite) {
        checkboxString += " checked";
        tdTitle.classList.add("text-primary");
    }
    checkboxString += "> Favorite"
    tdFavorite.innerHTML = checkboxString;
    tr.appendChild(tdFavorite);

    const tdDate = document.createElement('td');
    if(film.date != undefined){
        tdDate.innerText = film.date.format("YYYY-MM-DD");
    }
    tr.appendChild(tdDate);

    const tdRating = document.createElement('td');
    if(film.score != undefined) {
        const str = printStars(film.score);
        tdRating.innerHTML = str;
    } 
    tr.appendChild(tdRating);

    return tr;
}

document.addEventListener("DOMContentLoaded", (event) => {

    let menuSelectedActive = document.getElementById("menu-all");
    menuSelectedActive.classList.add("active");

    filterFilmAll();
});

function filterFilmAll() {
    // const table = document.getElementById("filmTable");
    const tableBody = document.querySelector('tbody');

    for (const f of library.getFilms()) {
        const tr = createFilmRow(f);
        tableBody.appendChild(tr);
    }
}

function filterFilmFavorite() {
    const tableBody = document.querySelector('tbody');

    // console.log(library.getFilms().filter((film) => film.isFavorite))
    // console.log(tableBody.children)

    for (let f of library.getFavoriteFilms()) {
        const tr = createFilmRow(f);
        tableBody.appendChild(tr);
    }
}

function filterBestFilms() {
    const tableBody = document.querySelector('tbody');
    for (let f of library.getBestRatedFilms()) {
        const tr = createFilmRow(f);
        tableBody.appendChild(tr);
    }
}

function filterLastSeenFilms() {
    const tableBody = document.querySelector('tbody');
    for (let f of library.getLastSeenFilms()) {
        const tr = createFilmRow(f);
        tableBody.appendChild(tr);
    }
}

function filterUnseenFilms() {
    const tableBody = document.querySelector('tbody');
    for (let f of library.getUnseenFilms()) {
        const tr = createFilmRow(f);
        tableBody.appendChild(tr);
    }
}

document.getElementById("menu-all").addEventListener('click', (event) => {
    
    removeMenuSelection();
    document.getElementById("activeFilter").innerText = "All";
    const e = document.getElementById("menu-all");
    e.classList.add('active');

    filterFilmAll();

});

document.getElementById("menu-favorite").addEventListener('click', (event) => {
    
    removeMenuSelection();
    document.getElementById("activeFilter").innerText = "Favorite";
    const e = document.getElementById("menu-favorite");
    e.classList.add('active');

    filterFilmFavorite();
});

document.getElementById("menu-best").addEventListener('click', (event) => {
    
    removeMenuSelection();
    document.getElementById("activeFilter").innerText = "Best Rated";
    const e = document.getElementById("menu-best");
    e.classList.add('active');

    filterBestFilms();
});

document.getElementById("menu-last").addEventListener('click', (event) => {
    
    removeMenuSelection();
    document.getElementById("activeFilter").innerText = "Last Seen";
    const e = document.getElementById("menu-last");
    e.classList.add('active');

    filterLastSeenFilms()
});

document.getElementById("menu-unseen").addEventListener('click', (event) => {
    
    removeMenuSelection();
    document.getElementById("activeFilter").innerText = "Unseen";
    const e = document.getElementById("menu-unseen");
    e.classList.add('active');

    filterUnseenFilms();
});

const removeMenuSelection = () => {
    for (let el of document.getElementsByClassName('menitem')) {
        el.classList.remove("active");
    }        

    // also clean table
    const body = document.querySelector('tbody');
    body.innerHTML = '';
}
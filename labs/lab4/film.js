"use strict";

function Film(id, title, isFavorite, date, rating) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite || false; // if not || it assigns 'undefined'
    this.date = (date && dayjs(date)) || undefined;
    this.score = rating || undefined;

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

    this.getFilms = () => {
        return this.films;
    }

    this.getFavoriteFilms = () => {
        return this.films.filter((f) => f.isFavorite);
    }

    this.getBestRatedFilms = () => {
        return this.films.filter((f) => f.score==5)
    }

    this.getUnseenFilms = () => {
        return this.films.filter((f) => f.date==undefined)
    }

    this.getLastSeenFilms = () => {
        return this.films.filter((f) => {
            const limitDate = dayjs().subtract(30, 'days');
            if (f.date != undefined && f.date.isAfter(limitDate) && !f.date.isAfter(dayjs())) {
                return true;
            } else {
                return false;
            }
        })
    }
}

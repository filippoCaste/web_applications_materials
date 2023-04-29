/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 5
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap/'

import { FILMS } from './data';

import {Navigation} from './components/Navigation';
import Filters from './components/Filters';
import FilmTable from './components/FilmLibrary';
import { Film } from './film';

// FAKE DATA

function App() {

  // This state contains the active filter
  const [activeFilter, setActiveFilter] = useState('filter-all');
  const [films, setFilms] = useState([...FILMS.getFilms()]);
  const [mode, setMode] = useState('view');
  // 'view', 'add', 'edit'

  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An ID (equal to the unique name), used as key during the table generation
   * - A filter function applied before passing the films to the FilmTable component
   */
  const filters = {
    'filter-all':       { label: 'All', id: 'filter-all', filterFunction: () => true},
    'filter-favorite':  { label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.isFavorite},
    'filter-best':      { label: 'Best Rated', id: 'filter-best', filterFunction: film => film.score >= 5},
    'filter-lastmonth': { label: 'Seen Last Month', id: 'filter-lastmonth', filterFunction: film => isSeenLastMonth(film)},
    'filter-unseen':    { label: 'Unseen', id: 'filter-unseen', filterFunction: film => film.date ? false : true}
  };

  const isSeenLastMonth = (film) => {
    if('date' in film) {  // Accessing date only if defined
      const limitDate = dayjs().subtract(30, 'days');
      if (film.date != undefined && dayjs(film.date).isAfter(limitDate) && !dayjs(film.date).isAfter(dayjs())) {
        return true;
      } else {
        return false;
      }
    }
  }

  const handleAdd = (title, isFavorite, date, score) => {
    setFilms((oldFilms) => {
      const newId = Math.max(...films.map((f) => f.id)) + 1;
      const newDate = (date && dayjs(date)) || undefined;
      const newFilm = new Film(newId, title, isFavorite, newDate, score);

      return [...oldFilms, newFilm];
    })
    setMode('view');
  }

  const handleDelete = (filmId) => {
    // console.log(filmId);
    setFilms((oldFilms) => (
      oldFilms.filter((f) => f.id !== filmId)
    ))
  }

  const editFilm = (id, title, favorite, date, score) => {
    // console.log(films)
    setFilms((oldFilms) => {
      return [...oldFilms.map((f) => f.id == id ? new Film(id, title, favorite, date, score) : f)];
    })
    console.log(films)
    setMode('view');
  }

  return (
    <Container fluid className='App'>

      <Navigation/>

      <Row className="vh-100">
        <Col md={4} xl={3} bg="light" className="below-nav" id="left-sidebar">
          <Filters items={filters} selected={activeFilter} onSelect={setActiveFilter}/>
        </Col>

        { /* </Collapse> */}
        <Col md={8} xl={9} className="below-nav">
          <h1 className="pb-3">Filter: <span className="notbold">{filters[activeFilter].label}</span></h1>
          <FilmTable activeFilter={filters[activeFilter].label}
                     films={films.filter(filters[activeFilter].filterFunction)}
                     handleDelete={handleDelete}
                     editFilm={editFilm}
                     mode={mode}
                     setMode={setMode}
                     handleAdd={handleAdd}
                     />
          {mode === 'view' && <Button variant="primary" size="lg" className="fixed-right-bottom" onClick={() => setMode('add')}> &#43; </Button>}

        </Col>
      </Row>

    </Container>
  );
}

export default App;

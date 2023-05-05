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
import { AddEditFilmForm } from './components/AddEditFilmForm';

import { Routes, Route, BrowserRouter, Outlet, useParams, useNavigate } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound';

function Layout(props) {

  const activeFilter = 'filter-all';
  
  return (
    <>

      <Navigation />

      <Row className="vh-100">
        <Col md={4} xl={3} bg="light" className="below-nav" id="left-sidebar">
          <Filters items={props.filters} selected={activeFilter} />
        </Col>

        { /* </Collapse> */}
        <Col md={8} xl={9} className="below-nav">
          <Outlet />
        </Col>
      </Row>

    </>
  );
}


function App() {

  // const [activeFilter, setActiveFilter] = useState('filter-all');
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
    'filter-all': { label: 'All', id: 'filter-all', filterFunction: () => true },
    'filter-favorite': { label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.isFavorite },
    'filter-best': { label: 'Best Rated', id: 'filter-best', filterFunction: film => film.score >= 5 },
    'filter-lastmonth': { label: 'Seen Last Month', id: 'filter-lastmonth', filterFunction: film => isSeenLastMonth(film) },
    'filter-unseen': { label: 'Unseen', id: 'filter-unseen', filterFunction: film => film.date ? false : true }
  };

  const isSeenLastMonth = (film) => {
    if ('date' in film) {  // Accessing date only if defined
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
    setFilms((oldFilms) => (
      oldFilms.filter((f) => f.id !== filmId)
    ))
  }

  const editFilm = (id, title, favorite, date, score) => {
    setFilms((oldFilms) => {
      return [...oldFilms.map((f) => f.id == id ? new Film(id, title, favorite, date, score) : f)];
    })
    console.log(films)
    setMode('view');
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout filters={filters} />}>
          <Route index element={< FilmTable 
            filters={filters}
            films={films}
            handleDelete={handleDelete}
            editFilm={editFilm}
            mode={mode}
            setMode={setMode}
            handleAdd={handleAdd}
          />} />
          <Route path='/edit/:filmId' element={<AddEditFilmForm />}/>
          <Route path='/add' element={<AddEditFilmForm />} />
          <Route path='/filters/:filterName' element={
            <FilmTable filters={filters}
              films={films}
              handleDelete={handleDelete}
              editFilm={editFilm}
              mode={mode}
              setMode={setMode}
              handleAdd={handleAdd}
            />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;

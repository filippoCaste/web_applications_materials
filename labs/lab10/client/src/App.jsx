import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap/'

import {Navigation} from './components/Navigation';
import Filters from './components/Filters';
import FilmTable from './components/FilmLibrary';
import { Film } from './film';

import { Routes, Route, BrowserRouter, Outlet, useParams, useNavigate } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound';
import { AddFilm } from './components/AddFilm';
import { EditFilm } from './components/EditFilm';
import { listFilms } from '../API/API';

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

  const [films, setFilms] = useState([]);

  // called once at the first rendering
  useEffect(() => {
    listFilms().then((result) => {
      setFilms(result);
    })
  }, []); 

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

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout filters={filters} />}>
          <Route index element={< FilmTable 
            filters={filters}
            films={films}
          />} />
          <Route path='/edit/:filmId' element={<EditFilm films={films} />}/>
          <Route path='/add' element={<AddFilm />} />
          <Route path='/filters/:filterName' element={
            <FilmTable filters={filters}
              films={films}
            />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;

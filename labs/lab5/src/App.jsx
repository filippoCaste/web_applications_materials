import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
// import './App.css'

import { Film, FilmLibrary } from './film'

import { Navbar, Container, Nav, Form, ListGroup, Row, Col, Button } from "react-bootstrap";
import { FilmList } from './Components';


// DATA
const film1 = new Film(1, 'Pulp Fiction');
film1.score = 2;

const film2 = new Film(2, '21 Grams', false);
film2.date = 'March 17, 2023';
film2.score = 2;

const film3 = new Film(3, "Star Wars");

const film4 = new Film(4, "Matrix", false);

const film5 = new Film(5, "Shrek 2", true);
film5.date = "March 21, 2023";
film5.score = 5;

const film6 = new Film(6, "Shrek", true);
film6.date = "March 21, 2022";
film6.score = 5;

const film7 = new Film(7, "Mare Fuori", true);
film7.date = dayjs();
film7.score = 5;

const film8 = new Film(8, "Una pezza di Lundini", true);
film8.date = "February 2, 2023";
film8.score = 5;

const film9 = new Film(9, "Saw IV");
film9.date = "2022-07-12";
film9.score = 4;

const film10 = new Film(10, "Il processo di Norimberga");
film10.date = "2023-04-24";
film10.score = 4;

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
library.addNewFilm(film10);


function App() {

  const allFilms = [...library.getFilms()];

  const [section, setSection] = useState('All');
  const [films, setFilms] = useState(allFilms);

  /**
   * Unused up to now
   * @param {*} film 
   */
  const addToFavorite = (film) => {
    console.log('here');
    // (oldFilms) => {
    //   for (f in oldFilms) {
    //     if(f.id === film.id) {
          
    //     }
    //   }
    // }
    setFilms((oldFilms) => oldFilms.map((f) => { if (f.id === film.id) { f.isFavorite = true; f } else { f } })); console.log(films)
  }

  /* WHY IT DOESN'T WORK ??? */

  // const handleFilter = () => {
    // switch (section) {
    //   case 'All':
    //     () => setFilms(library.getFilms());
    //     break;

    //   case 'Favorites':
    //     () => setFilms(library.getFavoriteFilms());
    //     break;

    //   case 'Best rated':
    //     console.log('here');
    //     () => setFilms(library.getBestRatedFilms())
    //     break;

    //   case 'Last seen':
    //     () => setFilms(library.getLastSeenFilms())
    //     break;

    //   case 'Unseen':
    //     () => setFilms(library.getUnseenFilms())
    //     break;
    // }
  // }

  return (

    <>
      <header>
      <Navbar fixed="top" variant='dark' bg="primary">
        <Container>
          <Navbar.Brand href="#home">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels-fill" viewBox="0 0 16 16">
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
            </svg> {' '} Film Library
          </Navbar.Brand>

          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Form>
            <Form.Control type="text" placeholder="Search" />
          </Form>

          <Nav>
            <Nav.Link href="#user">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
      <main>
      <Container>
        <Row>
            <Col>
            <ListGroup fixed='top' align='start'>
                <ListGroup.Item action onClick={() => { setSection('All'); setFilms(allFilms); }} className={section === "All" ? 'active' : ''} >All</ListGroup.Item>
                <ListGroup.Item action onClick={() => { setSection('Favorites'); setFilms(allFilms.filter((f) => f.isFavorite===true) ) }} className={section === "Favorites" ? 'active' : ''} >Favorites</ListGroup.Item>
                <ListGroup.Item action onClick={() => { setSection('Best rated'); setFilms(allFilms.filter((f) => f.score === 5) ) }} className={section === "Best rated" ? 'active' : ''}>Best Rated</ListGroup.Item>
                <ListGroup.Item action onClick={() => { setSection('Last seen'); 
                  setFilms(allFilms.filter((f) => {
                    const limitDate = dayjs().subtract(30, 'days');
                    if (f.date != undefined && dayjs(f.date).isAfter(limitDate) && !dayjs(f.date).isAfter(dayjs())) {
                      return true;
                    } else {
                      return false;
                    }
                    }) ) }} className={section === "Last seen" ? 'active' : ''}>Last Seen</ListGroup.Item>
                <ListGroup.Item action onClick={() => { setSection('Unseen'); setFilms(allFilms.filter((f) => f.date === undefined) ) }} className={section === "Unseen" ? 'active' : ''}>Unseen</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <FilmList section={section} films={films} addToFavorite={addToFavorite}/>
          </Col>
        </Row>
      </Container>
      <a className="position-absolute bottom-1 end-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="primary" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </a>
      </main>
    </>

  )
}

export default App

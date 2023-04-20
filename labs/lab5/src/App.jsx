import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

import { Film, FilmLibrary } from './film'

import { Button, Navbar, NavbarBrand, Container, Nav, Form, ListGroup } from "react-bootstrap";


// DATA
const film1 = new Film(1, 'Pulp Fiction', true);
film1.date = "March 10, 2023";
film1.score = 5;

const film2 = new Film(2, '21 Grams', true);
film2.date = 'March 17, 2023';
film2.score = 4;

const film3 = new Film(3, "Star Wars");

const film4 = new Film(4, "Matrix", false);

const film5 = new Film(5, "Shrek 2");
film5.date = "March 21, 2023";
film5.score = 3;

const film6 = new Film(6, "Shrek");
film6.date = "March 21, 2022";
film6.score = 5;

const film7 = new Film(7, "Mare Fuori", true);
film7.score = 5;

const film8 = new Film(8, "Una pezza di Lundini", true);
film8.date = "February 2, 2023";
film8.score = 5;

const film9 = new Film(9, "Saw IV");
film9.date = "2022-07-12";
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


function App() {
  const [section, setSection] = useState('all');

  return (

    <>
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
        {/* <Nav className="me-auto"> */}
        <Nav.Link href="#search">
          <Form.Control
            type="text" placeholder="Search" />

        </Nav.Link>
        <Nav.Link href="#user">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
        </Nav.Link>
      </Container>
    </Navbar>
  
      <ListGroup show fixed='left' align='start' as="ul">
        <ListGroup.Item as="li" onClick={() => setSection('all')} active>All</ListGroup.Item>
        <ListGroup.Item as="li" onClick={() => setSection('favorites')}>Favorites</ListGroup.Item>
        <ListGroup.Item as="li" onClick={() => setSection('best-rated')}>Best Rated</ListGroup.Item>
        <ListGroup.Item as="li" onClick={() => setSection('last-seen')}>Last Seen</ListGroup.Item>
        <ListGroup.Item as="li" onClick={() => setSection('unseen')}>Unseen</ListGroup.Item>
    </ListGroup>
      
    </>

  )
}

export default App

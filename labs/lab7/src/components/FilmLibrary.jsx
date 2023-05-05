import dayjs from "dayjs";
import { Table, Form, Button } from 'react-bootstrap/'
import { AddEditFilmForm } from "./AddEditFilmForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

function FilmTable(props) {
  const activeFilter = useParams();
  console.log(activeFilter)
  console.log(activeFilter.filterName)

  const [editingFilm, setEditingFilm] = useState('');

  const films = props.films.filter(props.filters[activeFilter.filterName || 'filter-all'].filterFunction);

  const handleEdit = (filmId) => {
    setEditingFilm(films.filter((f) => (f.id === filmId))[0]);
    props.setMode('edit');
  }

  return (
    <>
      <h1 className="pb-3">Filter: <span className="notbold">{props.filters[activeFilter.filterName || 'filter-all'].label}</span></h1>
    <Table striped>
      <tbody>
        { films.map((film) => <FilmRow filmData={film} key={film.id} handleDelete={props.handleDelete} handleEdit={handleEdit}/>) }
      </tbody>
    </Table>
    <div>
      { props.mode === 'add' && <AddEditFilmForm mode={props.mode} handleAdd={props.handleAdd} /> }
      { props.mode === 'edit' && <AddEditFilmForm mode={props.mode} editFilm={props.editFilm} initialValue={editingFilm} /> }
    </div>
    </>);
}
  
function FilmRow(props) {
    const formatWatchDate = (dayJsDate, format) => {
      return dayJsDate ? dayJsDate.format(format) : '';
    }
  
    return(
      <tr>
        <td>
           <p className={props.filmData.favorite ? "favorite" : ""} >
            {props.filmData.title}
          </p>
        </td>
        <td>
          <Form.Check type="switch" label="Favorite" defaultChecked={props.filmData.isFavorite ? true : false}/>
        </td>
        <td>
          <small>{props.filmData.date && formatWatchDate(dayjs(props.filmData.date), 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <Rating rating={props.filmData.score} maxStars={5}/>
        </td>
        <td>
          <Form>
            <Button variant="success" id="editButton" onClick={() => props.handleEdit(props.filmData.id)}>
              <i className="bi bi-pencil-square"></i>
            </Button>
          </Form>
        </td>
        <td>
          <Form onSubmit={() => props.handleDelete(props.filmData.id)}>
            <Button type='submit' variant='danger' id='deleteButton'>
              <i className="bi bi-trash3-fill"></i>
            </Button>
          </Form>
        </td>
      </tr>
    );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  )
}

export default FilmTable;

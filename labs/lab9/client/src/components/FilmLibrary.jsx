import dayjs from "dayjs";
import { useEffect } from "react";
import { Table, Form, Button } from 'react-bootstrap/'
import { useNavigate, useParams } from "react-router-dom";
import { listFilteredFilms } from "../../API/API";
import { useState } from "react";

function FilmTable(props) {
  const activeFilter = useParams();

  const navigate = useNavigate();

  const [films, setFilms] = useState([]);

//   const films = props.films.filter(props.filters[activeFilter.filterName || 'filter-all'].filterFunction);
  useEffect(() => {
    listFilteredFilms(activeFilter.filterName).then((result) => {
      setFilms(result);
      console.log("DB queried successfully");
    }).catch((error) => {
      console.log("ERRORRRR")
    })
  }, [activeFilter]);
  
  return (
    <>
      <h1 className="pb-3">Filter: <span className="notbold">{props.filters[activeFilter.filterName || 'filter-all'].label}</span></h1>
    <Table striped>
      <tbody>
        { films.map((film) => <FilmRow filmData={film} key={film.id}/>) }
      </tbody>
    </Table>

    <Button variant="primary" size="lg" className="fixed-right-bottom" onClick={() => navigate('/add')}> &#43; </Button>

    </>);
}

function handleDelete() {
  console.log('delete');
}
  
function FilmRow(props) {
    const navigate = useNavigate();
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
            <Button variant="success" id="editButton" onClick={() => navigate(`/edit/${props.filmData.id}`)}>
              <i className="bi bi-pencil-square"></i>
            </Button>
          </Form>
        </td>
        <td>
          <Form onSubmit={() => handleDelete(props.filmData.id)}>
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

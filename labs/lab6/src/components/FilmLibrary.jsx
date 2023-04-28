import dayjs from "dayjs";
import { Table, Form, Button } from 'react-bootstrap/'

function FilmTable(props) {
  const {films, activeFilter} = props;

  return (
    <Table striped>
      <tbody>
        { films.map((film) => <FilmRow filmData={film} key={film.id} handleDelete={props.handleDelete} />) }
      </tbody>
    </Table>
  );
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
          <small>{formatWatchDate(dayjs(props.filmData.date), 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <Rating rating={props.filmData.score} maxStars={5}/>
        </td>
        <td>
          <Form onSubmit={(f) => props.handleEdit(f)}>
            <Button variant="success" id="editButton" type="submit">
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

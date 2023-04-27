import dayjs from "dayjs";
import { Table, Form } from 'react-bootstrap/'

function FilmTable(props) {
  const {films, activeFilter} = props;

  return (
    <Table striped>
      <tbody>
        { films.map((film) => <FilmRow filmData={film} key={film.id}/>) }
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
          <i className="bi bi-pencil-square"></i>
        </td>
        <td>
          <i className="bi bi-trash3-fill"></i>
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

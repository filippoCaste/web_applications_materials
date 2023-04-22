import dayjs from 'dayjs';
import {useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap';
import { Film, FilmLibrary } from './film'


function FilmList (props) {

    const all_films = props.films;
    let [films, setFilms] = useState([...all_films]);

    switch (props.section) {
        case 'All':
            () => setFilms(all_films);
            break;

        case 'Favorites':
            () =>  setFilms(all_films.getFavoriteFilms());
            break;

        case 'Best rated':
            () => setFilms(all_films.getBestRated())
            break;

        case 'Last seen':
            () =>  setFilms(all_films.getLastSeenFilms())
            break;

        case 'Unseen':
            () => setFilms(all_films.getUnseen())
            break;

        default:
            break;
    }


    return (<>
        <FilmDetails films={films} section={props.section}/>
    </>)

}

function FilmDetails(props) {

    return <>
        <h1>{props.section}</h1>
        <Table hover>
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Favorite</th>
                    <th scope="col">Date</th>
                    <th scope="col">Rate</th>
                </tr>
            </thead>
            <tbody>
                {props.films.map((f) => (<FilmRow key={f.id} film={f} films={props.films} />))}
            </tbody>
            <tfoot></tfoot>
        </Table>
    </>

}

function FilmRow(props) {
    return <tr>
        {/* <td>{props.f.id}</td> */}
        <td>{props.film.title}</td>
        <td> 
            <Favorite film={props.film} />
        </td>
        <td>{(props.film.date && dayjs(props.film.date).format('YYYY-MM-DD'))}</td>
        <td>
            <Stars score={props.film.score}/>
        </td>
    </tr>
}

function Favorite(props) {
        console.log(props.film.isFavorite + "  TODO")
        return <Form>
            <Form.Check type='switch' className={props.film.isFavorite === true ? 'checked' : ''} />
        </Form>
}

function Stars(props) {
    return <p>
        {/* {printStars(props.score)} */}
        {props.score || "-"} / 5
    </p>

}

const printStars = (numf) => {
    const max_rating = 5;
    let str;
    for (let i = 0; i < numf; i++) {
        str += <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg >
    }
    console.log(str)
    for (let i = 0; i < max_rating - numf; i++) {
        str += <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" /></svg >;
    }
    return str;
}

export {FilmList}
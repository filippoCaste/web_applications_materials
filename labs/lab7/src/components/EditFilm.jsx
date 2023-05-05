import dayjs from "dayjs";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditFilm(props) {

    const {filmId} = useParams();
    const initialValue = props.films.filter((f) => (f.id == filmId))[0];

    console.log(initialValue);

    const [err, setErr] = useState('');
    const [validated, setValidated] = useState(false);

    const [id, setId] = useState(initialValue.id || '')
    const [title, setTitle] = useState(initialValue.title || '');
    const [date, setDate] = useState(initialValue.date || '');
    const [favorite, setFavorite] = useState(initialValue.isFavorite || false);
    const [score, setScore] = useState(initialValue.score || '');

    const navigate = useNavigate();

    const editFilm = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (title != '') {
            props.editFilm(id, title, favorite, date, score);
        } else {
            setErr('Something went wrong. Try again!')
        }
        setValidated(true);
        navigate('/');
    }

    const handleCancel = () => {
        setDate('');
        setFavorite(false);
        setScore('');
        setTitle('');
        navigate('/');
    }

    return (
        <div>
            <Form noValidate validated={validated}>
                <FormGroup controlId="title">
                    <Form.Label className="fw-light"> Title </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control required value={title} onChange={(ev) => setTitle(ev.target.value)} type='text' name='title' placeholder="Title" />
                        <Form.Control.Feedback type="invalid">
                            Please insert the title
                        </Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="favorite">
                    <Form.Label className="fw-light"> Favorite </Form.Label>
                    <Form.Check value={favorite} onChange={(ev) => setFavorite(ev.target.value)} type='switch' name='favorite' checked={favorite ? true : false} />
                </FormGroup>

                <FormGroup controlId="date">
                    <Form.Label className="fw-light"> Date </Form.Label>
                    <Form.Control value={date} onChange={(ev) => setDate(ev.target.value)} type='date' name='date' placeholder={date}/>
                </FormGroup>

                <FormGroup controlId="score">
                    <Form.Label className="fw-light"> Rate </Form.Label>
                    <Form.Control value={score} onChange={(ev) => setScore(ev.target.value)} type='numeric' name='score' placeholder="Rate" />
                </FormGroup>

                <br /> {err != '' && <Alert key='danger' variant='danger'> {err} </Alert>}

                <Form.Group controlId="button">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
                    <Button variant='success' id="saveButton" onClick={editFilm}>SAVE</Button>
                    {' '}<Button variant='warning' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
            </Form>

        </div>
    );


}
export {EditFilm};
import { useState } from "react";
import { Alert, Button, Form, FormGroup, InputGroup } from "react-bootstrap"

function AddEditFilmForm(props) {

    const [initialValue, setInitialValue] = useState(props.initialValue || ''); // in case of editing
    console.log(initialValue)

    const [id, setId] = useState(initialValue.id || '')
    const [title, setTitle] = useState(initialValue.title || '');
    const [date, setDate] = useState(initialValue.date || '');
    const [favorite, setFavorite] = useState(initialValue.isFavorite || false );
    const [score, setScore] = useState(initialValue.score || '');

    const[err,setErr] = useState('');
    const [validated, setValidated] = useState(false);

    const handleAdd = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if(title!='') {
            props.handleAdd(title, favorite, date, score);
        } else {
            setErr('Missing data: provide at least the title to continue')
        }

        setValidated(true);
    }

    const editFilm = (event) => {

        console.log(id)

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (title != '') {
            props.editFilm(id, title, favorite, date, score);
        } else {
            setErr('Missing data: provide at least the title to continue')
        }
        console.log('hhhere')
        setValidated(true);
    }

    const handleCancel = () => {
        setDate('');
        setFavorite(false);
        setScore('');
        setTitle('');
    }

    return (
        <div>
            <Form noValidate validated={validated}>
                <FormGroup controlId="title">
                    <Form.Label className="fw-light"> Title </Form.Label>
                    <InputGroup hasValidation>
                        {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                        <Form.Control required value={title} onChange={(ev) => setTitle(ev.target.value)} type='text' name='title' placeholder="Title" />
                        <Form.Control.Feedback type="invalid">
                            Please insert the title
                        </Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="favorite">
                    <Form.Label className="fw-light"> Favorite </Form.Label>
                    <Form.Check value={favorite} onChange={(ev) => setFavorite(ev.target.value)} type='switch' name='favorite' />
                </FormGroup>

                <FormGroup controlId="date">
                    <Form.Label className="fw-light"> Date </Form.Label>
                    <Form.Control value={date} onChange={(ev) => setDate(ev.target.value)} type='date' name='date' placeholder="DD/MM/YYYY" />
                </FormGroup>

                {/* Validate 1-5 TODO */}
                <FormGroup controlId="score">
                    <Form.Label className="fw-light"> Rate </Form.Label>
                    <Form.Control value={score} onChange={(ev) => setScore(ev.target.value)} type='numeric' name='score' placeholder="Rate" />
                </FormGroup>

                <br/> {err != '' && <Alert key='danger' variant='danger'> {err} </Alert>} 

                <Form.Group controlId="button">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
                    {props.mode === 'add' && <Button variant='success' id="addButton" onClick={handleAdd}>ADD</Button>}
                    {props.mode === 'edit' && <Button variant='success' id="saveButton" onClick={editFilm}>SAVE</Button>}
                    {' '}<Button variant='warning' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
            </Form>

        </div>
    );
}

export {AddEditFilmForm}
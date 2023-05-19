import { useState } from "react";
import { Alert, Button, Form, FormGroup, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddFilm(props) {

    const [err, setErr] = useState('');
    const [validated, setValidated] = useState(false);

    const [id, setId] = useState('')
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [score, setScore] = useState('');

    const navigate = useNavigate();

    const handleAdd = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (title != '') {
            props.handleAdd(title, favorite, date, score);
        } else {
            setErr('Missing data: provide at least the title to continue')
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

                <br /> {err != '' && <Alert key='danger' variant='danger'> {err} </Alert>}

                <Form.Group controlId="button">
                    <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
                    <Button variant='success' id="addButton" onClick={handleAdd}>ADD</Button>
                    {' '}<Button variant='warning' id="addbutton" onClick={handleCancel}>CANCEL</Button>
                </Form.Group>
            </Form>

        </div>
    );

}

export {AddFilm} ;
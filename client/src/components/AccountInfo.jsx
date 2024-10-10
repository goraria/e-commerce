import React, {Component, useState} from "react";
import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAt, faBullseye, faCity, faGift, faHistory, faLocationDot, faMapMarkerAlt, faMapPin,
    faPhone, faQuestionCircle, faSignOutAlt, faStar, faUser
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AccountInfo() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                const response = await axios.post('http://localhost:5172/login/authentication', {
                    username: formData.username,
                    password: formData.password
                });

                const data = response.data;
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    alert('Login successful');
                    navigate('/');
                }
            } catch (error) {
                alert('Login fail');
                setError(error.response ? error.response.data.message : 'Login failed');
            }
        }
        setValidated(true);
    };

    return (
        <Container>
            <h2>Account Information</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md={7} controlId="firstname">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faAt}/>
                            </InputGroup.Text>
                            <Form.Control
                                required
                                type="email"
                                placeholder="mail@mail.com"
                                defaultValue=""
                            />
                            <Form.Control.Feedback type="invalid">
                                Looks good!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md={5} controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faUser}/>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md={4} controlId="firstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="lastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            defaultValue=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="validationCustom04">
                        <Form.Label>Phone</Form.Label>
                        {/*<Form.Control type="list-number" placeholder="Phone" required />*/}
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FontAwesomeIcon icon={faPhone}/>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <hr/>
                <Row>
                    <Col sm={12} md={5} lg={4}>
                        <Button variant="danger" type="reset" className="mb-2" style={{width: '100%'}}>
                            Change Password
                        </Button>
                    </Col>
                    <Col sm={0} md={2} lg={4}></Col>
                    <Col sm={12} md={5} lg={4}>
                        <Button variant="danger" type="submit" className="mb-2" style={{width: '100%'}}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

// class AccountInfo extends Component {
// // function AccountInfo() {
//     constructor(parameters) {
//         super(parameters);
//         this.state = {
//             validated: false,
//         };
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleSubmit(event) {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         this.setState({ validated: true });
//     }
//
//     render() {
//
//     }
// }

export default AccountInfo;
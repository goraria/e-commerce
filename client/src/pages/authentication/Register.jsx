import React, {Component, useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button, Col, Row, Container, Card, Form, Image, InputGroup } from "react-bootstrap";
import SocialFormButton from "../../components/button/SocialFormButton.jsx";

import jp from '../../assets/images/jp.jpeg'
import axios from "axios";
import Overview from "../../layouts/Overview.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";

const sclItems = [
    // { id: 0, name: "Github", icon: faGithub, color: "secondary" },
    { id: 1, name: "Apple", color: "dark" },
    { id: 2, name: "Google", color: "success" },
    { id: 3, name: "Meta", color: "primary" },
    // { id: 4, name: "Twitter", icon: faTwitter },
]

const Register = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        retypepass: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
    });

    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);  // trạng thái cho NotifySuccess
    const [showError, setShowError] = useState(false);  // trạng thái cho NotifyError

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

            if (formData.password === formData.retypepass) {
                try {
                    const response = await axios.put('http://localhost:5172/authentication/register', formData);

                    if (response.status === 201) {
                        setShowSuccess(true)
                        // navigate('/login');  // Redirect to login after successful registration
                        // setTimeout(() => navigate('/login'), 2000);
                    }
                } catch (error) {
                    setError(error.response ? error.response.data.message : 'Registration failed');
                    setShowError(true);
                }
            } else {
                setError('Password is not match!');
                setShowError(true);
            }
        }
        setValidated(true);
    };

    return (
        <>
            <Overview mt={112} me={56}>
                <div>
                    <h2>Register</h2>
                    <div style={{display: "flex", marginBottom: 16, justifyContent: 'center'}}>
                        <Image
                            className="d-block"
                            src={jp}
                            alt="Second slide"
                            style={{objectFit: 'cover', width: 224, height: 224, borderRadius: '5px'}}
                        />
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={7} controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className='bx bx-at' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="email@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a email.
                                    </Form.Control.Feedback>
                                    {/*<Form.Control.Feedback>*/}
                                    {/*    Looks good!*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="username">
                                <Form.Label>Username</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className='bx bx-user' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                    {/*<Form.Control.Feedback>*/}
                                    {/*    Looks good!*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} controlId="password">
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        required
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        minLength={8}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your password.
                                    </Form.Control.Feedback>
                                    {/*<Form.Control.Feedback>*/}
                                    {/*    Looks good!*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6} controlId="retypepass">
                                <Form.Label>Verify Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        name="retypepass"
                                        placeholder="Re-type password"
                                        minLength={8}
                                        value={formData.retypepass}
                                        onChange={handleChange}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please retype your password.
                                    </Form.Control.Feedback>
                                    {/*<Form.Control.Feedback>*/}
                                    {/*    Looks good!*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={4} controlId="firstname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your Firstname.
                                </Form.Control.Feedback>
                                {/*<Form.Control.Feedback>*/}
                                {/*    Looks good!*/}
                                {/*</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="lastname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your Lastname.
                                </Form.Control.Feedback>
                                {/*<Form.Control.Feedback>*/}
                                {/*    Looks good!*/}
                                {/*</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                {/*<Form.Control type="list-number" placeholder="Phone" required />*/}
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <i className='bx bx-phone'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        minLength={10}
                                        maxLength={10}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                        Please enter your phone number.
                                    </Form.Control.Feedback>
                                    {/*<Form.Control.Feedback>*/}
                                    {/*    Looks good!*/}
                                    {/*</Form.Control.Feedback>*/}
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        {/*<hr/>*/}
                        <Row className="mb-3">
                            <Col xs={6}>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        required
                                        type="checkbox"
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" style={{width: '100%'}}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                        <hr/>
                        {/*<div className="text-center" style={{marginBottom: 16}}>or sign up with</div>*/}
                        {/*<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>*/}
                        {/*    {sclItems.map(socialItem => (*/}
                        {/*        <SocialFormButton key={socialItem.id} socialItems={socialItem}/>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        <div className="text-center" style={{marginBottom: 16}}>
                            you have an acoount
                            <Link to="/login">
                                <Button variant="link" style={{
                                    padding: 0,
                                    color: '#696cff',
                                    textDecoration: "none",
                                    fontWeight: 'bold',
                                    paddingLeft: 4
                                }}>Log in</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </Overview>

            <NotifySuccess
                title="'Registration successful'"
                message="You have register in successfully."
                show={showSuccess}  // truyền showSuccess vào NotifySuccess
                onHide={() => setShowSuccess(false)}  // đóng khi người dùng click
            />

            <NotifyError
                title="Registration Failed"
                message={error}
                show={showError}  // truyền showError vào NotifyError
                onHide={() => setShowError(false)}  // đóng khi người dùng click
            />
        </>
    )
}

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//
//         }
//     }
//
//     render() {
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         // const [validated, setValidated] = useState(false);
//         //
//         // const handleSubmit = (event) => {
//         //     const form = event.currentTarget;
//         //     if (form.checkValidity() === false) {
//         //         event.preventDefault();
//         //         event.stopPropagation();
//         //     }
//         //
//         //     setValidated(true);
//         // };
//
//
//     }
// }

export default Register
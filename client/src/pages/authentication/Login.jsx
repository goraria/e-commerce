import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Image, Col, Row, Card } from "react-bootstrap";
import axios from "axios";

import SocialFormButton from "../../components/button/SocialFormButton.jsx";

import jp from '../../assets/images/jp.jpeg'
import Overview from "../../layouts/Overview.jsx";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";
import Frame from "../../layouts/Frame.jsx";
import Loading from "../overview/Loading.jsx";

const sclItems = [
    // { id: 0, name: "Github", icon: faGithub, color: "secondary" },
    { id: 1, name: "Apple", color: "dark" },
    { id: 2, name: "Google", color: "success" },
    { id: 3, name: "Meta", color: "primary" },
    // { id: 4, name: "Twitter", icon: faTwitter },
]

const Login = ({ authenticationCheck }) => {
    // const [modalShow, setModalShow] = useState(false);
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);  // trạng thái cho NotifySuccess
    const [showError, setShowError] = useState(false);  // trạng thái cho NotifyError
    const [loading, setLoading] = useState(false);  // Thêm trạng thái loading
    const navigate = useNavigate();
    let role = null;

    const handleNavigate = (r) => {
        if (r === 1) {
            navigate("/admin");
        } else if (r === 0) {
            navigate("/user");
        } else {
            navigate("/404");
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:5172/authentication/login', {
                    username: formData.username,
                    password: formData.password
                });

                // if (response.data.token) {
                //     localStorage.setItem('token', response.data.token);
                //     setShowSuccess(true);
                //
                //     const checker = await authenticationCheck();
                //     console.log(checker)
                //     if (checker.role === 1) {
                //         navigate("/admin");
                //     } else if (checker.role === 0) {
                //         navigate("/user/profile");
                //     }
                // }

                if (response.data.token) {
                    // Lưu token vào localStorage
                    localStorage.setItem('token', response.data.token);

                    setShowSuccess(true);

                    // Gọi authenticationCheck để xác thực và lấy role
                    const token = localStorage.getItem('token');
                    const authResponse = await axios.get('http://localhost:5172/authentication/check', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    role = authResponse.data.role;
                    // if (role === 1) {
                    //     navigate("/admin");
                    // } else if (role === 0) {
                    //     navigate("/user/profile");
                    // }

                    // setTimeout(() => {
                    //     handleNavigate(role)
                    // }, 3000)
                    handleNavigate(role)
                }
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Login failed');
                setShowError(true);
            } finally {
                setLoading(false);
            }
        }
        setValidated(true);
    };

    // useEffect(() => {
    //     authenticationCheck();
    // }, [navigate]);

    if (loading) return <Frame><Loading /></Frame>

    return (
        <>
            <Overview mt={112} me={56}>
                <div>
                    <h2>Log in</h2>
                    <div style={{ display: "flex", marginBottom: 16, justifyContent: 'center' }}>
                        <Image
                            className="d-block"
                            src={jp}
                            alt="Second slide"
                            style={{ objectFit: 'cover', width: 224, height: 224, borderRadius: '5px' }}
                        />
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            {/*<Form.Label>Email address</Form.Label>*/}
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {/*<Form.Text className="text-muted">*/}
                            {/*    We'll never share your email with anyone else.*/}
                            {/*</Form.Text>*/}
                            <Form.Control.Feedback type="invalid">
                                Please enter your username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/*</FloatingLabel>*/}
                        <Row className="mb-3">
                            <Col xs={6}>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        // required
                                        type="checkbox"
                                        label="Remember Account"
                                        // feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6} className="text-end">
                                <Button
                                    variant="link"
                                    as={Link}
                                    to="/forgot-password"
                                    style={{
                                        padding: 0,
                                        color: '#696cff',
                                        textDecoration: "none",
                                        fontWeight: 'bold'
                                    }}>
                                    Forgot password?
                                </Button>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" style={{ width: '100%' }}
                            onClick={() => setCheck(true)}>
                            Log in
                        </Button>
                        <hr />
                        {/*<div className="text-center" style={{marginBottom: 16}}>or sign in with</div>*/}
                        {/*<div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>*/}
                        {/*    {sclItems.map(socialItem => (*/}
                        {/*        <SocialFormButton key={socialItem.id} socialItems={socialItem}/>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        <div className="text-center" style={{ marginBottom: 16 }}>
                            you don&#39;t have an acoount
                            <Link to="/register">
                                <Button variant="link" style={{
                                    padding: 0,
                                    color: '#696cff',
                                    textDecoration: "none",
                                    fontWeight: 'bold',
                                    paddingLeft: 4
                                }}>Sign up</Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </Overview>

            <NotifySuccess
                title="Login Successful"
                message="You have logged in successfully."
                show={showSuccess}  // truyền showSuccess vào NotifySuccess
                onHide={() => setShowSuccess(false)}  // đóng khi người dùng click
            />

            <NotifyError
                title="Login Failed"
                message={error}
                show={showError}  // truyền showError vào NotifyError
                onHide={() => setShowError(false)}  // đóng khi người dùng click
            />
        </>
    )
}

export default Login
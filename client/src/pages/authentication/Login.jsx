import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Image, Col, Row, Card } from "react-bootstrap";
import Overview from "../../layouts/Overview.jsx";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";
import Frame from "../../layouts/Frame.jsx";
import Loading from "../overview/Loading.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {AuthWrapper} from "./AuthWrapper.jsx";

import {jwtDecode} from "jwt-decode";
import axios from "axios";

import jp from '../../assets/images/jp.jpeg'

const socials = [
    // { id: 0, name: "Github", icon: faGithub, color: "secondary" },
    { id: 1, name: "Apple", box: 'bx bxl-apple', color: "dark" },
    { id: 2, name: "Google", box: 'bx bxl-google', color: "danger" },
    { id: 3, name: "Meta", box: 'bx bxl-facebook-circle', color: "info" },
    // { id: 4, name: "Twitter", icon: faTwitter },
]

const Login = () => {
    // const [modalShow, setModalShow] = useState(false);
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [formGoogle, setFormGoogle] = useState(null);

    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);  // trạng thái cho NotifySuccess
    const [showError, setShowError] = useState(false);  // trạng thái cho NotifyError
    const [loading, setLoading] = useState(false);  // Thêm trạng thái loading
    const navigate = useNavigate();
    let role = null;

    const handleNavigate = (role) => {
        if (role === 1) {
            navigate("/admin");
        } else if (role === 0) {
            navigate("/user");
        } else {
            navigate("/auth/error");
        }
    };

    const handleCheck = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded.role || null;

                handleNavigate(role); // Chuyển hướng nếu token hợp lệ
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
                navigate("/auth/login");
            }
        }
    };

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
            let role = null;
            try {
                const response = await axios.post("http://localhost:5172/authentication/login", {
                    username: formData.username,
                    password: formData.password
                });

                if (response.data.token) {
                    const token = response.data.token;
                    localStorage.setItem("token", token);

                    const decoded = jwtDecode(token);
                    role = decoded.role || null;

                    setShowSuccess(true);
                    handleNavigate(role);
                }
            } catch (error) {
                setError(error.response?.data?.message || "Login failed");
                setShowError(true);
            } finally {
                setLoading(false);
            }
        }
        setValidated(true);
    };

    const handleGoogleLogin = async (response) => {
        try {
            const user = jwtDecode(response.credential);
            setFormGoogle(user);

            const backendResponse = await axios.post("http://localhost:5172/authentication/google", {
                token: response.credential,
            });

            if (backendResponse.data.success) {
                localStorage.setItem("token", backendResponse.data.token);
                setShowSuccess(true);
            } else {
                setError("Google Login failed.");
            }
        } catch (err) {
            setError("An error occurred during Google Login.");
            console.error(err);
        }
    };

    const handleGoogleLogout = () => {

    }

    useEffect(() => {
        // handleCheck();
    }, []);

    if (loading) return <Loading/>

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Welcome to Cipher! 👋</h4>
                <p className="mb-4">Please sign-in to your account and start the adventure</p>

                {/*<Form noValidate validated={validated} onSubmit={handleSubmit}>*/}
                {/*    <Form.Group className="mb-3" controlId="username">*/}
                {/*        /!*<Form.Label>Email address</Form.Label>*!/*/}
                {/*        <Form.Label>Username</Form.Label>*/}
                {/*        <Form.Control*/}
                {/*            type="text"*/}
                {/*            placeholder="Username"*/}
                {/*            name="username"*/}
                {/*            value={formData.username}*/}
                {/*            onChange={handleChange}*/}
                {/*            required*/}
                {/*        />*/}
                {/*        /!*<Form.Text className="text-muted">*!/*/}
                {/*        /!*    We'll never share your email with anyone else.*!/*/}
                {/*        /!*</Form.Text>*!/*/}
                {/*        <Form.Control.Feedback type="invalid">*/}
                {/*            Please enter your username.*/}
                {/*        </Form.Control.Feedback>*/}
                {/*    </Form.Group>*/}
                {/*    <Form.Group className="mb-3" controlId="password">*/}
                {/*        <Form.Label>Password</Form.Label>*/}
                {/*        <Form.Control*/}
                {/*            type="password"*/}
                {/*            placeholder="Password"*/}
                {/*            name="password"*/}
                {/*            value={formData.password}*/}
                {/*            onChange={handleChange}*/}
                {/*            required*/}
                {/*        />*/}
                {/*        <Form.Control.Feedback type="invalid">*/}
                {/*            Please enter your password.*/}
                {/*        </Form.Control.Feedback>*/}
                {/*    </Form.Group>*/}
                {/*    /!*</FloatingLabel>*!/*/}
                {/*    <div className="row mb-3">*/}
                {/*        <Col xs={6}>*/}
                {/*            <Form.Group controlId="formBasicCheckbox">*/}
                {/*                <Form.Check*/}
                {/*                    // required*/}
                {/*                    type="checkbox"*/}
                {/*                    label="Remember Account"*/}
                {/*                    // feedback="You must agree before submitting."*/}
                {/*                    // feedbackType="invalid"*/}
                {/*                />*/}
                {/*            </Form.Group>*/}
                {/*        </Col>*/}
                {/*    </div>*/}
                {/*    <hr/>*/}
                {/*    <div className="text-center mb-3">or log in with</div>*/}
                {/*    <div className="row d-flex justify-content-center flex-wrap">*/}
                {/*        <div className="col-lg-12">*/}
                {/*            <div className="d-flex justify-content-center"*/}
                {/*                 style={{minWidth: '120px', width: '100%'}}>*/}
                {/*                <GoogleLogin*/}
                {/*                    onSuccess={(response) => handleGoogleLogin(response)}*/}
                {/*                    onError={() => console.log("Japtor")}*/}
                {/*                    style={{width: '100%'}}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Form>*/}
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="email" className="form-label">Email or Username</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className="form-control"*/}
                    {/*        id="email"*/}
                    {/*        value={formData.name}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        name="email"*/}
                    {/*        placeholder="Enter your email or username"*/}
                    {/*        autoFocus/>*/}
                    {/*</div>*/}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={formData.name}
                            onChange={handleChange}
                            name="username"
                            placeholder="Enter your username"
                            required
                            autoFocus/>
                    </div>
                    <div className="mb-3 form-password-toggle">
                        <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">Password</label>
                            <Link aria-label="Go to Forgot Password Page" to="/auth/forgot-password">
                                <small>Forgot Password?</small>
                            </Link>
                        </div>
                        <div className="input-group input-group-merge">
                            <input
                                type="password"
                                autoComplete="true"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                name="password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                aria-describedby="password"
                                required/>
                            {/*<span className="input-group-text cursor-pointer"></span>*/}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember-me"
                                name="rememberMe"
                                // checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Log in
                        </button>
                        {/*<Button variant="primary" type="submit" style={{width: '100%'}}*/}
                        {/*        onClick={() => setCheck(true)}>*/}
                        {/*    Log in*/}
                        {/*</Button>*/}
                    </div>
                </Form>

                <p className="text-center">
                    <span>New on our platform? </span>
                    <Link aria-label="Go to Register Page" to='/auth/register' className="registration-link">
                        <span>Create an account</span>
                    </Link>
                </p>

                <div className="divider my-6">
                    <div className="divider-text">or</div>
                </div>
                {/*<div className="text-center mb-3">or log in with</div>*/}
                <div className="row d-flex justify-content-center flex-wrap">
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-center"
                             style={{minWidth: '120px', width: '100%'}}>
                            <GoogleLogin
                                onSuccess={(response) => {
                                    setFormGoogle(jwtDecode(response.credential));
                                    console.log(formGoogle)
                                    console.log(formGoogle.email.split('@')[0])
                                }}
                                onError={() => console.log("Japtor")}
                                style={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
            </AuthWrapper>

            {/*<Overview mt={112} me={56}>*/}
            {/*    <div>*/}
            {/*        <h2>Log in</h2>*/}
            {/*        <div style={{display: "flex", marginBottom: 16, justifyContent: 'center'}}>*/}
            {/*            <Image*/}
            {/*                className="d-block"*/}
            {/*                src={jp}*/}
            {/*                alt="Second slide"*/}
            {/*                style={{objectFit: 'cover', width: 224, height: 224, borderRadius: '5px'}}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <Form noValidate validated={validated} onSubmit={handleSubmit}>*/}
            {/*            <Form.Group className="mb-3" controlId="username">*/}
            {/*                /!*<Form.Label>Email address</Form.Label>*!/*/}
            {/*                <Form.Label>Username</Form.Label>*/}
            {/*                <Form.Control*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Username"*/}
            {/*                    name="username"*/}
            {/*                    value={formData.username}*/}
            {/*                    onChange={handleChange}*/}
            {/*                    required*/}
            {/*                />*/}
            {/*                /!*<Form.Text className="text-muted">*!/*/}
            {/*                /!*    We'll never share your email with anyone else.*!/*/}
            {/*                /!*</Form.Text>*!/*/}
            {/*                <Form.Control.Feedback type="invalid">*/}
            {/*                    Please enter your username.*/}
            {/*                </Form.Control.Feedback>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group className="mb-3" controlId="password">*/}
            {/*                <Form.Label>Password</Form.Label>*/}
            {/*                <Form.Control*/}
            {/*                    type="password"*/}
            {/*                    placeholder="Password"*/}
            {/*                    name="password"*/}
            {/*                    value={formData.password}*/}
            {/*                    onChange={handleChange}*/}
            {/*                    required*/}
            {/*                />*/}
            {/*                <Form.Control.Feedback type="invalid">*/}
            {/*                    Please enter your password.*/}
            {/*                </Form.Control.Feedback>*/}
            {/*            </Form.Group>*/}
            {/*            /!*</FloatingLabel>*!/*/}
            {/*            <div className="row mb-3">*/}
            {/*                <Col xs={6}>*/}
            {/*                    <Form.Group controlId="formBasicCheckbox">*/}
            {/*                        <Form.Check*/}
            {/*                            // required*/}
            {/*                            type="checkbox"*/}
            {/*                            label="Remember Account"*/}
            {/*                            // feedback="You must agree before submitting."*/}
            {/*                            // feedbackType="invalid"*/}
            {/*                        />*/}
            {/*                    </Form.Group>*/}
            {/*                </Col>*/}
            {/*                <Col xs={6} className="text-end">*/}
            {/*                    <Button*/}
            {/*                        variant="link"*/}
            {/*                        as={Link}*/}
            {/*                        to="/forgot-password"*/}
            {/*                        style={{*/}
            {/*                            padding: 0,*/}
            {/*                            color: '#696cff',*/}
            {/*                            textDecoration: "none",*/}
            {/*                            fontWeight: 'bold'*/}
            {/*                        }}>*/}
            {/*                        Forgot password?*/}
            {/*                    </Button>*/}
            {/*                </Col>*/}
            {/*            </div>*/}
            {/*            <Button variant="primary" type="submit" style={{width: '100%'}}*/}
            {/*                    onClick={() => setCheck(true)}>*/}
            {/*                Log in*/}
            {/*            </Button>*/}
            {/*            <hr/>*/}
            {/*            <div className="text-center mb-3">or log in with</div>*/}
            {/*            <div className="row d-flex justify-content-center flex-wrap">*/}
            {/*                /!*{socials.map(socialItem => (*!/*/}
            {/*                /!*    <>*!/*/}
            {/*                /!*        <div className="col-lg-4">*!/*/}
            {/*                /!*            <SocialFormButton key={socialItem.id} element={socialItem}/>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    </>*!/*/}
            {/*                /!*))}*!/*/}
            {/*                /!*<div className="col-lg-12">*!/*/}
            {/*                /!*    <Button*!/*/}
            {/*                /!*        variant="secondary" type="button"*!/*/}
            {/*                /!*        className="flex-grow-1 w-100"*!/*/}
            {/*                /!*        style={{minWidth: '120px'}}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <i className="bx bxl-google me-2"></i>*!/*/}
            {/*                /!*        Google*!/*/}
            {/*                /!*    </Button>*!/*/}
            {/*                /!*</div>*!/*/}
            {/*                /!*<div className="col-lg-12">*!/*/}
            {/*                /!*    <div className="flex-grow-1 w-100 justify-content-center"*!/*/}
            {/*                /!*         style={{minWidth: '120px'}}*!/*/}
            {/*                /!*    >*!/*/}
            {/*                /!*        <GoogleLogin*!/*/}
            {/*                /!*            onSuccess={(response) => handleGoogleLogin(response)}*!/*/}
            {/*                /!*            onError={() => console.log("Japtor")}*!/*/}
            {/*                /!*            // auto_select={true}*!/*/}
            {/*                /!*        />*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*</div>*!/*/}
            {/*                <div className="col-lg-12">*/}
            {/*                    <div className="d-flex justify-content-center"*/}
            {/*                         style={{minWidth: '120px', width: '100%'}}>*/}
            {/*                        <GoogleLogin*/}
            {/*                            onSuccess={(response) => handleGoogleLogin(response)}*/}
            {/*                            onError={() => console.log("Japtor")}*/}
            {/*                            style={{width: '100%'}}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <hr/>*/}
            {/*            <div className="text-center" style={{marginBottom: 16}}>*/}
            {/*                you don&#39;t have an acoount*/}
            {/*                <Link to="/register">*/}
            {/*                    <Button variant="link" style={{*/}
            {/*                        padding: 0,*/}
            {/*                        color: '#696cff',*/}
            {/*                        textDecoration: "none",*/}
            {/*                        fontWeight: 'bold',*/}
            {/*                        paddingLeft: 4*/}
            {/*                    }}>Sign up</Button>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</Overview>*/}

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
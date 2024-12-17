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
import { Loading } from "../overview/Loading.jsx";
import { AuthWrapper } from "./AuthWrapper.jsx";
import ReCaptchaComponent from "../../components/Recapcha/Recapcha.jsx";
const ForgotPassword = () => {
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);  // trạng thái cho NotifySuccess
    const [showError, setShowError] = useState(false);  // trạng thái cho NotifyError
    const [loading, setLoading] = useState(false);  // Thêm trạng thái loading
    const navigate = useNavigate();
    const handleSuccess = (data) => {
        console.log('Captcha verification success:', data);
        alert('Verification successful, proceed with form submission!');
    };

    const handleError = (error) => {
        console.log('Captcha verification failed:', error);
        alert('Verification failed, please try again!');
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
            try {
                const response = await axios.post('http://localhost:5172/authentication/forgot-password', {
                    email: formData.email
                });
                setShowSuccess(true);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Reset password failed');
                setShowError(true);
            } finally {
                setLoading(false);
            }
            setValidated(true);
        }
    };

    // useEffect(() => {
    //     authenticationCheck();
    // }, [navigate]);

    if (loading) return <Loading />

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Forgot Password? 🔒</h4>
                <p className="mb-4">Enter your email and we&#39;ll send you instructions to reset your password</p>
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoFocus />
                    </div>
                    <div className="mb-3">
                        <button
                            aria-label='Click me'
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                            onClick={() => setCheck(true)}
                        >
                            Send Reset Link
                        </button>
                        {/*<Button variant="primary" type="submit" style={{width: '100%'}}*/}
                        {/*        onClick={() => setCheck(true)}>*/}
                        {/*    Submit*/}
                        {/*</Button>*/}
                    </div>
                </Form>
                <div className="text-center">
                    <Link aria-label="Go to Login Page" to="/auth/login"
                        className="d-flex align-items-center justify-content-center">
                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                        Back to login
                    </Link>
                    <ReCaptchaComponent
                        siteKey="6LfaA50qAAAAAGbL3FubZuwBEaLuDMAfEPjN48lX"
                        verifyUrl="http://localhost:5172/recaptcha/verify-captcha"
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            </AuthWrapper>

            {/*<Overview mt={112} me={56}>*/}
            {/*    <div>*/}
            {/*    <h2>Forgot Password</h2>*/}
            {/*        <div style={{ display: "flex", marginBottom: 16, justifyContent: 'center' }}>*/}
            {/*            <Image*/}
            {/*                className="d-block"*/}
            {/*                src={jp}*/}
            {/*                alt="Second slide"*/}
            {/*                style={{ objectFit: 'cover', width: 224, height: 224, borderRadius: '5px' }}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <Form noValidate validated={validated} onSubmit={handleSubmit}>*/}
            {/*            <Form.Group className="mb-3" controlId="username">*/}
            {/*                <Form.Label>Email</Form.Label>*/}
            {/*                <Form.Control*/}
            {/*                    type="email"*/}
            {/*                    placeholder="Email"*/}
            {/*                    name="email"*/}
            {/*                    value={formData.email}*/}
            {/*                    onChange={handleChange}*/}
            {/*                    required*/}
            {/*                />*/}
            {/*                <Form.Control.Feedback type="invalid">*/}
            {/*                    Please enter your Email.*/}
            {/*                </Form.Control.Feedback>*/}
            {/*            </Form.Group>*/}

            {/*            <hr/>*/}
            {/*            <Button variant="primary" type="submit" style={{width: '100%'}}*/}
            {/*                    onClick={() => setCheck(true)}>*/}
            {/*                Submit*/}
            {/*            </Button>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</Overview>*/}
        </>
    )
}
export default ForgotPassword
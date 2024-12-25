import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Image, Col, Row, Card } from "react-bootstrap";
import axios from "axios";

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

    const [captchaVerified, setCaptchaVerified] = useState(false); // New state
    const handleSuccess = (data) => {
        // console.log('Captcha verification success:', data);
        // alert('Verification successful, proceed with form submission!');
        setCaptchaVerified(true);
    };

    const handleError = (error) => {
        // console.log('Captcha verification failed:', error);
        // alert('Verification failed, please try again!');
        setCaptchaVerified(false);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!captchaVerified) {
            alert('Please verify the captcha before submitting.');
            return;
        }
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setLoading(true);
            try {
                // console.log(1)
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
                            autoFocus/>
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
                    </div>
                    <div className="row d-flex justify-content-center flex-wrap">
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-center w-100"
                                 style={{minWidth: '120px'}}>
                                <ReCaptchaComponent
                                    siteKey="6LfaA50qAAAAAGbL3FubZuwBEaLuDMAfEPjN48lX"
                                    verifyUrl="http://localhost:5172/recaptcha/verify-captcha"
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
                <div className="text-center">
                    <Link aria-label="Go to Login Page" to="/auth/login"
                          className="d-flex align-items-center justify-content-center">
                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                        Back to login
                    </Link>
                </div>
            </AuthWrapper>
        </>
    )
}
export default ForgotPassword
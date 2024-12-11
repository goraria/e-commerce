import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Image, Col, Row, Card } from "react-bootstrap";
import {
    faApple, faMeta, faGoogle, faTwitter, faXTwitter, faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import SocialFormButton from "../../components/button/SocialFormButton.jsx";

import jp from '../../assets/images/jp.jpeg'
import Overview from "../../layouts/Overview.jsx";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";
import Frame from "../../layouts/Frame.jsx";
import Loading from "../overview/Loading.jsx";

const ResetPassword = () => {
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
    const location = useLocation();
    const [token, setToken] = useState('');
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || formData.password !== formData.retypePassword) {
            event.stopPropagation();
            setError("Passwords do not match.");
            setShowError(true);
            return;
        } else {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:5172/account/reset-password', {
                    token: token,
                    newPassword: formData.password
                });
                setShowSuccess(true);
                navigate('/login');
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Reset password failed');
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
    useEffect(() => {
        // Lấy token từ URL query string
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        setToken(tokenFromUrl);  // Lưu token vào state
    }, [location]);

    if (loading) return <Frame><Loading /></Frame>

    return (
        <>
            <Overview mt={112} me={56}>
                <div>
                    <h2>Forgot Password</h2>
                    <div style={{ display: "flex", marginBottom: 16, justifyContent: 'center' }}>
                        <Image
                            className="d-block"
                            src={jp}
                            alt="Second slide"
                            style={{ objectFit: 'cover', width: 224, height: 224, borderRadius: '5px' }}
                        />
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="retypePassword">
                            <Form.Label>Retype password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="RetypePassword"
                                name="retypePassword"

                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your retype password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ width: '100%' }}
                            onClick={() => setCheck(true)}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Overview>
        </>
    )
}

export default ResetPassword
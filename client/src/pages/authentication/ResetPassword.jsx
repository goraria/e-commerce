import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { AuthWrapper } from "./AuthWrapper.jsx";

const ResetPassword = () => {
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);  // trạng thái cho NotifySuccess
    const [showError, setShowError] = useState(false);  // trạng thái cho NotifyError
    const [loading, setLoading] = useState(false);  // Thêm trạng thái loadings
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (formData.password !== formData.retypePassword) {
            event.stopPropagation();
            setError("Password do not match.");
            setShowError(true);
            return;
        } else if (form.checkValidity() === false) {
            event.stopPropagation();
            setError("Make sure your new password is more than 8 characters.");
            setShowError(true);
            return;
        }
        else {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:5172/authentication/reset-password', {
                    token: token,
                    newPassword: formData.password
                });
                setShowSuccess(true);
                // navigate('/auth/login');

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

    if (loading) return <Loading/>

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Reset Password? 🔒</h4>
                <p className="mb-4">Enter your new password and we&#39;ll instructions to reset your password</p>
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <div className="input-group">
                            <input
                                required
                                name="password"
                                type="password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                minLength={8}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="retypePassword" className="form-label">Verify Password</label>
                        <div className="input-group">
                            <input
                                required
                                type="password"
                                name="retypePassword"
                                minLength={8}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3"> {/* mt-5 */}
                        <button
                            aria-label='Click me'
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                            onClick={() => setCheck(true)}
                        >
                            Reset Password
                        </button>
                        {/* <Button variant="primary" type="submit" style={{ width: '100%' }}
                            onClick={() => setCheck(true)}>
                            Submit
                        </Button> */}
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
            {/* <Overview mt={112} me={56}>
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
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    </Form>
                </div>
            </Overview> */}
            <NotifySuccess
                title="Reset password Successful"
                message="You have reset password successfully."
                show={showSuccess}  // truyền showSuccess vào NotifySuccess
                onHide={() => {
                    setShowSuccess(false)
                    navigate('/auth/login');
                }}  // đóng khi người dùng click
            />

            <NotifyError
                title="Reset password Failed"
                message={error}
                show={showError}  // truyền showError vào NotifyError
                onHide={() => setShowError(false)}  // đóng khi người dùng click
            />
        </>
    )
}

export default ResetPassword
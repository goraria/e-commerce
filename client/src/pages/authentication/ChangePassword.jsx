import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Image, Col, Row, Card } from "react-bootstrap";
import axios from "axios";

import SaveChange from "../../components/modal/notify/SaveChange.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";
import { Loading } from "../overview/Loading.jsx";
import { AuthWrapper } from "./AuthWrapper.jsx";

const ChangePassword = () => {
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        retypePassword: '',
        username: ''
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

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:5172/account/get-info', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = response.data;
            setFormData({
                username: data.username
            });
        } catch (error) {
            setError('Error fetching user data');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (formData.newPassword !== formData.retypePassword) {
            event.stopPropagation();
            setError("Password do not match.");
            setShowError(true);
            return;
        } else if (form.checkValidity() === false) {
            event.stopPropagation();
            setError("Make sure your password is more than 8 characters.");
            setShowError(true);
            return;
        } else if (!formData.oldPassword || !formData.newPassword || !formData.retypePassword) {
            event.stopPropagation();
            setError("Please fill in all the fields.");
            setShowError(true);
            return;
        } else {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:5172/authentication/change-password', {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                    retypePassword: formData.retypePassword,
                    username: formData.username,
                });
                setShowSuccess(true);
                // navigate('/auth/login');
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Change password failed');
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
        fetchData()
    }, []);

    if (loading) return <Loading />

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Change Password? 🔒</h4>
                <p className="mb-4">Enter your new password and we&#39;ll instructions to change your password</p>
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <div className="input-group">
                            <input
                                required
                                name="oldPassword"
                                type="password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                minLength={8}
                                value={formData.oldPassword || ''}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <div className="input-group">
                            <input
                                required
                                type="password"
                                name="newPassword"
                                minLength={8}
                                onChange={handleChange}
                                // setFormData=formData.newPassword
                                value={formData.newPassword || ''}
                                aria-describedby="inputGroupPrepend"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="retypePassword" className="form-label">Retype Password</label>
                        <div className="input-group">
                            <input
                                required
                                type="password"
                                name="retypePassword"
                                minLength={8}
                                onChange={handleChange}
                                value={formData.retypePassword || ''}
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
                            Change Password
                        </button>
                    </div>
                </Form>
                <div className="text-center">
                    <Link aria-label="Go to Login Page" to="/user"
                        className="d-flex align-items-center justify-content-center">
                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                        Back to login
                    </Link>
                </div>
            </AuthWrapper>
            <NotifySuccess
                title="Change password Successful"
                message="You have Change password successfully."
                show={showSuccess}  // truyền showSuccess vào NotifySuccess
                onHide={() => {
                    setShowSuccess(false)
                    // console.log(1)
                    setTimeout(() => {
                        navigate('/user'); // Điều hướng sau một khoảng thời gian
                    }, 500)
                }}  // đóng khi người dùng click
            />

            <NotifyError
                title="Change password Failed"
                message={error}
                show={showError}  // truyền showError vào NotifyError
                onHide={() => setShowError(false)}  // đóng khi người dùng click
            />
        </>
    )
}

export default ChangePassword
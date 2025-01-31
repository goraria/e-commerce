import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import NotifyError from "../../components/modal/notify/NotifyError.jsx";
import { Loading } from "../overview/Loading.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AuthWrapper } from "./AuthWrapper.jsx";
import ReCaptchaComponent from "../../components/recapcha/Recapcha.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const Login = ({ checker }) => {
    // const [modalShow, setModalShow] = useState(false);
    const [check, setCheck] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

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
                // const role = decoded.role || null;

                handleNavigate(decoded.role); // Chuyển hướng nếu token hợp lệ
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

        if (!captchaVerified) {
            alert('Please verify the captcha before submitting.');
            return;
        }

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5172/authentication/login", {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                const decoded = jwtDecode(token);
                // const role = decoded.role || null;

                setShowSuccess(true);
                await checker(); // Cập nhật trạng thái trong App
                handleNavigate(decoded.role);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
            setShowError(true);
        } finally {
            setLoading(false);
        }

        setValidated(true);
    };

    const handleGoogleLogin = async (response) => {
        setLoading(true);
        try {
            const merge = jwtDecode(response.credential);

            const fetch = await axios.post("http://localhost:5172/authentication/login-google", {
                merge,
                token: response.credential,
            });

            if (fetch.data.token) {
                const token = fetch.data.token;
                localStorage.setItem("token", token);

                const decoded = jwtDecode(token);
                // role = decoded.role || null;

                setShowSuccess(true);
                await checker(); // Cập nhật trạng thái trong App
                handleNavigate(decoded.role);
            } else {
                setError("Google Login failed.");
            }
        } catch (err) {
            setError("An error occurred during Google Login.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogout = () => {

    }

    useEffect(() => {
        handleCheck();
    }, []);

    if (loading) return <Loading/>

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Welcome to Cipher! 👋</h4>
                <p className="mb-4">Please sign-in to your account and start the adventure</p>
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <div className="row d-flex justify-content-center flex-wrap mb-3">
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
                    <div className="mb-3">
                        <button
                            aria-label='Click me'
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                            onClick={() => setCheck(true)}
                        >
                            Log in
                        </button>
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
                        <div className="d-flex justify-content-center w-100"
                             style={{minWidth: '120px'}}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => setShowError(true)}
                                style={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
            </AuthWrapper>

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
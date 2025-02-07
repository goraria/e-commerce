import React, {Component, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import axios from "axios";
import { AuthWrapper } from "./AuthWrapper.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ReCaptchaComponent } from "../../components/recaptcha/Recaptcha.jsx";
import { NotifyModal } from "../../components/modal/notice/NotifyModal.jsx";

const sclItems = [
    // { id: 0, name: "Github", icon: faGithub, color: "secondary" },
    { id: 1, name: "Apple", color: "dark" },
    { id: 2, name: "Google", color: "success" },
    { id: 3, name: "Meta", color: "primary" },
    // { id: 4, name: "Twitter", icon: faTwitter },
]

export default function RegisterPage({ checker }) {
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

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (!captchaVerified) {
            alert('Please verify the captcha before submitting.');
            return;
        }

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            if (formData.password === formData.retypepass) {
                try {
                    const response = await axios.post('http://localhost:5172/authentication/register', formData);

                    if (response.status === 201) {
                        setShowSuccess(true)
                        // navigate('/login');  // Redirect to login after successful registration
                        // setTimeout(() => navigate('/login'), 2000);
                    }
                } catch (error) {
                    // console.log(error)
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
            setError(response.data.error);
            // console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AuthWrapper>
                <h4 className="mb-2">Adventure starts here 🚀</h4>
                <p className="mb-4">Make your app management easy and fun!</p>

                {/*<Form noValidate validated={validated} onSubmit={handleSubmit}>*/}
                {/*    <Row className="mb-3">*/}
                {/*        <Form.Group as={Col} md={7} controlId="email">*/}
                {/*            <Form.Label>Email address</Form.Label>*/}
                {/*            <InputGroup hasValidation>*/}
                {/*                <InputGroup.Text id="inputGroupPrepend">*/}
                {/*                    <i className='bx bx-at'></i>*/}
                {/*                </InputGroup.Text>*/}
                {/*                <Form.Control*/}
                {/*                    required*/}
                {/*                    type="email"*/}
                {/*                    name="email"*/}
                {/*                    placeholder="email@email.com"*/}
                {/*                    value={formData.email}*/}
                {/*                    onChange={handleChange}*/}
                {/*                />*/}
                {/*                <Form.Control.Feedback type="invalid">*/}
                {/*                    Please choose a email.*/}
                {/*                </Form.Control.Feedback>*/}
                {/*                /!*<Form.Control.Feedback>*!/*/}
                {/*                /!*    Looks good!*!/*/}
                {/*                /!*</Form.Control.Feedback>*!/*/}
                {/*            </InputGroup>*/}
                {/*        </Form.Group>*/}
                {/*        <Form.Group as={Col} md={5} controlId="username">*/}
                {/*            <Form.Label>Username</Form.Label>*/}
                {/*            <InputGroup hasValidation>*/}
                {/*                <InputGroup.Text id="inputGroupPrepend">*/}
                {/*                    <i className='bx bx-user'></i>*/}
                {/*                </InputGroup.Text>*/}
                {/*                <Form.Control*/}
                {/*                    type="text"*/}
                {/*                    name="username"*/}
                {/*                    placeholder="username"*/}
                {/*                    value={formData.username}*/}
                {/*                    onChange={handleChange}*/}
                {/*                    aria-describedby="inputGroupPrepend"*/}
                {/*                    required*/}
                {/*                />*/}
                {/*                <Form.Control.Feedback type="invalid">*/}
                {/*                    Please choose a username.*/}
                {/*                </Form.Control.Feedback>*/}
                {/*                /!*<Form.Control.Feedback>*!/*/}
                {/*                /!*    Looks good!*!/*/}
                {/*                /!*</Form.Control.Feedback>*!/*/}
                {/*            </InputGroup>*/}
                {/*        </Form.Group>*/}
                {/*    </Row>*/}
                {/*    <Row className="mb-3">*/}
                {/*        <Form.Group as={Col} md={6} controlId="password">*/}
                {/*            <Form.Label>Password</Form.Label>*/}
                {/*            <InputGroup hasValidation>*/}
                {/*                <Form.Control*/}
                {/*                    required*/}
                {/*                    name="password"*/}
                {/*                    type="password"*/}
                {/*                    placeholder="Password"*/}
                {/*                    minLength={8}*/}
                {/*                    value={formData.password}*/}
                {/*                    onChange={handleChange}*/}
                {/*                />*/}
                {/*                <Form.Control.Feedback type="invalid">*/}
                {/*                    Please enter your password.*/}
                {/*                </Form.Control.Feedback>*/}
                {/*                /!*<Form.Control.Feedback>*!/*/}
                {/*                /!*    Looks good!*!/*/}
                {/*                /!*</Form.Control.Feedback>*!/*/}
                {/*            </InputGroup>*/}
                {/*        </Form.Group>*/}
                {/*        <Form.Group as={Col} md={6} controlId="retypepass">*/}
                {/*            <Form.Label>Verify Password</Form.Label>*/}
                {/*            <InputGroup hasValidation>*/}
                {/*                <Form.Control*/}
                {/*                    type="password"*/}
                {/*                    name="retypepass"*/}
                {/*                    placeholder="Re-type password"*/}
                {/*                    minLength={8}*/}
                {/*                    value={formData.retypepass}*/}
                {/*                    onChange={handleChange}*/}
                {/*                    aria-describedby="inputGroupPrepend"*/}
                {/*                    required*/}
                {/*                />*/}
                {/*                <Form.Control.Feedback type="invalid">*/}
                {/*                    Please retype your password.*/}
                {/*                </Form.Control.Feedback>*/}
                {/*                /!*<Form.Control.Feedback>*!/*/}
                {/*                /!*    Looks good!*!/*/}
                {/*                /!*</Form.Control.Feedback>*!/*/}
                {/*            </InputGroup>*/}
                {/*        </Form.Group>*/}
                {/*    </Row>*/}
                {/*    <Row className="mb-3">*/}
                {/*        <Form.Group as={Col} md={4} controlId="firstname">*/}
                {/*            <Form.Label>First name</Form.Label>*/}
                {/*            <Form.Control*/}
                {/*                required*/}
                {/*                type="text"*/}
                {/*                name="firstname"*/}
                {/*                placeholder="First name"*/}
                {/*                value={formData.firstname}*/}
                {/*                onChange={handleChange}*/}
                {/*            />*/}
                {/*            <Form.Control.Feedback type="invalid">*/}
                {/*                Please enter your Firstname.*/}
                {/*            </Form.Control.Feedback>*/}
                {/*            /!*<Form.Control.Feedback>*!/*/}
                {/*            /!*    Looks good!*!/*/}
                {/*            /!*</Form.Control.Feedback>*!/*/}
                {/*        </Form.Group>*/}
                {/*        <Form.Group as={Col} md={4} controlId="lastname">*/}
                {/*            <Form.Label>Last name</Form.Label>*/}
                {/*            <Form.Control*/}
                {/*                required*/}
                {/*                type="text"*/}
                {/*                name="lastname"*/}
                {/*                placeholder="Last name"*/}
                {/*                value={formData.lastname}*/}
                {/*                onChange={handleChange}*/}
                {/*            />*/}
                {/*            <Form.Control.Feedback type="invalid">*/}
                {/*                Please enter your Lastname.*/}
                {/*            </Form.Control.Feedback>*/}
                {/*            /!*<Form.Control.Feedback>*!/*/}
                {/*            /!*    Looks good!*!/*/}
                {/*            /!*</Form.Control.Feedback>*!/*/}
                {/*        </Form.Group>*/}
                {/*        <Form.Group as={Col} md={4} controlId="phone">*/}
                {/*            <Form.Label>Phone</Form.Label>*/}
                {/*            /!*<Form.Control type="list-number" placeholder="Phone" required />*!/*/}
                {/*            <InputGroup hasValidation>*/}
                {/*                <InputGroup.Text id="inputGroupPrepend">*/}
                {/*                    <i className='bx bx-phone'></i>*/}
                {/*                </InputGroup.Text>*/}
                {/*                <Form.Control*/}
                {/*                    type="text"*/}
                {/*                    name="phone"*/}
                {/*                    placeholder="Phone"*/}
                {/*                    value={formData.phone}*/}
                {/*                    onChange={handleChange}*/}
                {/*                    minLength={10}*/}
                {/*                    maxLength={10}*/}
                {/*                    aria-describedby="inputGroupPrepend"*/}
                {/*                    required*/}
                {/*                />*/}
                {/*                <Form.Control.Feedback type="invalid">*/}
                {/*                    Please provide a valid state.*/}
                {/*                    Please enter your phone number.*/}
                {/*                </Form.Control.Feedback>*/}
                {/*                /!*<Form.Control.Feedback>*!/*/}
                {/*                /!*    Looks good!*!/*/}
                {/*                /!*</Form.Control.Feedback>*!/*/}
                {/*            </InputGroup>*/}
                {/*        </Form.Group>*/}
                {/*    </Row>*/}
                {/*    /!*<hr/>*!/*/}
                {/*    <Row className="mb-3">*/}
                {/*        <Col xs={6}>*/}
                {/*            <Form.Group controlId="formBasicCheckbox">*/}
                {/*                <Form.Check*/}
                {/*                    required*/}
                {/*                    type="checkbox"*/}
                {/*                    label="Agree to terms and conditions"*/}
                {/*                    feedback="You must agree before submitting."*/}
                {/*                    feedbackType="invalid"*/}
                {/*                />*/}
                {/*            </Form.Group>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Form>*/}
                <Form id="formAuthentication" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className='bx bx-at'></i>
                            </span>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                aria-label="Username"
                                aria-describedby="basic-addon11"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className='bx bx-user'></i>
                            </span>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                required
                                className="form-control"
                                aria-label="Username"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                required
                                name="password"
                                type="password"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                minLength={8}
                                value={formData.password}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Verify Password</label>
                        <div className="input-group">
                            <input
                                required
                                type="password"
                                name="retypepass"
                                minLength={8}
                                value={formData.retypepass}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                className="form-control"
                                aria-label="Password"
                            />
                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">Firstname</label>
                        <div className="input-group">
                            <input
                                required
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Firstname"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Lastname</label>
                        <div className="input-group">
                            <input
                                required
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Lastname"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className='bx bx-phone'></i>
                            </span>
                            <input
                                required
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                minLength={10}
                                maxLength={10}
                                aria-describedby="inputGroupPrepend"
                                className="form-control"
                                aria-label="Phone"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                required
                                type="checkbox"
                                className="form-check-input"
                                id="terms-conditions"
                                name="terms"
                                value={formData.terms}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="terms-conditions">
                                I agree to
                                <a aria-label="pricacy policy and terms" href="#"> privacy policy & terms</a>
                            </label>
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
                        <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">
                            Register
                        </button>
                    </div>
                </Form>

                <p className="text-center">
                    <span>Already have an account? </span>
                    <Link aria-label="Go to Login Page" to='/auth/login' className="registration-link">
                        <span>Sign in instead</span>
                    </Link>
                </p>

                <p className="text-center">
                    <span>Already have an account?</span>
                    <Link aria-label="Go to Login Page" to="/auth/login"
                          className="d-flex align-items-center justify-content-center">
                        <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                        Back to login
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
                                onError={() => false}
                                style={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
            </AuthWrapper>

            <NotifyModal
                type="success"
                title="'Registration successful'"
                message="You have register in successfully."
                show={showSuccess}  // truyền showSuccess vào NotifySuccess
                onHide={() => {
                    setShowSuccess(false)
                    navigate('/auth/login');
                }}  // đóng khi người dùng click
            />
            <NotifyModal
                type="danger"
                title="Registration Failed"
                message={error}
                show={showError}  // truyền showError vào NotifyError
                onHide={() => setShowError(false)}  // đóng khi người dùng click
            />
        </>
    )
}
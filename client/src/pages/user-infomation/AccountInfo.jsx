import React, { Component, useEffect, useState } from "react";
import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";

const AccountInfo = ({ onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
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
                    username: data.username,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    phone: data.phone
                });
            } catch (error) {
                setError('Error fetching user data');
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // const openModal = (event) => {
    //     event.preventDefault();
    //     setValidated(true);
    //     setShowModal(true); // Mở modal khi nhấn nút Save
    // };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5172/account/set-info`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                // alert('User information updated successfully');
                setShowModal(false); // Đóng modal sau khi lưu thành công
                onReload(); // Gọi hàm reload từ component cha
            }
        } catch (error) {
            // alert('Failed to update user information');
            setError(error.response ? error.response.data.message : 'Update failed');
        }
    };

    const handleInvalid = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                setShowModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:5172/account/set-info`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    // alert('User information updated successfully');
                    // navigate('/');
                    onReload();
                }
            } catch (error) {
                // alert('Failed to update user information');
                setError(error.response ? error.response.data.message : 'Update failed');
            }
        }
        setValidated(true);
    };

    return (
        <>
            <div className="container p-0">
                {/*<h2>Account Information</h2>*/}
                <Form noValidate validated={validated} onSubmit={handleInvalid}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={7} controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className='bx bx-at'></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="mail@mail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={5} controlId="username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className='bx bx-user'></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
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
                                Please provide a first name.
                            </Form.Control.Feedback>
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
                                Please provide a last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={4} controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <i className='bxs bx-phone'></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    minLength={10}
                                    maxLength={10}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone number.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={12} md={5} lg={4}>
                            <Button variant="primary" type="reset" className="">
                                Change Password
                            </Button>
                        </Col>
                        <Col sm={0} md={2} lg={4}></Col>
                        <Col sm={12} md={5} lg={4}>
                            <Button variant="primary" type="submit" className="">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {/*{error && <p className="text-danger">{error}</p>}*/}
            </div>
            <SaveChange show={showModal} onHide={() => setShowModal(false)} onSave={handleSaveChanges} />
        </>
    );
}

// class AccountInfo extends Component {
// // function AccountInfo() {
//     constructor(parameters) {
//         super(parameters);
//         this.state = {
//             validated: false,
//         };
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleSubmit(event) {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         this.setState({ validated: true });
//     }
//
//     render() {
//
//     }
// }

export default AccountInfo;
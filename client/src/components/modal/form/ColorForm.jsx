import axios from "axios";
import SaveChange from "../notify/SaveChange.jsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

export const ColorForm = ({ color, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        color: '',
        product_name: '',
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (color) {
            setFormData({
                color: color.color || '',
                product_name: color.product_name || '',
            });
        } else {
            setFormData({
                color: '',
                product_name: '',
            });
        }
    }, [color]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
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
                setShowConfirmModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleConfirmSave = async () => {
        try {
            // const token = localStorage.getItem('token');
            // console.log(formData);
            const response = color
                ? await axios.post(`http://localhost:5172/admin/update-color/${color.idcolor}`, formData)
                : await axios.put('http://localhost:5172/admin/create-color', formData);


            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'Address updated successfully' : 'Address added successfully');
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5172/admin/delete/${color.idaddress}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error) {
            console.error("Error deleting address:", error);
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };

    return (
        <>
            <Modal
                // {...address}
                show={show}
                onHide={onHide} //
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>Edit Color</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Note</h4> */}
                    {/* <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p> */}
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <Row className="mb-3">
                            <Form.Group as={Col} md={7} controlId="product_name">
                                <Form.Label>Product Name</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="product_name">
                                        <i className='bx bx-user' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Product Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="color">
                                <Form.Label>Color</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="color">
                                        <i className='bx bx-user' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter color.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/* <Form.Group as={Col} md={4} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="email">
                                        <i className='bx bx-user' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group> */}
                        </Row>
                        {/* <Row className="mb-3">
                            <Form.Group as={Col} md={5} controlId="phonenumber">
                                <Form.Label>Phone Number</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="phonenumber">
                                        <i className='bx bxs-phone' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="tel"
                                        name="phonenumber"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your phone number.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="email">
                                        <i className='bx bx-envelope' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group> */}
                        {/* <Form.Group as={Col} md={4} controlId="state">
                                <Form.Label>State</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="state">
                                        <i className='bx bxs-flag-alt' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your state.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md={4} controlId="country">
                                <Form.Label>Country</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="country">
                                        <i className='bx bx-globe' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your country.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group> */}
                        {/* </Row> */}
                        <hr />
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" className="me-auto">
                        <i className='bx bx-x' ></i>
                        <span>Close</span>
                    </Button>
                    {/*<Button type="submit" variant="info"*/}
                    {/*        onClick={handleSubmit}> /!*onClick={handleSubmit, openConfirmModal}*!/*/}
                    {/*    <i className='bx bx-check me-2' ></i>*/}
                    {/*    <span>Save changes</span>*/}
                    {/*</Button>*/}
                    {color ?
                        <>
                            {/* <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <i className='bx bx-trash' ></i>
                                <span>Delete Address</span>
                            </Button> */}
                            <Button onClick={handleInvalid} variant="info">
                                <i className='bx bx-check' ></i>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <i className='bx bx-plus' ></i>
                                <span>Create Address</span>
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <SaveChange
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onSave={() => { handleConfirmSave(); setShowConfirmModal(false) }}
            />
            <SaveChange
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onSave={handleDelete}
            />
        </>
    )
}
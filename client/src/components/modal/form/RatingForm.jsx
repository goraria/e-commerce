import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";
import SaveChange from "../notify/SaveChange.jsx";

export const RatingForm = ({ rate, prod, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        score: 0,
        comment: '',
        product_name: ''
    });

    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const token = localStorage.getItem('token');

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

    const handleStarClick = (index) => {
        setFormData(prevData => ({ ...prevData, score: index + 1 }));
    };

    const handleLoadRating = async () => {
        try {
            const response = await axios.post('http://localhost:5172/products/load-rating', prod, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data);

            if (response.status === 200 || response.status === 201) {
                setShowConfirmModal(false);
                onHide();
                onReload();
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    }

    const handleConfirmSave = async () => {
        try {
            const response = rate
                ? await axios.put(`http://localhost:5172/products/change-rating/${rate.idcolor}`, formData)
                : await axios.post('http://localhost:5172/products/create-rating', formData);

            if (response.status === 200 || response.status === 201) {
                setShowConfirmModal(false);
                onHide();
                onReload();
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5172/products/remove-rating/${rate.idrating}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setShowConfirmDelete(false);
            onHide();
            onReload();
        } catch (error) {
            console.error("Error deleting address:", error);
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
    };

    useEffect(() => {
        if (rate) {
            setFormData({
                score: rate.score || 0,
                comment: rate.comment || '',
                product_name: rate.product_name || ''
            });
        }

        if (!show) {
            setFormData({
                score: 0,
                comment: '',
                product_name: ''
            });

            setValidated(false);
            setError(null);
        }

        handleLoadRating()
    }, []);

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>Evaluate</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleInvalid}>
                        <div className="row mb-3">
                            <div className="d-flex align-items-start align-items-sm-center gap-4 rounded-2 col-lg-8 col-md-12 col-sm-12 mb-3">
                                <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                    <img
                                        src={`${prod.product_image}`}
                                        alt="product"
                                        className="d-block rounded"
                                        height="100"
                                        width="100"
                                        aria-label="Product image"
                                    />
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="fw-medium text-nowrap text-heading">
                                        {`${prod.brand} ${prod.product_name}`}
                                    </span>
                                    <small>Professional</small>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <Form.Label>Score</Form.Label>
                                <div className="d-flex">
                                    {[...Array(5)].map((_, index) => (
                                        <i
                                            key={index}
                                            className={`bx bxs-star bx-sm ${formData.score > index ? 'text-warning' : ''} cursor-pointer me-2`}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <Form.Group as={Col} controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>
                                        <i className='bx bx-comment'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your comment.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>

                        <hr/>
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" className="me-auto">
                        <i className='bx bx-x me-2'></i>
                        <span>Close</span>
                    </Button>
                    {rate ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <i className='bx bx-trash me-2'></i>
                                <span>Remove Evaluate</span>
                            </Button>
                            <Button onClick={handleInvalid} variant="info">
                                <i className='bx bx-check me-2'></i>
                                <span>Change Evaluate</span>
                            </Button>
                        </>
                        :
                        <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <i className='bx bx-plus me-2'></i>
                                <span>Evaluate</span>
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
    );
};

export const RatingForm0 = ({ rate, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        score: 0,
        comment: '',
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (rate) {
            setFormData({
                color: rate.score || '',
                product_name: rate.comment || '',
            });
        } else {
            setFormData({
                score: '',
                comment: '',
            });
        }
    }, [rate]);

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
            const response = rate
                ? await axios.post(`http://localhost:5172/admin/update-color/${rate.idcolor}`, formData)
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
            await axios.delete(`http://localhost:5172/admin/delete/${rate.idrating}`, {
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
                        <h5>Evaluate</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Note</h4> */}
                    {/* <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p> */}
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <div className="row mb-3">
                            <Form.Group as={Col} md={7} controlId="score">
                                <Form.Label>Score</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="score">
                                        <i className='bx bx-user' ></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="score"
                                        value={formData.score}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Product Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="color">
                                <Form.Label>Comment</Form.Label>
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
                        </div>
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
                    {rate ?
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
                                <span>Evaluate</span>
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
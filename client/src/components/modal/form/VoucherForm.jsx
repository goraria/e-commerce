import axios, { formToJSON } from "axios";
import SaveChange from "../notify/SaveChange.jsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

export const VoucherForm = ({ voucher, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        iddiscount: '',
        discount_name: '',
        percentage_discount: '',
        start_date: '',
        end_date: '',
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    useEffect(() => {
        setError(null);
        if (voucher) {
            setFormData({
                iddiscount: voucher.iddiscount || '',
                discount_name: voucher.discount_name || '',
                percentage_discount: voucher.percentage_discount || '',
                start_date: voucher.start_date || '',
                end_date: voucher.end_date || ''
            });
        } else {
            setFormData({
                iddiscount: '',
                discount_name: '',
                percentage_discount: '',
                start_date: '',
                end_date: '',
            });
        }
    }, [voucher]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const convertFormDataToString = (data) => {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, String(value || "")])
        );
    };
    const handleInvalid = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        // const datastring = convertFormDataToString(formData)
        // console.log(formData)
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                x
                setShowConfirmModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleConfirmSave = async () => {
        try {
            const response = voucher
                ? await axios.put(`http://localhost:5172/admin/update-voucher/${voucher.iddiscount}`, formData)
                : await axios.post('http://localhost:5172/admin/create-voucher', formData);
            if (response.status === 200 || response.status === 201) {
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save voucher');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5172/admin/delete-voucher/${voucher.iddiscount}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error) {
            console.error("Error deleting voucher:", error);
            setError(error.response ? error.response.data.message : 'Failed to save voucher');
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
                        <h3>Edit Voucher</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <Row className="mb-3">
                            <Form.Group as={Col} className="col-5 mb-3" controlId="discount_name">
                                <Form.Label>Discount Name</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="discount_name">
                                        <i className='bx bx-layer'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="discount_name"
                                        placeholder="Discount Name"
                                        value={formData.discount_name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Voucher Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} className="col-5 mb-3" controlId="percentage_discount">
                                <Form.Label>Percentage Discount</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="percentage_discount">
                                        <i className='bx bx-layer'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="percentage_discount"
                                        placeholder="Percentage Discount"
                                        value={formData.percentage_discount}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Percentage Discount.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/*<div className="input-group mb-3">*/}
                            {/*    <input type="file" className="form-control" id="inputImage"/>*/}
                            {/*</div>*/}

                        </Row>
                        <hr />
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" className="me-auto">
                        <i className='bx bx-x me-2'></i>
                        <span>Close</span>
                    </Button>
                    {voucher ?
                        <>
                            <Button onClick={handleInvalid} variant="info">
                                <i className='bx bx-check me-2'></i>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <i className='bx bx-plus me-2'></i>
                                <span>Create Category</span>
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <SaveChange
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onSave={() => {
                    handleConfirmSave();
                    setShowConfirmModal(false)
                }}
            />
            <SaveChange
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onSave={handleDelete}
            />
        </>
    )
}
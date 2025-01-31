import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";

import SaveChange from "../notice/SaveChange.tsx";
import Notify from "../notice/Notify.tsx";

import { AddressDefaultType, AddressFormProps } from "../../../types/AddressDefaultType.ts";
import { AddressDefaultValue } from "../../../constants/AddressDefaultValue.ts";

export default function AddressForm({ address, show, onHide, onReload }: AddressFormProps) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState<AddressDefaultType>(AddressDefaultValue);
    const [error, setError] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormData(prevData => ({ ...prevData, [name]: value }));
    // };

    const handleInvalid = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.currentTarget.checkValidity()) {
            setShowConfirmModal(true); // Hiển thị modal xác nhận nếu form hợp lệ
        } else {
            setValidated(true);
        }
    };

    const handleConfirmSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = address
                ? await axios.put(`http://localhost:5172/address/update/${address.idaddress}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                : await axios.post('http://localhost:5172/address/addition', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });

            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'AddressDefaultType updated successfully' : 'AddressDefaultType added successfully');
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError("Failed to save address");
            }
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5172/address/delete/${address.idaddress}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError("Failed to delete address");
            }
        }
    };

    useEffect(() => {
        if (address) {
            setFormData({
                idaddress: address.idaddress || 0,
                type: address.type || '',
                tower: address.tower || '',
                street: address.street || '',
                district: address.district || '',
                city: address.city || '',
                state: address.state || '',
                country: address.country || ''
            });
        }

        if (!show) {
            // Reset form data và trạng thái khi modal đóng
            setFormData(AddressDefaultValue);

            setValidated(false);
            setError('');
        }
    }, [address, show]);

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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>Address Details</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<h4>Note</h4>*/}
                    <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p>
                    <Form noValidate
                          validated={validated}
                          onSubmit={handleInvalid}
                    > {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address Type</label>
                            <select
                                className="form-select"
                                id="address"
                                name="type"
                                defaultValue=""
                                value={formData.type}
                                onChange={handleSelectChange}
                                required
                            >
                                <option value="">Choose type of address</option>
                                <option value="Home">Home</option>
                                <option value="Company">Company</option>
                            </select>
                            <Form.Control.Feedback type="invalid">
                                Please select a type of address.
                            </Form.Control.Feedback>
                        </div>
                        <div className="row mb-3">
                            <Form.Group as={Col} md={4} controlId="tower">
                                <Form.Label>Tower</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="tower">
                                        <i className='bx bx-buildings'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="tower"
                                        value={formData.tower}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your building.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="street">
                                <Form.Label>Street</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="street">
                                        <i className='bx bx-map-alt'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your road.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={4} controlId="district">
                                <Form.Label>District</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="district">
                                        <i className='bx bxs-directions'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your district.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className="row mb-3">
                            <Form.Group as={Col} md={4} controlId="city">
                                <Form.Label>City</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="city">
                                        <i className='bx bxs-city'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your city.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md={4} controlId="state">
                                <Form.Label>State</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="state">
                                        <i className='bx bxs-flag-alt'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
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
                                        <i className='bx bx-globe'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your country.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <hr/>
                        {/*{error && <p className="text-danger">{error}</p>}*/}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" className="me-auto">
                        <i className='bx bx-x me-2'></i>
                        <span>Close</span>
                    </Button>
                    {address ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <i className='bx bx-trash me-2'></i>
                                <span>Delete Address</span>
                            </Button>
                            <Button
                                variant="info"
                                // onClick={handleInvalid}
                            >
                                <i className='bx bx-check me-2'></i>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button
                                type="submit"
                                variant="success"
                                // onClick={handleInvalid}
                            >
                                <i className='bx bx-plus me-2'></i>
                                <span>Create Address</span>
                            </Button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
            <SaveChange
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onSave={async () => {
                    await handleConfirmSave();
                    setShowConfirmModal(false)
                }}
            />
            <SaveChange
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)}
                onSave={handleDelete}
            />
            <Notify
                title="Error"
                message={error}
                type="danger"
                show={showError}
                onHide={() => setShowError(false)}
            />
        </>
    );
}
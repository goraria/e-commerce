import axios, { formToJSON } from "axios";
import SaveChange from "../notify/SaveChange.jsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

export const CategoryForm = ({ category, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        idcategory: '',
        category_name: '',
        category_description: '',
        category_image: ''
    });
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        setError(null);
        if (category) {
            setFormData({
                idcategory: category.idcategory || '',
                category_name: category.category_name || '',
                category_description: category.category_description || '',
                category_image: category.category_image || ''
            });
        // } else {
        //     setFormData({
        //         idcategory: '',
        //         category_name: '',
        //         category_description: '',
        //         category_image: ''
        //     });
        }

        if (!show) {
            setFormData({
                idcategory: '',
                category_name: '',
                category_description: '',
                category_image: ''
            });
            setValidated(false);
            setError(null);
        }
    }, [show]);

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
            const allFieldsFilled = Object.values(formData.category_name).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                setShowConfirmModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleConfirmSave = async () => {
        try {
            const response = category
                ? await axios.put(`http://localhost:5172/category/update-category/${category.idcategory}`, formData)
                : await axios.post('http://localhost:5172/category/create-category', formData);
            if (response.status === 200 || response.status === 201) {
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save category');
        }
    };

    // const handleDelete = async (id) => {
    //     try {
    //         // await axios.delete(`http://localhost:5172/admin/delete-category/${id}`);
    //         await axios.delete(`http://localhost:5172/category/delete-category/${id}`);
    //
    //         fetchAPI();
    //     } catch (error) {
    //         console.error("Error deleting category:", error);
    //     }
    // };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5172/category/delete-category/${category.idcategory}`);
            setShowConfirmDelete(false);

            onHide();
            onReload()
        } catch (error) {
            // console.error("Error deleting address:", error);
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
                        <h5>Edit Category</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleInvalid}> {/*onSubmit={handleSubmit, openConfirmModal}*/}
                        <div className="row mb-3">
                            <div className="d-flex align-items-start align-items-sm-center gap-4 rounded-2 col-7 mb-3">
                                <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                    <img
                                        src={`../assets/img/categories/${formData.category_image}`}
                                        alt="category"
                                        className="d-block rounded"
                                        height="100"
                                        width="100"
                                        aria-label="Category image"
                                    />
                                </div>
                                <div className="button-wrapper">
                                    <label htmlFor="upload" className="btn btn-primary me-3 mb-4" tabIndex="0">
                                        <span className="d-none d-sm-block">Upload new photo</span>
                                        <i className="bx bx-sm bx-upload d-block d-sm-none"></i>
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="upload"
                                            className="account-file-input"
                                            hidden
                                            accept="image/png, image/jpeg"
                                        />
                                    </label>
                                    <button aria-label='Click me' type="button"
                                            className="btn btn-outline-secondary account-image-reset mb-4">
                                        <i className="bx bx-reset d-block d-sm-none"></i>
                                        <span className="d-none d-sm-block">Reset</span>
                                    </button>
                                    <p className="text-muted mb-2">Allowed JPG or PNG.</p>
                                </div>
                            </div>
                            <Form.Group as={Col} className="col-5 mb-3" controlId="category_name">
                                <Form.Label>Category Name</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="category_name">
                                        <i className='bx bx-layer'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="category_name"
                                        placeholder="Category Name"
                                        value={formData.category_name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Category Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/*<div className="input-group mb-3">*/}
                            {/*    <input type="file" className="form-control" id="inputImage"/>*/}
                            {/*</div>*/}
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className='bx bx-file'></i>
                                </span>
                                <textarea
                                    className="form-control"
                                    name="category_description"
                                    aria-label="With textarea"
                                    placeholder="Description"
                                    value={formData.category_description}
                                    onChange={handleChange}>
                                </textarea>
                            </div>
                        </div>
                        <hr/>
                        {/*{error && <p className="text-danger">{error}</p>}*/}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary" style={{marginRight: "auto"}}>
                        <i className='bx bx-x me-2' ></i>
                        <span>Close</span>
                    </Button>
                    {category ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <i className='bx bx-trash me-2'></i>
                                <span>Delete Category</span>
                            </Button>
                            <Button onClick={handleInvalid} variant="info">
                                <i className='bx bx-check me-2' ></i>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <i className='bx bx-plus me-2' ></i>
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
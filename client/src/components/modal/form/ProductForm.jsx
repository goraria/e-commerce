import axios from "axios";
import SaveChange from "../notify/SaveChange.jsx";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

export const ProductForm = ({ product, show, onHide, onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        category_name: '',
        product_image: '',
        product_name: '',
        idcategory: ''
    });
    const [category, setCategory] = useState([]);
    const [data1, setData1] = useState([])

    const fetchCategory = async () => {
        const response = await axios.get("http://localhost:5172/category/get-category")
        setCategory(response.data)
    }

    const fetchAPI1 = async () => {
        const response = await axios.get("http://localhost:5172/admin/get-category")
        setData1(response.data)
    };

    const findIdCategoryByName = (name) => {
        const category = data1.find(cat => cat.category_name.toLowerCase() === name.toLowerCase());
        return category ? category.idcategory : null;
    };

    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                brand: product.brand || '',
                category_name: product.category_name || '',
                product_image: product.product_image || '',
                product_name: product.product_name || '',
                idcategory: product.idcategory || ''
            });
        } else {
            setFormData({
                brand: '',
                category_name: '',
                product_image: '',
                product_name: '',
                idcategory: ''
            });
        }

        fetchAPI1();
        fetchCategory()
    }, [product]);

    const convertFormDataToString = (data) => {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, String(value || "")])
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: String(value) }));
    };

    const handleInvalid = async (event) => {
        // console.log(formData)
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const dataAsString = convertFormDataToString(formData);
        const idCategory = findIdCategoryByName(dataAsString.category_name)
        const stringid = String(idCategory)
        dataAsString.idcategory = stringid;
        // console.log(formData)

        if (form.checkValidity() === false) {
            // console.log("0")
            setValidated(true);
        } else {
            const allFieldsFilled = Object.values(dataAsString).every(value => value.trim() !== "");

            if (allFieldsFilled) {
                setShowConfirmModal(true);
            } else {
                setValidated(true);
            }
        }
    };

    const handleConfirmSave = async () => {
        try {
            const dataAsString = convertFormDataToString(formData);
            // const token = localStorage.getItem('token');
            // console.log(formData)
            const response = product
                ? await axios.post(`http://localhost:5172/products/update-productname/${product.idproduct}`, dataAsString)
                : await axios.put('http://localhost:5172/admin/abc', formData)

            if (response.status === 200 || response.status === 201) {
                // alert(address ? 'Address updated successfully' : 'Address added successfully');
                setShowConfirmModal(false)
                onHide();
                onReload()
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to save address');
        }
        // onReload()
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5172/products/delete-productname/${product.idproduct}`);
            setShowConfirmDelete(false);
            onHide();
            onReload()
        } catch (error) {
            // console.error("Error deleting product:", error);
            setError(error.response ? error.response.data.message : 'Failed to save product name');
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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>Edit Product</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Note</h4> */}
                    {/* <p>
                        Enter invalid values of all input groups to help us know your location. Then we can deliver your package.
                    </p> */}
                    <Form noValidate validated={validated} onSubmit={handleInvalid}>
                        <div className="row mb-3">
                            <div className="d-flex align-items-start align-items-sm-center gap-4 rounded-2 col-7 mb-3">
                                <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                    <img
                                        src={`${formData.product_image}`}
                                        alt="product"
                                        className="d-block rounded"
                                        height="100"
                                        width="100"
                                        aria-label="Product image"
                                    />
                                </div>
                                <div className="button-wrapper">
                                    <label htmlFor="upload" className="btn btn-primary me-3 mb-4" tabIndex="0">
                                        <span className="d-none d-sm-block">Upload new photo</span>
                                        <i className="bx bx-sm bx-upload d-block d-sm-none"></i>
                                        <input
                                            type="file"
                                            name="product"
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
                            {/*<Form.Group as={Col} className="col-5 mb-3" controlId="category_name">*/}
                            {/*    <Form.Label>Category</Form.Label>*/}
                            {/*    <InputGroup hasValidation>*/}
                            {/*        <InputGroup.Text id="category_name">*/}
                            {/*            <i className='bx bx-layer'></i>*/}
                            {/*        </InputGroup.Text>*/}
                            {/*        <Form.Control*/}
                            {/*            required*/}
                            {/*            type="text"*/}
                            {/*            name="category_name"*/}
                            {/*            placeholder="Category Name"*/}
                            {/*            value={formData.category_name}*/}
                            {/*            onChange={handleChange}*/}
                            {/*        />*/}
                            {/*        <Form.Control.Feedback type="invalid">*/}
                            {/*            Please enter Category Name.*/}
                            {/*        </Form.Control.Feedback>*/}
                            {/*    </InputGroup>*/}
                            {/*</Form.Group>*/}
                            <div className="col-5 mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    id="category"
                                    name="category_name"
                                    defaultValue=""
                                    value={formData.category_name}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choose category</option>
                                    {
                                        category.map((cat, index) => (
                                            <option key={index} value={cat.category_name}>{cat.category_name}</option>
                                        ))
                                    }
                                </select>
                                <Form.Control.Feedback type="invalid">
                                    Please select a category.
                                </Form.Control.Feedback>
                            </div>

                            <Form.Group as={Col} md={7} controlId="product_name">
                                <Form.Label>Product Name</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="product_name">
                                        <i className='bx bx-package'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter Product Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={5} controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="brand">
                                        <i className='bx bx-shape-polygon'></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter brand.
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
                    {/*<Button type="submit" variant="info"*/}
                    {/*        onClick={handleSubmit}> /!*onClick={handleSubmit, openConfirmModal}*!/*/}
                    {/*    <i className='bx bx-check me-2' ></i>*/}
                    {/*    <span>Save changes</span>*/}
                    {/*</Button>*/}
                    {product ?
                        <>
                            <Button onClick={() => setShowConfirmDelete(true)} variant="danger" className="me-3">
                                <i className='bx bx-trash me-2'></i>
                                <span>Delete Product</span>
                            </Button>
                            <Button onClick={handleInvalid} variant="info">
                                <i className='bx bx-check me-2'></i>
                                <span>Save changes</span>
                            </Button>
                        </> : <>
                            <Button type="submit" variant="success" onClick={handleInvalid}>
                                <i className='bx bx-plus me-2'></i>
                                <span>Create Product</span>
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
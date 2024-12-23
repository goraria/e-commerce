import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountWrapper } from "../../components/wrapper/AccountWrapper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import SaveChange from "../../components/modal/notify/SaveChange.jsx";

export const AccountPage = ({ onReload }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        avatar: ''
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const getInformation = async () => {
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
                phone: data.phone,
                avatar: data.avatar
            });
        } catch (error) {
            setError('Error fetching user data');
        }
    };

    const getAvatar = () => {
        const deactivateAcc = document.querySelector('#formAccountDeactivation');

        // Update/reset user image of account page
        let accountUserImage = document.getElementById('uploadedAvatar');
        const fileInput = document.querySelector('.account-file-input');
        const resetFileInput = document.querySelector('.account-image-reset');

        if (accountUserImage) {
            const resetImage = accountUserImage.src;

            fileInput.onchange = () => {
                if (fileInput.files[0]) {
                    accountUserImage.src = window.URL.createObjectURL(fileInput.files[0]);
                }
            };

            resetFileInput.onclick = () => {
                fileInput.value = '';
                accountUserImage.src = resetImage;
            };
        }
    }

    useEffect(() => {
        getInformation();
        getAvatar();
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

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
    const handleUploadAvatar = async () => {
        const fileInput = document.getElementById('upload');
        const file = fileInput.files[0]; // Lấy file từ input

        if (file) {
            const formData = new FormData();
            formData.append('avatar', file); // Gửi file dưới tên 'avatar'

            try {
                const token = localStorage.getItem('token'); // Token xác thực
                const response = await axios.post('http://localhost:5172/account/upload-avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Quan trọng khi gửi file
                    }
                });

                if (response.status === 200) {
                    // alert('Avatar uploaded successfully!');
                    onReload(); // Gọi lại để cập nhật avatar trên giao diện
                }
            } catch (error) {
                alert('Failed to upload avatar.');
            }
        } else {
            alert('No file selected!');
        }
    };


    return (
        <>
            <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>
                <div className="card-body">
                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                            src={formData.avatar}
                            alt="user-avatar"
                            className="d-block rounded"
                            height="100"
                            width="100"
                            aria-label="Account image"
                            id="uploadedAvatar"
                        />
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
                            <p className="text-muted mb-0">Allowed JPG or PNG.</p>
                        </div>
                    </div>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                    <Form id="formAccountSettings" noValidate validated={validated} onSubmit={handleInvalid}>
                        <div className="row">
                            <div className="mb-3 col-md-7">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className='bx bx-at'></i>
                                    </span>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="mail@mail.com"
                                        className="form-control"
                                        aria-label="Username"
                                        value={formData.email}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3 col-md-5">
                                <label htmlFor="userName" className="form-label">Username</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className='bx bx-user'></i>
                                    </span>
                                    <input
                                        required
                                        readOnly
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        className="form-control"
                                        aria-label="username"
                                        value={formData.username}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="firstname" className="form-label">Firstname</label>
                                <div className="input-group">
                                    <input
                                        required
                                        type="text"
                                        name="firstname"
                                        placeholder="firstname"
                                        className="form-control"
                                        aria-label="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="lastname" className="form-label">Lastname</label>
                                <div className="input-group">
                                    <input
                                        required
                                        type="text"
                                        name="lastname"
                                        placeholder="lastname"
                                        className="form-control"
                                        aria-label="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className='bx bxs-phone'></i>
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        name="phone"
                                        placeholder="phone"
                                        className="form-control"
                                        aria-label="phone"
                                        minLength={10}
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button aria-label='Click me' type="submit" className="btn btn-primary me-3">
                                Save changes
                            </button>
                            <button aria-label='Click me' type="reset"
                                className="btn btn-outline-secondary">Cancel
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="card">
                <h5 className="card-header">Action Account</h5>
                <div className="card-body">
                    <div className="mb-3 col-12 mb-0">
                        <div className="alert alert-warning">
                            <h6 className="alert-heading mb-1">Are you sure you want to delete your account?</h6>
                            <p className="mb-0">Once you delete your account, there is no going back. Please be
                                certain.</p>
                        </div>
                    </div>
                    <form id="formAccountDeactivation" onSubmit={() => false}>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="accountActivation"
                                id="accountActivation" />
                            <label className="form-check-label" htmlFor="accountActivation">
                                I confirm my account deactivation</label>
                        </div>
                        <button aria-label='Click me'
                            className="btn btn-danger me-3 deactivate-account">Deactivate Account
                        </button>
                        <Button aria-label='Click me'
                            variant="warning"
                            as={Link}
                            to="/auth/change-password"
                            className="btn btn-warning me-3">Change Password
                        </Button>
                    </form>
                </div>
            </div>
            <SaveChange show={showModal} onHide={() => setShowModal(false)} onSave={handleSaveChanges} />
        </>
    )
}
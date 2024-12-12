import React, {Component, useEffect, useState} from "react";
import {Alert, Button, Card, Col, Container, Form, Image, InputGroup, Nav, Row} from "react-bootstrap";
import jp from "../../assets/images/jp.jpeg";
import UserSidebar from "../../layouts/UserSidebar";
import AddressList from "./AddressList.jsx";
import AddressItem from "../../components/address/AddressItem.jsx";
import axios from "axios";
import Profile from "../../layouts/Profile.jsx";
import AddressForm from "../../components/modal/form/AddressForm.jsx";

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [reloadAddressManagement, setReloadAddressManagement] = useState(0);

    const [reloadTrigger, setReloadTrigger] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const handleReload = () => {
        setReloadTrigger(!reloadTrigger);
    };

    const fetchAddresses = async () => {
        try {
            // setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5172/address/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAddresses(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        // handleReload()

        fetchAddresses();
    }, [reloadTrigger]);  // Khi reloadTrigger thay đổi, useEffect sẽ gọi lại API //

    // if (loading) {
    //     return <p>Đang tải dữ liệu...</p>;
    // }

    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <div
                        className="card px-3 py-3 light bg-body-tertiary align-items-center bg-navbar-theme">
                        {/*<AddressList key={reloadTrigger} onReload={handleReload}/>*/}
                        <div className="container d-flex ps-2 p-0 align-items-center">
                            <h5 className="m-0">Address List</h5>
                            <Button variant="primary" onClick={() => setModalShow(true)} style={{marginLeft: 'auto'}}>
                                <i className='bx bx-plus me-2'></i>
                                <span>Add Address</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {addresses.map((address, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-0" key={index}>
                        <div
                            className="card sticky-summary p-0 mb-4"
                            style={{
                                position: "sticky",
                                padding: '15px 12px 15px 12px',
                                top: 80,
                                border: "none",
                            }}>
                            <AddressItem item={address} key={reloadTrigger} onReload={handleReload}/>
                        </div>
                    </div>
                ))}
            </div>
            <AddressForm
                show={modalShow}
                // onHide={() => setModalShow(false)}
                onHide={() => setModalShow(false)}
                onReload={handleReload}
                address={null}
            />
        </>
    )
}

export default AddressManagement

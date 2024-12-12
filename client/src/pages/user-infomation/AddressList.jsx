import React, {Component, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import AddressItem from "../../components/address/AddressItem.jsx";
import AddressForm from "../../components/modal/form/AddressForm.jsx";
import Notification from "../../components/bar-elements/Notification.jsx";
import Message from "../../components/bar-elements/Message.jsx";

let AddressList = ({ onReload }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const handleCardClick = (address) => {
        setSelectedAddress(address);
        setModalShow(true);
    };

    const handleModalClose = () => {
        setModalShow(false);
        setSelectedAddress(null);
    };

    return (
        <>
            <div className="container d-flex ps-2 p-0 align-items-center">
                <h5 className="m-0">Address List</h5>
                <Button variant="primary" onClick={() => setModalShow(true)} style={{marginLeft: 'auto'}}>
                    <i className='bx bx-plus me-2'></i>
                    <span>Add Address</span>
                </Button>
            </div>
            <AddressForm
                show={modalShow}
                // onHide={() => setModalShow(false)}
                onHide={handleModalClose}
                onReload={onReload}
                address={selectedAddress}
            />
        </>
    )
}

export default AddressList
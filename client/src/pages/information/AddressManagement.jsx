import React, {Component, useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import AddressItem from "../../components/address/AddressItem.jsx";
import AddressForm from "../../components/modal/form/AddressForm.jsx";
import axios from "axios";
import apiHandler from "../../utils/apiHandler.jsx";

export const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [reloadAddressManagement, setReloadAddressManagement] = useState(0);

    const [reloadTrigger, setReloadTrigger] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const handleReload = () => {
        setReloadTrigger(!reloadTrigger);
    };

    const listAddresses = async () => {
        try {
            // setLoading(true);
            const token = localStorage.getItem('token');
            const response = await apiHandler.get('/address/list', {
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

        listAddresses();
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
                            <Button className="ms-auto" variant="primary" onClick={() => setModalShow(true)}>
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
                        <div className="card position-sticky sticky-summary p-0 mb-4">
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

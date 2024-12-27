import React, {useEffect, useState} from "react";
import VoucherItem from "../../components/voucher/VoucherItem.jsx";
import {Button} from "react-bootstrap";
import axios from "axios";

const VoucherWallet = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [reloadAddressManagement, setReloadAddressManagement] = useState(0);
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const handleReload = () => {
        setReloadTrigger(!reloadTrigger);
    };

    useEffect(() => {
        // const fetchAddresses = async () => {
        //     try {
        //         // setLoading(true);
        //         const token = localStorage.getItem('token');
        //         const response = await axios.get('http://localhost:5172/address/list', {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         });
        //         setAddresses(response.data);
        //     } catch (error) {
        //         console.error('Lỗi khi lấy dữ liệu:', error);
        //     } finally {
        //         // setLoading(false);
        //     }
        // };

        // fetchAddresses();
    }, []);  // Khi reloadTrigger thay đổi, useEffect sẽ gọi lại API //
    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <div
                        className="card px-3 py-3 light bg-body-tertiary align-items-center bg-navbar-theme">
                        {/*<AddressList key={reloadTrigger} onReload={handleReload}/>*/}
                        <div className="container d-flex ps-2 p-0 align-items-center">
                            <h5 className="m-0">Voucher Wallet</h5>
                            <Button disabled variant="light" className="ms-auto">
                                <i className='bx bx-plus text-white me-2'></i>
                                <span></span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-lg-4 col-md-6 col-md col-sm-12">
                    <VoucherItem/>
                </div>
            </div>
        </>
    )
}

export default VoucherWallet
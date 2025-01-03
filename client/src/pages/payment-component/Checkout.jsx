import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Transitionbar from '../../layouts/Transitionbar.jsx';
import { redirect, useLocation } from 'react-router-dom';
import OrderItem from "../../components/product/OrderItem.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";
import { useNavigate } from 'react-router-dom'

// var pre_total = 0;
// // products.map((item) => pre_total += item['price']);

var discount = 0; // Assuming no discount applied.
// var total = pre_total - (discount * pre_total);
// var paid = 0;
// var remaining = total - paid;

const CheckOut = () => {
    const location = useLocation();
    const { cartData, prePrice, discounts, totalPrice, userData, selectedaddress, selectedstoreaddress, deliverymethod } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState("qr"); // State for delivery method
    const [status, setStatus] = useState(1); // State for delivery method
    const [date, setDate] = useState(new Date()); // State for delivery method
    const [address, setAdress] = useState([]); // State for delivery method
    const [isPaypalSelected, setIsPaypalSelected] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchAddress = async () => {
        try {
            const response = await fetch(`http://localhost:5172/address/addresses/${selectedaddress}`);
            const data = await response.json();
            setAdress(data[0])
        } catch (error) {
            // console.log(error);
            console.error('Lỗi khi lấy địa chỉ:', error);
        }
    };

    const formatDateToMySQL = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const paypalAPI = async () => {
        // Kiểm tra nếu PayPal đã được tải trước
        if (window.paypal) {
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return fetch('http://localhost:5172/paypal/create-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ totalPrice: totalPrice })
                    }).then(res => res.json())
                        .then(order => order.id);
                },
                onApprove: function (data, actions) {
                    return fetch('http://localhost:5172/paypal/capture-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ orderID: data.orderID }),
                    }).then(res => res.json())
                        .then(details => {
                            alert('Thanh toán thành công');
                            handleStatusChange(1);
                            handleAddBill()
                        });
                },
                onError: function (err) {
                    console.error(err);
                    alert('Có lỗi xảy ra trong quá trình thanh toán');
                }
            }).render('#paypal-button-container');
        }
    };
    const handleAddBill = async () => {
        try {
            const response = await axios.put(`http://localhost:5172/bill/add-bill`, {
                date: formatDateToMySQL(date),
                iddiscount: null,
                idaddress: selectedaddress,
                price: totalPrice,
                status: status,
                items: cartData
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setShowSuccess(true)
            // alert("Hóa đơn đã được tạo vào thành công");
            // navigate('/')
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn:', error);
        }
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        setIsPaypalSelected(event.target.value === "paypal"); // Set to true if PayPal is selected
    };

    const handleStatusChange = (status) => {
        setStatus(status);
        // console.log(status)
    };

    useEffect(() => {
        fetchAddress();

        if (isPaypalSelected) {
            const script = document.createElement('script');
            script.src = "https://www.paypal.com/sdk/js?client-id=AdhVzROq2s2WBCyzBViwG2txjK55M54O6K_swNa_do0hEpOGo5PQf49TYCoz3evn0s3PF_jdXovGzKb3&currency=USD";
            script.async = true;
            script.onload = () => {
                paypalAPI(); // Call PayPal API when PayPal is selected
            };
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isPaypalSelected]); // Only run when PayPal is selected

    return (
        <>
            <Transitionbar />
            <div className="container">
                <div className="row">
                    {/* Left Section: Order Info and Payment Method */}
                    <div className="col col-sm-12 col-md-6 col-lg-8">
                        {/* Order Information */}
                        <div className="card p-3 mb-4">
                            <div className="p-3">
                                <h5>Thông tin đơn hàng</h5>
                                <div>Mã đặt hàng: <strong>DH2410160005</strong></div>
                                <div>Người nhận: <strong>{userData.firstname} {userData.lastname}</strong></div>
                                <div>{deliverymethod}:
                                    {deliverymethod === "Tại cửa hàng" && (
                                        <strong>{selectedstoreaddress}</strong>
                                    )}
                                    {deliverymethod === "Giao tận nơi" && (
                                        <strong>{address.street}, {address.city}, {address.district}</strong>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Payment Method */}
                        <div className="card p-3 mb-4">
                            <div className="p-3"><h5>Phương thức thanh toán</h5>
                                {/*<div className="form-check">*/}
                                {/*    <input*/}
                                {/*        name="default-radio-1"*/}
                                {/*        className="form-check-input"*/}
                                {/*        type="radio"*/}
                                {/*        value=""*/}
                                {/*        id="defaultRadio2"*/}
                                {/*        checked/>*/}
                                {/*    <label className="form-check-label" htmlFor="defaultRadio2"> Checked </label>*/}
                                {/*</div>*/}
                                <Form.Check
                                    className="form-check"
                                    type="radio"
                                    label="Chuyển Khoản QR"
                                    name="paymentMethod"
                                    value="qr"
                                    checked={paymentMethod === "qr"}
                                    onChange={handlePaymentMethodChange}
                                />
                                {/* Other Payment Methods */}
                                <Form.Check
                                    type="radio"
                                    label="Thanh toán khi nhận hàng"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={handlePaymentMethodChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={handlePaymentMethodChange}
                                />
                            </div>
                        </div>
                        {paymentMethod === "qr" && (
                            <>
                                <div className="card p-3 mb-4">
                                    <div className="p-3">
                                        <h5>Hướng dẫn chuyển khoản</h5>
                                        <div className="mb-1">
                                            <strong>Cách 1: </strong>
                                            Dùng ứng dụng ngân hàng để quét mã QR.
                                        </div>
                                        <div className="mb-1">
                                            <strong>Cách 2: </strong>
                                            Nhập thông tin chuyển khoản bên dưới.
                                            Lưu ý nhập chính xác số tiền, nội dung chuyển khoản.
                                        </div>
                                        <div className="mb-1">
                                            Sau khi chuyển khoản thành công, bấm nút
                                            <strong> Tôi đã chuyển khoản</strong>. Hệ thống sẽ mất
                                            khoảng 30 giây để xác minh đã nhận được tiền.
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Info */}
                                <div className="card p-3 mb-4">
                                    <div className="p-3">
                                        <div className="row mb-3">
                                            <div className="col col-lg-9">
                                                <p>Ngân hàng: <strong>Ngân hàng TMCP Ngoại thương Việt Nam
                                                    (Vietcombank)</strong></p>
                                                <p>Tên tài khoản: <strong>Lê Tuấn Linh</strong></p>
                                                <p>Số tài khoản: <strong>9968727279</strong></p>
                                                <p>Nội dung CK: <strong>212410160005 RYPRGG</strong></p>
                                                <p>Số tiền: <strong>${totalPrice}</strong></p>
                                            </div>
                                            <div className="col col-3 justify-content-center">
                                                <div className="d-flex align-items-center flex-column">
                                                    <img className="img-fluid rounded mb-4"
                                                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                                                         height="120" width="120" alt="QR Code"/>
                                                    <div className="customer-info text-center mb-4">
                                                        <h5 className="mb-0">Scan QR code</h5>
                                                        <span>Customer ID #30</span>
                                                    </div>
                                                </div>
                                                {/*<img src="https://via.placeholder.com/150" alt="QR Code"/>*/}
                                                {/*<p className="text-center">Scan QR code</p>*/}
                                            </div>
                                        </div>
                                        <Button className="w-100 mt-2" variant="primary" onClick={() => {
                                            handleStatusChange(1);
                                            handleAddBill()
                                            // NotifySuccess()
                                        }}>Tôi đã chuyển khoản</Button>
                                    </div>
                                </div>
                            </>
                        )}
                        {paymentMethod === "cod" && (
                            <div className="card p-3 mb-3">
                                <div className="p-3">
                                <Button className="w-100" variant="primary" onClick={() => {
                                        handleStatusChange(0)
                                        handleAddBill()
                                    }}>
                                        Xác nhận thanh toán
                                    </Button>
                                </div>
                            </div>
                        )}
                        {paymentMethod === "paypal" && (
                            <>
                                <div className="card p-3 mb-4 d-flex justify-content-center">
                                    <div className="d-flex justify-content-center w-100">
                                        <div className="d-flex" id="paypal-button-container"></div>
                                    </div>
                                </div>
                                {/*<div className="card p-3 mb-3 d-flex justify-content-center">*/}
                                {/*    <div className="row d-flex justify-content-center flex-wrap">*/}
                                {/*        <div className="col-12">*/}
                                {/*            <div className="d-flex justify-content-center w-100"*/}
                                {/*                 style={{minWidth: '120px'}}>*/}
                                {/*                <div className="d-flex" id="paypal-button-container"></div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </>
                        )}
                    </div>

                    <div className="col col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="container position-sticky sticky-summary p-0" style={{top: 24}}>
                            <div className="card p-3 mb-4">
                                <div className="rounded p-3">
                                    <h5>Price Details</h5>
                                    <dl className="row mb-0 text-heading">
                                        <dt className="col-6 fw-normal">Bag Total</dt>
                                        <dd className="col-6 text-end">${prePrice}</dd>

                                        <dt className="col-6 fw-normal">Coupon Discount</dt>
                                        <dd className="col-6 text-primary text-end">Apply Coupon</dd>

                                        <dt className="col-6 fw-normal">Order Total</dt>
                                        <dd className="col-6 text-end">- ${prePrice * discount}</dd>

                                        <dt className="col-6 fw-normal">Delivery Charges</dt>
                                        <dd className="col-6 text-end">
                                            <s className="text-muted">$5.00</s>
                                            <span className="badge bg-label-success ms-1">Free</span>
                                        </dd>
                                    </dl>
                                    <hr className="my-4"/>
                                    <dl className="row mb-0">
                                        <dt className="col-6 text-heading">Total</dt>
                                        <dd className="col-6 fw-medium text-end text-heading mb-0">${totalPrice}</dd>
                                    </dl>
                                </div>
                                {/*<div className="p-3">*/}
                                {/*    <Button className="w-100" variant="danger">*/}
                                {/*        Order*/}
                                {/*    </Button>*/}
                                {/*</div>*/}
                            </div>
                            <div className="card p-3">
                                <div className="rounded p-3">
                                    <h5>Sản phẩm trong đơn</h5>
                                    <hr className="my-4"/>
                                    {cartData.map((item, index) => (
                                        <OrderItem key={index} Item={item}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NotifySuccess
                title="Order successfully"
                message="Follow your order in Order History!"
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
            />
        </>
    );
}

export default CheckOut;

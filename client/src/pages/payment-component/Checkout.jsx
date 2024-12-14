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
            console.log(error);
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
        console.log(status)
    };

    const handleRemoveItem = async () => {
        try {
            const response = await axios.put(`http://localhost:5172/cart/remove-cartitem`, {
                idcartItem: item.idcart_item,
            });
            if (response.status === 201) {
                alert("Sản phẩm đã được xóa vào giỏ hàng!");
                onRemoveItem();
            }

        } catch (error) {
            console.error('Lỗi khi xóa vào giỏ hàng:', error);
        }
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
                    <Col sm={12} md={6} lg={8}>
                        {/* Order Information */}
                        <div className="card p-3 mb-4">
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
                        {/* Payment Method */}
                        <div className="card p-3 mb-4">
                            <h5>Phương thức thanh toán</h5>
                            <Form.Check
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
                        {paymentMethod === "qr" && (
                            <>
                                <div className="card p-3 mb-4">
                                    <h6>Hướng dẫn chuyển khoản</h6>
                                    <div><strong>Cách 1:</strong> Dùng ứng dụng ngân hàng để quét mã QR.</div>
                                    <div><strong>Cách 2:</strong> Nhập thông tin chuyển khoản bên dưới. Lưu ý nhập chính
                                        xác số tiền, nội dung chuyển khoản.
                                    </div>
                                    <div>Sau khi chuyển khoản thành công, bấm nút "Tôi đã chuyển khoản". Hệ thống sẽ mất
                                        khoảng 30 giây để xác minh đã nhận được tiền.
                                    </div>
                                </div>

                                {/* Bank Info */}
                                <div className="card p-3 mb-4">
                                    <Row>
                                        <Col>
                                            <p>Ngân hàng: <strong>Ngân hàng TMCP Ngoại thương Việt Nam
                                                (Vietcombank)</strong></p>
                                            <p>Tên tài khoản: <strong>Lê Tuấn Linh</strong></p>
                                            <p>Số tài khoản: <strong>9968727279</strong></p>
                                            <p>Nội dung CK: <strong>212410160005 RYPRGG</strong></p>
                                            <p>Số tiền: <strong>${totalPrice}</strong></p>
                                        </Col>
                                        <Col>
                                            <img src="https://via.placeholder.com/150" alt="QR Code"/>
                                            <p className="text-center">Quét mã QR bằng ứng dụng ngân hàng</p>
                                        </Col>
                                    </Row>
                                    <Button className="w-100 mt-2" variant="primary" onClick={() => {
                                        handleStatusChange(1);
                                        handleAddBill()
                                        // NotifySuccess()
                                    }}>Tôi đã chuyển khoản</Button>
                                </div>
                            </>
                        )}
                        {paymentMethod === "cod" && (
                            <div className="card p-3 mb-3">
                                <Button className="w-100" variant="primary" onClick={() => {
                                    handleStatusChange(0)
                                    handleAddBill()
                                }}>
                                    Xác nhận thanh toán
                                </Button>
                            </div>
                        )}
                        {paymentMethod === "paypal" && (
                            <div className="card p-3 mb-3 d-flex justify-content-center">
                                <div className="d-flex" id="paypal-button-container"></div>
                            </div>
                        )}
                    </Col>

                    {/* Right Section: Order Summary & Product List */}
                    <Col sm={12} md={6} lg={4} className="mb-4">
                        {/* First Card: Order Summary */}
                        <div className="card sticky-summary mb-4 shadow-none"
                             style={{position: 'sticky', top: 120, backgroundColor: 'transparent', boxShadow: 'none'}}>
                            <div className="card p-3 sticky-summary mb-4">
                                <h5>Tóm tắt đơn hàng</h5>
                                <div className="d-flex justify-content-between">
                                    <span>Tạm tính</span>
                                    <span>${prePrice} </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Được giảm</span>
                                    <span>${prePrice * discount} </span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Tổng cộng</span>
                                    <span style={{fontWeight: 'bold', fontSize: '1.5em'}}>${totalPrice} </span>
                                </div>
                                {/* <div className="d-flex justify-content-between mt-2">
                                    <span>Đã thanh toán</span>
                                    <span>{paid.toLocaleString('vi-VN')} đ</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Còn lại</span>
                                    <span>${totalPrice}</span>
                                </div> */}
                            </div>
                            <div className="card p-3 sticky-summary mb-4">
                                <h4>Sản phẩm trong đơn</h4>
                                {cartData.map((item, index) => (
                                    <OrderItem key={index} Item={item} />
                                ))}
                            </div>
                        </div>
                    </Col>
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

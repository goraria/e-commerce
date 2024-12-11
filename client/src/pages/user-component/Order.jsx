import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Transitionbar from '../../layouts/Transitionbar.jsx';
import CardItem from '../../components/product/CartItem.jsx';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import OrderItem from "../../components/product/OrderItem.jsx";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Order = () => {
    const [user, setUser] = useState([]);
    const [address, setAdress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(""); // State to track selected address
    const [selectedStoreAddress, setSelectedStoreAddress] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("Tại cửa hàng"); // State for delivery method
    const [status, setStatus] = useState(1); // State for delivery method
    const [date, setDate] = useState(new Date()); // State for delivery method

    const location = useLocation();
    const { cartData, prePrice, discount, totalPrice } = location.state || {};

    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const handleOrderClick = (event) => {
        // handleAddBill();
        event.preventDefault();
        navigate('/pay/checkout', {
            state: {
                cartData: cartData, // Dữ liệu giỏ hàng
                prePrice: prePrice,
                discount: discount,
                totalPrice: totalPrice,
                userData: user,
                selectedaddress: selectedAddress,
                selectedstoreaddress: selectedStoreAddress,
                deliverymethod: deliveryMethod
            }
        });

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
    const handleAddBill = async () => {
        try {
            const response = await axios.put(`http://localhost:5172/bill/add-bill`, {
                date: formatDateToMySQL(date),
                iddiscount: null,
                idaddress: selectedAddress,
                price: totalPrice,
                status: status,
                items: cartData
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            });
            alert("Bill đã được tạo vào thành công");

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchBill = async () => {
        try {
            const response = await fetch(`http://localhost:5172/account/get-info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:5172/account/get-info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchAddress = async () => {
        try {
            const response = await fetch(`http://localhost:5172/address/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setAdress(data)
            console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const handleDeliveryMethodChange = (event) => {
        setDeliveryMethod(event.target.value);
    };

    const handleStoreAddressChange = (event) => {
        setSelectedStoreAddress(event.target.value);
    };

    useEffect(() => {
        fetchUser();
        fetchAddress();

    }, []);

    return (
        <>
            <Transitionbar />
            <div className="container">
                <div className="row">
                    {/* Left Section */}
                    <div className="col col-sm-12 col-md-6 col-lg-8">
                        {/* Delivery Method Selection */}
                        <div
                            className="card sticky-summary mb-4 p-3"
                            style={{
                                position: "sticky",
                                top: 80,
                                zIndex: 1,
                                border: "none",
                            }}>
                            <div className="container d-flex py-0 px-1">
                                <h2 className="m-0">Order</h2>
                                {/*<Button variant="primary" style={{marginLeft: 'auto'}}>*/}
                                {/*    <FontAwesomeIcon icon={faPlus} className="me-2"/>*/}
                                {/*    <span>Thêm sản phẩm</span>*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                        <div className="card p-3 mb-4">
                            <h4>Phương thức nhận hàng</h4>
                            <Form.Check
                                type="radio"
                                label="Tại cửa hàng"
                                name="deliveryMethod"
                                value="Tại cửa hàng"
                                checked={deliveryMethod === 'Tại cửa hàng'} // Always checked by default
                                onChange={handleDeliveryMethodChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Giao tận nơi"
                                name="deliveryMethod"
                                value="Giao tận nơi"
                                checked={deliveryMethod === 'Giao tận nơi'}
                                onChange={handleDeliveryMethodChange}
                            />
                        </div>
                        {/* Store Locations */}
                        <div className="card p-3 mb-4">
                            <h4>Địa chỉ cửa hàng</h4>
                            <Form.Check
                                type="radio"
                                label="Đại học kiến trúc"
                                value="Đại học kiến trúc"
                                name="storeLocation"
                                checked={selectedStoreAddress === "Đại học kiến trúc"}
                                onChange={handleStoreAddressChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Ngõ 2 Ao Sen"
                                value="Ngõ 2 Ao Sen"
                                name="storeLocation"
                                checked={selectedStoreAddress === "Ngõ 2 Ao Sen"}
                                onChange={handleStoreAddressChange}
                            />
                        </div>
                        {/* Recipient Information */}
                        <div className="card p-3 mb-4">
                            <h4>Thông tin người nhận</h4>
                            <Form.Group controlId="formRecipientName">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    name="recipientName"
                                    defaultValue={`${user.firstname} ${user.lastname}`}
                                // value={recipientName}
                                // onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber" className="mt-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    name="phoneNumber"
                                    defaultValue={user.phone}
                                // value={phoneNumber}
                                // onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            {deliveryMethod === 'Giao tận nơi' && (
                                <Form.Group controlId="formAddress" className="mt-3">
                                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                                    <Form.Select
                                        aria-label="Chọn địa chỉ giao hàng"
                                        value={selectedAddress}
                                        onChange={(e) => {
                                            setSelectedAddress(e.target.value);

                                        }}
                                    >
                                        <option value="">Chọn địa chỉ</option>
                                        {address.map((addr, index) => (
                                            <option key={index} value={addr.idaddress}>
                                                {addr.street}, {addr.city}, {addr.district}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            )}
                        </div>
                        {/* Product List */}
                        {/* <Card className="p-3">
                            {products.map((item) => <CardItem key={item.id} item={item} />)}
                        </Card> */}
                    </div>
                    {/* Right Section: Order Summary */}
                    <div className="col col-sm-12 col-md-6 col-lg-4 mb-2">
                        <div className="card sticky-summary mb-3 shadow-none" style={{ position: 'sticky', top: 100, backgroundColor: 'transparent', boxShadow: 'none' }}>
                            <div className="card p-3 sticky-summary">
                                <h4>Khuyến mãi</h4>
                                <Form.Select aria-label="Default select example" style={{ padding: 10, margin: '1px 0 10px 0' }}>
                                    <option> Chọn hoặc nhập khuyến mãi</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>

                                <h4>Tóm tắt đơn hàng</h4>
                                <div className="d-flex justify-content-between">
                                    <span>Tạm tính</span>
                                    <span>${prePrice}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Được giảm</span>
                                    <span>{prePrice * discount}$</span>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <span>Tổng cộng</span>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>${totalPrice}</span>
                                </div>
                                <Button className="w-100 mt-3" variant="danger" size="lg" onClick={handleOrderClick}>
                                    Đặt hàng
                                </Button>
                            </div>
                            <div className="card p-3 sticky-summary mb-4 mt-4">
                                <h4>Sản phẩm trong đơn</h4>
                                {cartData.map((item, index) => (
                                    <OrderItem key={index} Item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
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
    const [deliveryMethod, setDeliveryMethod] = useState("Delivery"); // State for delivery method
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
            // console.log(data)
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
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div
                                    className="card px-3 py-3 light bg-body-tertiary align-items-center bg-navbar-theme">
                                    <div className="container d-flex ps-2 p-0 align-items-center">
                                        <h5 className="m-0">Order</h5>
                                        <Button disabled to={'/search'} variant="light" className="ms-auto">
                                            <i className='bx bx-plus text-white me-2'></i>
                                            <span></span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-3 mb-4">
                            <div className="rounded p-3">
                                <h5>Preferable Address</h5>
                                <Form.Check
                                    className="mb-2"
                                    type="radio"
                                    label="Delivery"
                                    name="deliveryMethod"
                                    value="Delivery"
                                    checked={deliveryMethod === 'Delivery'}
                                    onChange={handleDeliveryMethodChange}
                                />
                                <Form.Check
                                    disabled
                                    type="radio"
                                    label="Shop"
                                    name="deliveryMethod"
                                    value="Shop"
                                    checked={deliveryMethod === 'Shop'} // Always checked by default
                                    onChange={handleDeliveryMethodChange}
                                />
                            </div>
                        </div>
                        {/* Store Locations */}
                        {/* Recipient Information */}
                        <div className="card p-3 mb-4">
                            <div className="rounded p-3">
                                <h5>Customer Information</h5>
                                <Form.Group controlId="formRecipientName">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your fullname"
                                        name="recipientName"
                                        defaultValue={user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : ""}
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
                                {deliveryMethod === 'Delivery' && (
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
                        </div>
                        {/* Product List */}
                        {/* <Card className="p-3">
                            {products.map((item) => <CardItem key={item.id} item={item} />)}
                        </Card> */}
                    </div>
                    {/* Right Section: Order Summary */}

                    <div className="col col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="container position-sticky sticky-summary p-0" style={{top: 24}}>
                            <div className="card p-3 mb-4">
                                <div className="rounded p-3">
                                    <h5>Offer</h5>
                                    <div className="row g-4 mb-4">
                                        <div className="col-8 col-xxl-8 col-xl-12">
                                            <Form.Select
                                                className="mb-4"
                                                aria-label="Default select example">
                                                <option>Choose voucher</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                            <input type="text" className="form-control" placeholder="Enter Promo Code"
                                                   aria-label="Enter Promo Code"/>
                                        </div>
                                        <div className="col-4 col-xxl-4 col-xl-12">
                                            <div className="d-grid">
                                                <Button variant="outline-primary" type="button"
                                                        className="btn btn-label-primary">Apply</Button>
                                            </div>
                                        </div>
                                    </div>
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
                                <div className="p-3">
                                <Button className="w-100" variant="danger" onClick={handleOrderClick}>
                                        Order
                                    </Button>
                                </div>
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
                    <div className="d-none col col-sm-12 col-md-6 col-lg-4 mb-2">
                        <div className="card sticky-summary mb-3 shadow-none"
                             style={{position: 'sticky', top: 100, backgroundColor: 'transparent', boxShadow: 'none'}}>
                            <div className="card p-3 sticky-summary">
                                <h4>Khuyến mãi</h4>
                                <Form.Select aria-label="Default select example"
                                             style={{padding: 10, margin: '1px 0 10px 0'}}>
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
                                    <span style={{fontWeight: 'bold', fontSize: '1.5em'}}>${totalPrice}</span>
                                </div>
                                <Button className="w-100 mt-3" variant="danger" size="lg" onClick={handleOrderClick}>
                                    Đặt hàng
                                </Button>
                            </div>
                            <div className="card p-3 sticky-summary mb-4 mt-4">
                                <h4>Sản phẩm trong đơn</h4>
                                {cartData.map((item, index) => (
                                    <OrderItem key={index} Item={item}/>
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
import React, { Component } from 'react';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Transitionbar from '../../layouts/Transitionbar.jsx';
import CardItem from '../../components/product/CartItem.jsx';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const [carts, setCart] = useState();
    const [cartItems, setCartItem] = useState([]);
    const [product, setProduct] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [descriptions, setArray] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedCartItems, setSelectedCartItems] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const response = async () => {
        await axios.get('http://localhost:5172/cart/load', {
            headers: { Authorization: `Bearer ${token}` }
        })
    };

    const handleOrderClick = (event) => {
        event.preventDefault();
        navigate('/pay/order', {
            state: {
                cartData: selectedCartItems, // Dữ liệu giỏ hàng
                prePrice: pre_total,
                discount: discount,
                totalPrice: total     // Tổng giá trị đơn hàng
            }
        });
    };

    // const fetchCart = async () => {
    //     const response = await axios.get(`http://localhost:5172/cart/load-cart/${idcart}`);
    //     setCart(response.data[0]);
    // };

    const fetchCartItem = async (Carts) => {
        try {
            const response = await axios.get(`http://localhost:5172/cart/load-cartItem/${Carts.idcart}`);
            setCartItem(response.data);
        } catch {
            console.error('Error fetching CartItem details:');
        }
    };

    const fetchProductDetails = async (CartItems) => {
        if (cartItems && cartItems.idproduct) {  // Check if idproduct is available
            try {
                const response = await fetch(`http://localhost:5172/products/load-productid/${CartItems.idproduct}`);
                const data = await response.json();
                setProduct(data[0]);
                // console.log(data)
            } catch (error) {
                // console.error('Error fetching product details:', error);
            }
        }
    };
    // const fetchProductConfiguration = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5172/products/load-idconfiguration/${cartItems.idconfiguration}`);
    //         const data = await response.json();
    //         setdefaultconfig(data[0]); // Cập nhật thông tin sản phẩm từ backend
    //         console.log(data)
    //     } catch (error) {
    //         console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    //     }
    // };

    // const fetchProductDecription = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5172/products/load-description/${cartItems.idproduct}`);
    //         const data = await response.json();
    //         setArray(data[0]); // Cập nhật thông tin sản phẩm từ backend
    //         console.log(data[0])

    //     } catch (error) {
    //         console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
    //     }
    // };

    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:5172/cart/loadcart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCart(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };
    // const fetchProductByName = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5172/products/load-productName/${cartItems.idproduct}`);
    //         const data = await response.json();
    //         setArray(data[0]); // Cập nhật thông tin sản phẩm từ backend
    //         console.log(data[0])

    //     } catch (error) {
    //         console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
    //     }
    // };

    const handleCheckboxChange = (price, isSelected, item) => {
        setSelectedPrices((prevSelectedPrices) =>
            isSelected
                ? [...prevSelectedPrices, price * item.quantity] // Add price if checked
                : prevSelectedPrices.filter((itemPrice) => itemPrice !== price * item.quantity) // Remove if unchecked
        );

        setSelectedCartItems((prevSelectedCartItems) =>
            isSelected
                ? [...prevSelectedCartItems, item]
                : prevSelectedCartItems.filter((cartItem) => cartItem.idcart_item !== item.idcart_item)
        );
    };

    const removeCartItem = () => {
        fetchCartItem(carts);
    };

    // Calculate total based on selected prices
    var pre_total = selectedPrices.reduce((acc, price) => acc + price, 0);
    var discount = 0; // Modify as needed
    var total = pre_total - pre_total * discount;

    useEffect(() => {
        fetchCart();

        // response();
    }, []);

    useEffect(() => {
        fetchCartItem(carts);
        // fetchProductDetails();
        // fetchProductConfiguration();
        // fetchProductDecription();
    }, [carts]); // Run fetchProductDetails when cartItems is updated

    return (
        <>
            <Transitionbar />
            <div className="container">
                <div className="row">
                    {/* Left Section: Product List */}
                    <div className="col col-sm-12 col-md-12 col-lg-8">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div
                                    className="card px-3 py-3 light bg-body-tertiary align-items-center bg-navbar-theme">
                                    <div className="container d-flex ps-2 p-0 align-items-center">
                                        <h5 className="m-0">Cart</h5>
                                        <Button as={Link} to={'/search'} variant="primary" className="ms-auto">
                                            <i className='bx bx-plus me-2'></i>
                                            <span>Add Product</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {cartItems.map((item) => (
                            <div className="card p-3 mb-4" key={item.idcart_item}>
                                <CardItem element={item} onCheckboxChange={handleCheckboxChange}
                                          onRemoveItem={removeCartItem}/>
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Order Summary */}
                    <div className="col col-lg-4 col-md-12 col-sm-12 mb-4">
                        <div className="container position-sticky sticky-summary p-0" style={{top: 24}}>
                            <div className="card p-3">
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
                                        <dd className="col-6 text-end">${pre_total}</dd>

                                        <dt className="col-6 fw-normal">Coupon Discount</dt>
                                        <dd className="col-6 text-primary text-end">Apply Coupon</dd>

                                        <dt className="col-6 fw-normal">Order Total</dt>
                                        <dd className="col-6 text-end">- ${pre_total * discount}</dd>

                                        <dt className="col-6 fw-normal">Delivery Charges</dt>
                                        <dd className="col-6 text-end">
                                            <s className="text-muted">$5.00</s>
                                            <span className="badge bg-label-success ms-1">Free</span>
                                        </dd>
                                    </dl>
                                    <hr className="my-4"/>
                                    <dl className="row mb-0">
                                        <dt className="col-6 text-heading">Total</dt>
                                        <dd className="col-6 fw-medium text-end text-heading mb-0">${total}</dd>
                                    </dl>
                                </div>
                                <div className="rounded p-3">
                                    <Button className="w-100" variant="danger" onClick={handleOrderClick}>
                                        Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;

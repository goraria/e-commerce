import React, { Component } from 'react';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Transitionbar from '../../layouts/Transitionbar.jsx';
import CardItem from '../../components/product/CartItem.jsx';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import AddressList from "../user-infomation/AddressList.jsx";

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
                console.log(data)
            } catch (error) {
                console.error('Error fetching product details:', error);
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
                <Row>
                    {/* Left Section: Product List */}
                    <Col sm={12} md={6} lg={8}>
                        <div
                            className="card sticky-summary mb-4"
                            style={{
                                position: "sticky",
                                padding: '15px 12px 15px 12px',
                                top: 80,
                                zIndex: 1,
                                border: "none",
                            }}>
                            <Container style={{ display: "flex", padding: '0 8px' }}>
                                <h2 className="m-0">Giỏ hàng</h2>
                                <Button as={Link} to={'/search'} variant="primary" style={{ marginLeft: 'auto' }}>
                                    <i className='bx bx-plus me-2'></i>
                                    <span>Thêm sản phẩm</span>
                                </Button>
                            </Container>
                        </div>
                        {cartItems.map((item) => (
                            <div className="card p-3 mb-4" key={item.idcart_item}>
                                <CardItem Item={item} onCheckboxChange={handleCheckboxChange} onRemoveItem={removeCartItem} />
                            </div>
                        ))}
                    </Col>

                    {/* Right Section: Order Summary */}
                    <Col sm={12} md={6} lg={4} className="mb-4">
                        <div className="card p-3 sticky-summary" style={{ position: 'sticky', top: 120 }}>
                            <h2>Khuyến mãi</h2>
                            <Form.Select aria-label="Default select example" style={{ padding: 10, margin: '1px 0 10px 0' }}>
                                <option> Chọn hoặc nhập khuyến mãi</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>

                            <h5>Tóm tắt đơn hàng</h5>
                            <div className="d-flex justify-content-between">
                                <span>Tạm tính</span>
                                <span>{pre_total}$</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Được giảm</span>
                                <span>{pre_total * discount}$</span>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <span>Tổng cộng</span>
                                <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{total}$</span>
                            </div>
                            <Button className="w-100 mt-3" variant="danger" size="lg" onClick={handleOrderClick}>
                                Đặt hàng
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Cart;

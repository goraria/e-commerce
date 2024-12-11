import React, { Component, version } from "react";
import {
    Container, Button, Form, ButtonGroup, DropdownButton, Dropdown, Row, Col, Card, Image, Stack, Carousel, ListGroup, Badge,
    CardTitle,
    CardText

} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from "../../components/product/ProductItem.jsx";
import Transitionbar from "../../layouts/Transitionbar.jsx";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Overview from "../../layouts/Overview.jsx";
import NotifySuccess from "../../components/modal/notify/NotifySuccess.jsx";


const Product = () => {
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [descriptions, setArray] = useState([]);
    const [configurations, setconfig] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [colors, setcolor] = useState([]);
    const [ratings, setRating] = useState([]);
    const [products, setProduct] = useState([]);
    const [carts, setCart] = useState();
    const [ChoosedColor, setChoosedColor] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const token = localStorage.getItem('token');
    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:5172/cart/loadcart`,{
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

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-productid/${id}`);
            const data = await response.json();
            setProduct(data[0]); // Cập nhật thông tin sản phẩm từ backend
            console.log(data[0])
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const fetchProductDecription = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-description/${id}`);
            const data = await response.json();
            setArray(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data[0])

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };
    const fetchProductColor = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-color/${id}`);
            const data = await response.json();
            setcolor(data); // Cập nhật thông tin sản phẩm từ backend
            console.log(data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const fetchProductConfiguration = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-configuration/${id}`);
            const data = await response.json();
            setconfig(data)
            setdefaultconfig(data[0]); // Cập nhật thông tin sản phẩm từ backend
            console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const handleConfigurationChange = (config) => {
        setdefaultconfig(config);
    };
    // const [descriptions, setArray] = useState([]);
    // const currentUrl = window.location.href;
    // const url = new URL(currentUrl);
    // const params = new URLSearchParams(url.search);
    // const id = params.get('id');


    // const fetchAPI = async () => {
    //     const response = await axios.get(`http://localhost:5172/products/load-product/${id}`)
    //     console.log(response.data)
    //     setArray(response.data[0])
    // };

    // const fetchAPI1 = async () => {
    //     const response = await axios.get(`http://localhost:5172/products/load-description/${id}`)
    //     // console.log(response.data)
    //     setArray(response.data[0])
    // };

    const handleColorSelect = (idcolor) => {
        setChoosedColor(idcolor); // Cập nhật idcolor đã chọn
        // console.log(idcolor)
    };

    const handleAddToCart = async () => {
        try {
            const response = await axios.put(`http://localhost:5172/cart/add-cartitem`, {
                idcart: carts.idcart,
                idproduct:  parseInt(id),
                quantity: 1,
                idcolor: ChoosedColor,
                idconfiguration:default_config.idconfiguration,
            });
            if (response.status === 201) {
                // alert("Sản phẩm đã được thêm vào giỏ hàng!");
                setShowSuccess(true)
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    useEffect(() => {
        // fetchAPI();
        // fetchAPI1();
        fetchProductConfiguration();
        fetchProductDetails();
        fetchProductDecription();
        fetchProductColor();
        fetchCart();
    }, [id]);

    return (
        <>
            <Transitionbar/>
            <div className="container">
                <div className="row">
                    <Col sm={12} md={8} lg={8} style={{ alignItems: 'center' }}>
                        <div className="mb-4" style={{ display: "flex", justifyContent: 'center' }}>
                            <img
                                className="d-block"
                                src={products.product_image}
                                alt="Second slide"
                                style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '5px' }}
                            />
                        </div>
                        <div className="card p-3 mb-4">
                            <Card.Body>
                                {/* Section: Cấu hình đặc điểm */}
                                <Card.Title>Cấu hình đặc điểm</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Loại CPU:</strong></Col>
                                            <Col md={8}>{default_config.cpu}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>RAM:</strong></Col>
                                            <Col md={8}>{default_config.ram}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>GPU:</strong></Col>
                                            <Col md={8}>{default_config.gpu}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Storage:</strong></Col>
                                            <Col md={8}>{default_config.storage}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Screen:</strong></Col>
                                            <Col md={8}>{default_config.screen}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Revolution:</strong></Col>
                                            <Col md={8}>{default_config.resolution}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                                <Button variant="link" className="p-0">Xem cấu hình chi tiết</Button>
                            </Card.Body>
                        </div>
                        <div className="card p-3 mb-4">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h5>Bảo hành & đổi trả</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Bảo hành <strong>12 tháng tại chuỗi cửa hàng</strong></ListGroup.Item>
                                            <ListGroup.Item>Đổi mới trong 15 ngày đầu tiên</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </div>
                        <div className="card">
                            <Card.Body>
                                {/* Section: Cấu hình đặc điểm */}
                                <Card.Title> Mô tả sản phẩm</Card.Title>
                                <div className="mb-4" style={{ display: "flex", justifyContent: 'center' }}>
                                    <img
                                        className="d-block"
                                        src={products.product_image}
                                        alt="Second slide"
                                        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '5px' }}
                                    />
                                </div>
                                <div>
                                    <p>{descriptions.img_description}</p>
                                    <h4>Thiết kế thời thượng, thuận tiện di chuyển</h4>
                                    <p>{descriptions.title_description}</p>
                                </div>
                                <div style={{ display: "flex", marginBottom: 24, justifyContent: 'center' }}>
                                    {products.product_image ? (
                                        <div style={{ display: "flex", marginBottom: 24, justifyContent: 'center' }}>
                                            <Image
                                                className="d-block"
                                                src={products.product_image}
                                                alt="Product image"
                                                style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '5px' }}
                                            />
                                        </div>
                                    ) : (
                                        <p>Image not available</p>
                                    )}
                                </div>
                                <div>
                                    <h4>Phù hợp với mọi tác vụ</h4>
                                    <p>{descriptions.sub_description}</p>
                                </div>
                            </Card.Body>
                        </div>
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <div className="card p-3" style={{ position: 'sticky', top: 136 }}>
                            <div className="container">
                                <div className="row mt-4">
                                    <Col>
                                        <h2>{products.product_name}</h2>
                                        <p>Chưa có đánh giá</p>
                                    </Col>
                                </div>
                                <div className="row mt-4">
                                    <Col>
                                        <h5>Configurations</h5>
                                        <Form>
                                            <div className="mb-3">
                                                {configurations.map((config, index) =>
                                                    <Form.Check
                                                        key={index}
                                                        type="radio"
                                                        label={config.cpu + " " + config.ram + "GB " + config.storage + "GB"}

                                                        name="version"
                                                        id="version1"
                                                        checked={config.idconfiguration === default_config.idconfiguration}
                                                        onChange={() => handleConfigurationChange(config)}
                                                    />
                                                )}
                                            </div>
                                            <h5>Colors</h5>
                                            <div className="d-flex gap-3 mb-3">
                                                {colors.map((colours,index) =>
                                                    <Button key= {index}
                                                            variant= {colours.color}
                                                            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
                                                            onClick={() => handleColorSelect(colours.idcolor)}
                                                    > {colours.color}</Button>) }
                                            </div>
                                        </Form>
                                    </Col>
                                </div>
                                <div className="row mt-4">
                                    <Col>
                                        <h3 className="text-danger">${default_config.price}</h3>
                                        <h6 className="text-muted">
                                            <del>{default_config.price}</del> <span className="text-danger">-47%</span>
                                        </h6>
                                    </Col>
                                </div>
                                <div className="row mt-4">
                                    <Col sm={12} md={6} lg={6} className="mb-3">
                                        <Button variant="outline-danger" className="me-2" style={{ width: '100%' }} onClick={handleAddToCart}>Add to cart</Button>
                                    </Col>
                                    <Col sm={12} md={3} lg={6} className="mb-3">
                                        <Button as={Link} to={"/cart"} variant="danger" style={{ width: '100%' }}>Buy now</Button>
                                    </Col>
                                </div>
                                <h5>Đánh giá sản phẩm</h5>
                                <Button variant="primary" className="mb-3" style={{ width: '100%' }}>Đánh giá</Button>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
            <Overview>
                <h2 className="text-center m-0">Sản phẩm tương tự</h2>
                {/* <Row>
                        {products.map(product =>
                            <Col key={product.id} sm={12} md={6} lg={3} className="mb-3">
                                <ProductItem obj={product} />
                            </Col>
                        )}
                    </Row> */}
            </Overview>
            <NotifySuccess
                title="Add to cart successfully"
                message="Sản phẩm đã được thêm vào giỏ hàng!"
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
            />
        </>
    )
}

export default Product
import { Link } from 'react-router-dom'
import React, { Component } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { noAuto } from "@fortawesome/fontawesome-svg-core"
import jp from '../../assets/images/jp.jpeg'
import NotifySuccess from "../modal/notify/NotifySuccess.jsx";


const renderStars = (rating) => {
    // Sanitize rating to be between 0 and 5
    const sanitizedRating = Math.max(0, Math.min(rating, 5));
    const fullStars = Math.floor(sanitizedRating); // Full stars count
    const halfStar = sanitizedRating % 1 >= 0.1 ? 1 : 0; // Half-star check
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    // Ensure valid star counts
    return (

        <>
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((index) => (
                // <FontAwesomeIcon key={`full-${i}`} icon={faStar} color="#f39c12"/>
                <i className='bx bxs-star bx-sm' key={index}></i>
            ))}
            {/* Half star */}
            {halfStar === 1 && <i className='bx bxs-star-half bx-sm' ></i>/*<FontAwesomeIcon icon={faStarHalfAlt} color="#f39c12"/>*/}
            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((index) => (
                // <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} color="#f39c12"/>
                <i className='bx bx-star bx-sm' key={index}></i>
            ))}
        </>
    );
}

const ProductItem = (product, state) => {

    const [descriptions, setArray] = useState([]);
    const [configurations, setconfig] = useState([]);
    const [ratings, setRating] = useState([]);
    const [products, setProduct] = useState([]);
    const [carts, setCart] = useState();
    const [colors, setColor] = useState();

    const [showSuccess, setShowSuccess] = useState(false);

    var obj = product.obj;
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
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };
    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-productid/${obj.idproduct}`);
            const data = await response.json();
            setProduct(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const fetchProductDecription = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-description/${obj.idproduct}`);
            const data = await response.json();
            setArray(data[0]); // Cập nhật thông tin sản phẩm từ backend
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };
    const fetchProductRating = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-rating/${obj.idproduct}`);
            const data = await response.json();
            setRating(data); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };
    const fetchProductColor = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-color/${obj.idproduct}`);
            const data = await response.json();
            setColor(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
    const fetchProductConfiguration = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-configuration/${obj.idproduct}`);
            const data = await response.json();
            setconfig(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
        fetchProductConfiguration();
        fetchProductDecription();
        fetchProductRating();
        fetchCart();
        fetchProductColor();
        // fetchAPI();
        // fetchAPI1();
        // fetchAPI2();
        // fetchAPI3();
    }, []);


    const handleAddToCart = async () => {
        try {
            // console.log(carts.idcart,obj.idproduct,colors.idcolor,configurations.idconfiguration)
            const response = await axios.put(`http://localhost:5172/cart/add-cartitem`, {
                idcart: carts.idcart,
                idproduct:  obj.idproduct,
                quantity: 1,
                idcolor: colors.idcolor,
                idconfiguration:configurations.idconfiguration,
            });
            if (response.status === 201) {
                // alert("Sản phẩm đã được thêm vào giỏ hàng!");
                setShowSuccess(true)
            }
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };


    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageScore = totalScore / ratings.length;
    const cardWidth = state;
    const imageHeight = (1 / 8) * cardWidth;
    return (
        // <Card style={{ border: 'none', backgroundColor: '#f8f9fa', borderRadius: 10,height:cardWidth*6/5 , width: cardWidth ,objectFit: 'cover' }}>
        //     <Link to={`/product?id=${obj.idproduct}`} style={{ textDecoration: 'none' }}>
        //         <Card.Img variant="top" src = {products.product_image}  style={{  width: '100%', height: '100%', objectFit: 'cover' }} />
        //     </Link>
        //     <Card.Body>
        //         {/* Price and Name in the same line */}
        //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //             <Card.Title style={{
        //                 marginBottom: '0',
        //                 whiteSpace: 'nowrap',
        //                 overflow: 'hidden',
        //                 textOverflow: 'ellipsis'
        //             }}>
        //                 {products.product_name}
        //             </Card.Title>
        //             <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${configurations.price}</span>
        //         </div>
        //
        //         {/* Truncated Description */}
        //         <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        //             {descriptions.title_description}
        //         </Card.Text>
        //
        //         {/* Rating and Buy Button */}
        //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //             {/* Rating Section */}
        //             <div style={{ color: '#f39c12', fontSize: '1.2rem' }}>
        //                 {renderStars(averageScore)}
        //             </div>
        //             {/* Buy Button */}
        //             <Button variant="primary" onClick={handleAddToCart}>
        //                 <FontAwesomeIcon className="me-2" icon={faCartPlus}/>
        //                 <span>Buy now</span>
        //             </Button>
        //         </div>
        //     </Card.Body>
        // </Card>
        <>
            <div className="card border-0 bg-light rounded-3" style={{height: cardWidth * 6 / 5, width: cardWidth}}>
                <a href={`/product?id=${obj.idproduct}`} style={{textDecoration: 'none'}}>
                    <img
                        src={products.product_image}
                        alt={products.product_name}
                        className="card-img-top object-fit-cover"
                        style={{width: '100%', height: '100%'}}
                    />
                </a>
                <div className="card-body">
                    {/* Price and Name in the same line */}
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title m-0 text-truncate" style={{maxWidth: '70%'}}>
                            {products.product_name}
                        </h5>
                        <span className="fw-bold fs-5">${configurations.price}</span>
                    </div>

                    {/* Truncated Description */}
                    <p className="card-text text-truncate" style={{maxWidth: '100%'}}>
                        {descriptions.title_description}
                    </p>

                    {/* Rating and Buy Button */}
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Rating Section */}
                        <div className="text-warning fs-4">
                            {renderStars(averageScore)}
                        </div>
                        {/* Buy Button */}
                        <button className="btn btn-primary d-flex align-items-center" onClick={handleAddToCart}>
                            <i className='bx bxs-cart-add me-2'></i>
                            {/*<span>Buy now</span>*/}
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>
            <NotifySuccess
                title="Add to cart successfully"
                message="Sản phẩm đã được thêm vào giỏ hàng!"
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
            />
        </>
    );
}

export default ProductItem;

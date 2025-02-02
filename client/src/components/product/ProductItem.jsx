import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

import NotifySuccess from "../modal/notice/NotifySuccess.jsx";
import RatingStar from "./RatingStar.jsx";

export default function ProductItem(product, state) {
    const [descriptions, setArray] = useState([]);
    const [configurations, setconfig] = useState([]);
    const [ratings, setRating] = useState([]);
    const [products, setProduct] = useState([]);
    const [carts, setCart] = useState();
    const [colors, setColor] = useState();

    const [properties, setProperties] = useState([]);

    const [showSuccess, setShowSuccess] = useState(false);

    var obj = product.obj;
    // console.log(obj)
    const token = localStorage.getItem('token');

    const getProperties = () => {
        try {
            const response = axios.get(`http://localhost:5172/products/load-properties/${obj.idproduct}`);

            setProperties(response.data);
            console.log(response.data)
        } catch (error) {

        }
    }

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
        fetchProductColor();
        fetchCart();
        // getProperties()
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
    // const cardWidth = state;
    // const imageHeight = (1 / 8) * cardWidth;

    return (
        <>
            <div
                className="card border-0 bg-light rounded-3"
                // style={{height: cardWidth * 6 / 5, width: cardWidth}}
            >
                <Link to={`/product?id=${obj.idproduct}`} style={{textDecoration: 'none'}}>
                    <img
                        src={products.product_image}
                        alt={products.product_name}
                        className="card-img-top object-fit-cover w-100 h-100"
                    />
                </Link>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title m-0 text-truncate" style={{maxWidth: '70%'}}>
                            {`${products.brand} ${products.product_name}`}
                        </h5>
                        <span className="fw-bold fs-5">${configurations.price}</span>
                    </div>
                    <p className="card-text text-truncate" style={{maxWidth: '100%'}}>
                        {descriptions.title_description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-warning fs-4">
                            {/*{renderStars(averageScore)}*/}
                            <RatingStar rating={averageScore} />
                        </div>
                        <button className="btn btn-primary d-flex align-items-center" onClick={handleAddToCart}>
                            <i className='bx bxs-cart-add me-2'></i>
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

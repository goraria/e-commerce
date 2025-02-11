import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

import RatingStar from "./RatingStar.jsx";
import { NotifyModal } from "../modal/notice/NotifyModal.jsx";
import apiHandler from "../../utils/apiHandler.jsx";

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
            const response = apiHandler.get(`/products/load-properties/${obj.idproduct}`);

            setProperties(response.data);
            console.log(response.data)
        } catch (error) {

        }
    }

    const fetchCart = async () => {
        try {
            const response = await apiHandler.get(`/cart/loadcart`,{
                headers: { Authorization: `Bearer ${token}` }
            });

            setCart(response.data)
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchProductDetails = async () => {
        try {
            const response = await apiHandler.get(`/products/load-productid/${obj.idproduct}`);

            setProduct(response.data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const fetchProductDecription = async () => {
        try {
            const response = await apiHandler.get(`/products/load-description/${obj.idproduct}`);

            setArray(response.data[0]); // Cập nhật thông tin sản phẩm từ backend
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchProductRating = async () => {
        try {
            const response = await apiHandler.get(`/products/load-rating/${obj.idproduct}`);

            setRating(response.data); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchProductColor = async () => {
        try {
            const response = await apiHandler.get(`/load-color/${obj.idproduct}`);

            setColor(response.data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const fetchProductConfiguration = async () => {
        try {
            const response = await apiHandler.get(`/products/load-configuration/${obj.idproduct}`);

            setconfig(response.data[0]); // Cập nhật thông tin sản phẩm từ backend
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
            const response = await apiHandler.put(`/cart/add-cartitem`, {
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
            <NotifyModal
                type="primary"
                title="Add to cart successfully"
                message="Sản phẩm đã được thêm vào giỏ hàng!"
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
            />
        </>
    );
}

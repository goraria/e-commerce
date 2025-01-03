import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

const OrderItem = ({ item }) => {
    const [product, setProduct] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [descriptions, setArray] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    // const handleCheckboxChange = () => {
    //     const newCheckedState = !isChecked;
    //     setIsChecked(newCheckedState);
    //     onCheckboxChange(default_config.price, newCheckedState); // Notify parent with price and new state
    // };

    console.log(item)

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-productid/${item.idproduct}`);
            const data = await response.json();
            setProduct(data[0]);
        } catch (error) {
            // console.error("Error fetching product details:", error);
        }
    };

    const fetchProductConfiguration = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-idconfiguration/${item.idconfiguration}`);
            const data = await response.json();
            setdefaultconfig(data[0]);
        } catch (error) {
            // console.error("Error fetching configuration:", error);
        }
    };

    useEffect(() => {
        // fetchProductDetails();
        // fetchProductConfiguration();
        // fetchProductDescription();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-lg-start justify-content-center align-items-center product-name">
                <div className="avatar-wrapper">
                    <div
                        className="avatar me-4 rounded-2 bg-label-secondary"
                        style={{width: 112, height: 112}}
                    >
                        <img
                            src={item.product.image}
                            className="rounded"
                            alt="item"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-left flex-column">
                    <h6 className="text-nowrap mb-2">{`${item.product.brand} ${item.product.name}`}</h6>
                    <h6 className="text-nowrap mb-0 mt-2">${item.configuration.price}</h6>
                    <h6 className="text-nowrap mb-0">x{item?.quantity}</h6>
                </div>
                <div className="text-right">
                    {/* <span>{product.price} đ</span><br /> */}
                    <span>x{item?.quantity}</span>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>{`${item?.product?.product_name}`}</strong>
                    {/*<div>{descriptions.title_description}</div>*/}
                </div>
                <div className="text-right">
                    {/* <span>{product.price} đ</span><br /> */}
                    <span>x{item?.quantity}</span>
                </div>
            </div>
        </>
    );
};

export default OrderItem;

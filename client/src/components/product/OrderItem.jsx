import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

const OrderItem = (Item ) => {
    const item = Item['Item'];
    const [product, setProduct] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [descriptions, setArray] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    // const handleCheckboxChange = () => {
    //     const newCheckedState = !isChecked;
    //     setIsChecked(newCheckedState);
    //     onCheckboxChange(default_config.price, newCheckedState); // Notify parent with price and new state
    // };

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-productid/${item.idproduct}`);
            const data = await response.json();
            setProduct(data[0]);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const fetchProductConfiguration = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-idconfiguration/${item.idconfiguration}`);
            const data = await response.json();
            setdefaultconfig(data[0]);
        } catch (error) {
            console.error("Error fetching configuration:", error);
        }
    };

    const fetchProductDescription = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-description/${item.idproduct}`);
            const data = await response.json();
            setArray(data[0]);
        } catch (error) {
            console.error("Error fetching description:", error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
        // fetchProductConfiguration();
        fetchProductDescription();
    }, []);

    return (
        <div key={product.id} className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <strong>{product.product_name}</strong>
                <div>{descriptions.title_description}</div>
            </div>
            <div className="text-right">
                {/* <span>{product.price} đ</span><br /> */}
                <span>x{item.quantity}</span>
            </div>
        </div>
    );
};

export default OrderItem;

import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import axios from 'axios';

const CardItem = ({ Item, onCheckboxChange, onRemoveItem }) => {
    const item = Item;
    const [product, setProduct] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [descriptions, setArray] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [quantity, setQuantity] = useState(item.quantity);
    const [reload, setReload] = useState(false);  // State to trigger re-render

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
        fetchProductConfiguration();
        fetchProductDescription();
    }, []);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onCheckboxChange(default_config.price, newCheckedState, item); // Notify parent with price and new state
    };

    const handleRemoveItem = async () => {
        try {
            const response = await axios.put(`http://localhost:5172/cart/remove-cartitem`, {
                idcartItem: item.idcart_item,
            });
            if (response.status === 201) {
                alert("Sản phẩm đã được xóa vào giỏ hàng!");
                onRemoveItem();
            }

        } catch (error) {
            console.error('Lỗi khi xóa vào giỏ hàng:', error);
        }
    };

    const handleUpdateQuantityItem = async (newQuantity) => {
        try {
            const response = await axios.put(`http://localhost:5172/cart/update-cartitem`, {
                idcartItem: item.idcart_item,
                quantity: newQuantity
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật vào giỏ hàng:', error);
        }
    };
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;

        setQuantity(newQuantity);
        handleUpdateQuantityItem(newQuantity);  // Update quantity in the backend
        console.log(newQuantity) // Update local quantity state
    };
    
    useEffect(() => {
        // fetchUser();
        // fetchAddress();
        // response();
    }, []);


    return (
        <>
            <div className="row align-items-center py-3" style={{ display: "flex", flexWrap: "wrap" }}>
                <Col xs={12} md={2} className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <Form.Check
                        type="checkbox"
                        className="me-3"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <Image
                        src={product.product_image}
                        alt="Product"
                        style={{ objectFit: "cover", width: 112, height: 112, borderRadius: "5px" }}
                    />
                </Col>
                <Col xs={12} md={6} className="d-flex flex-column justify-content-center text-md-start text-center" style={{ marginLeft: 10 }}>
                    <h5>{product.product_name}</h5>
                    <h6>{descriptions.title_description}</h6>
                    <h6>${default_config.price}</h6>
                </Col>
                <Col xs={12} md={2} className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <Button variant="light" onClick={() => handleQuantityChange(quantity - 1)}>
                        <i className='bx bx-minus'></i>
                    </Button>
                    <Form className="d-flex align-items-center justify-content-center mx-2">
                        <Form.Control
                            type="text"
                            placeholder="0"
                            // defaultValue={quantity}
                            value={quantity}
                            // onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            style={{ width: 56, textAlign: "center" }}
                        />
                    </Form>
                    <Button variant="light" onClick={() => handleQuantityChange(quantity + 1)}>
                        <i className='bx bx-plus'></i>
                    </Button>
                    <Button variant="light" onClick={handleRemoveItem}>
                        <i className='bx bx-trash'></i>
                    </Button>
                </Col>
            </div>
        </>
    );
};

export default CardItem;

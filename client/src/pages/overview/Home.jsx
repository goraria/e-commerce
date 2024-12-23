import {Button, Card, Carousel, Col, Container, Row, Image} from "react-bootstrap";
import React, {Component, useEffect, useState} from "react";

import ProductItem from "../../components/product/ProductItem.jsx";

import mbp from "../../assets/images/mbp.jpeg"
import mba from "../../assets/images/mba.jpeg"
import sfc from "../../assets/images/sfc.jpeg"
import xps from "../../assets/images/xps.jpeg"
import pri from "../../assets/images/pri.jpeg"
import uls from "../../assets/images/uls.jpeg"
import axios from "axios";
import Overview from "../../layouts/Overview.jsx";

const products = [
    { id: 1, name: 'Product 1', price: '5', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 1' },
    { id: 2, name: 'Product 2', price: '6', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 2' },
    { id: 3, name: 'Product 3', price: '7', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 3' },
    { id: 4, name: 'Product 4', price: '8', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 4' },
    { id: 5, name: 'Product 5', price: '9', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 5' },
    { id: 6, name: 'Product 6', price: '10', image: 'https://via.placeholder.com/300x200', description: 'Mô tả ngắn về Product 6' },
];

const banners = [
    { id: 1, name: mbp, alt: "First slide", title: "Sale Off 5%", description: "Developer love Mac" },
    { id: 2, name: mba, alt: "Second slide", title: "Sale Off 10%", description: "The best display ever in a laptop." },
    { id: 3, name: xps, alt: "Third slide", title: "Sale Off 12%", description: "Most beautiful Ultrabook" },
    { id: 4, name: pri, alt: "Fourth slide", title: "Sale Off 8%", description: "The best Workstation" },
    { id: 5, name: sfc, alt: "Fifth slide", title: "Sale Off 15%", description: "Surface x Copilot" },
    { id: 6, name: uls, alt: "Sixth slide", title: "Sale Off 20%", description: "XDR Display" },
]

const Home = () => {
    // const [users, setUsers] = useState([]);
    // const [count, setCount] = useState(0);
    // const [array, setArray] = useState([]);
    //
    // const fetchAPI = async () => {
    //     const response = await axios.get("http://localhost:5172/api")
    //     // console.log(response.data.name)
    //     setArray(response.data.name)
    // }
    //
    // useEffect(() => {
    //     fetchAPI()
    // }, []);

    return (
        <div>
            <Carousel>
                {
                    banners.map((banner, index) => (
                        <Carousel.Item key={index}>
                            <Image
                                className="d-block w-100 object-fit-cover"
                                src={banner.name}
                                alt={banner.alt}
                                style={{ height: '500px' }}
                            />
                            <Carousel.Caption>
                                <h3>{banner.title}</h3>
                                <p>{banner.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                )}
            </Carousel>
            <Overview mt={24}>
                <h3 className="text-center m-0">Spotlight</h3>
            </Overview>
            <Container className="my-4">
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col col-sm-12 col-md-6 col-lg-4 mb-4">
                            {/* <ProductItem obj={product} /> */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
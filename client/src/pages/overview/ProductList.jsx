import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Button, Row, Col, Stack} from 'react-bootstrap';
import CustomDropDown from "../../components/button/CustomDropDown";
import ProductItem from "../../components/product/ProductItem";
import Transitionbar from "../../layouts/Transitionbar.jsx";
import { useLocation } from 'react-router-dom';
import Overview from "../../layouts/Overview.jsx";

const categories = [
    { categorical: 'CPU', varient: 'primary', item: ['Intel core i3','Intel core i5','Intel core i7','Intel core i9','AMD Ryzen 5','AMD Ryzen 7','Apple M1'] },
    { categorical: 'RAM', varient: 'info', item: ['4','8','16','32','64'] },
    { categorical: 'GPU', varient: 'success', item: ['RTX 2060', 'RTX 3060','RTX 3090', 'RTX 4070','GTX 1660 Ti'] },
    { categorical: 'SSD', varient: 'warning', item: ['128', '256', '512', '1024', "2048"] },
    { categorical: 'Screen', varient: 'danger', item: ['15', '14', '12','16'] },
];

const ProductList = () => {
    const brands = ['Lenovo', 'Dell', 'HP', 'Acer', 'Microsoft', 'Asus', 'LG', 'Apple', 'Razer', 'Samsung']
    const [count, setCount] = useState(0);
    const [productList, setProductList] = useState([]);
    const location = useLocation();

    // Extract search query from URL
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search");
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:5172/products/load-product");
        setProductList(response.data);
    };

    const fetchProductByBrand = async (brand) => {
        const response = await axios.get(`http://localhost:5172/products/load-productBrand/${brand}`);
        setProductList(response.data);
    };

    const fetchProductByName= async () => {
        try {
           const response = await axios.get(`http://localhost:5172/products/load-productName/${searchQuery}`);
            setProductList(response.data);
        } catch (error) {
            console.log('chưa nhập tên tìm kiếm')
        }
        
    };

    useEffect(() => {
        fetchAPI();
        if(searchQuery != ''){
            fetchProductByName();
        }
    }, []);

    // Function to filter products based on dropdown selection
    const filterProducts = (category, selectedItem) => {
        const filteredProducts = async () => {
            const response = await axios.get(`http://localhost:5172/products/load-productCPU/${selectedItem}`);
            setProductList(response.data);
        };
        filteredProducts();
    };

    return (
        <>
            <Transitionbar/>
            {/*<Overview mt={168} me={56}>*/}
            {/*    <h2>Laptop</h2>*/}
            {/*    <h6 style={{padding: '0 16px'}}>*/}
            {/*        Laptop là một thiết bị máy tính có kích thước nhỏ gọn và di động...*/}
            {/*    </h6>*/}
            {/*    <Row className="justify-content-center my-3">*/}
            {/*        <Container style={{padding: '0 16px'}}>*/}
            {/*            {['Lenovo', 'Dell', 'HP', 'Acer', 'Microsoft', 'Asus', 'LG', 'Apple', 'Razer', 'Samsung'].map((brand, index) => (*/}
            {/*                <Button*/}
            {/*                    variant="outline-primary"*/}
            {/*                    key={index}*/}
            {/*                    // style={{margin: '0px 16px 16px 0px'}}*/}
            {/*                    className="me-3"*/}
            {/*                    onClick={() => fetchProductByBrand(brand)} // Call function with brand name*/}
            {/*                >*/}
            {/*                    {brand}*/}
            {/*                </Button>*/}
            {/*            ))}*/}
            {/*        </Container>*/}
            {/*    </Row>*/}
            {/*</Overview>*/}
            {/*<Overview mt={56} me={56}>*/}
            {/*    <h2>Chọn theo tiêu chí</h2>*/}
            {/*    <h6 style={{padding: '0 16px'}}>*/}
            {/*        Lọc theo các tiêu chí...*/}
            {/*    </h6>*/}
            {/*    <Row className="justify-content-center my-3">*/}
            {/*        <Container style={{padding: '0 16px'}}>*/}
            {/*            {categories.map((category, index) => (*/}
            {/*                <CustomDropDown key={index} category={category} onSelect={filterProducts}/>*/}
            {/*            ))}*/}
            {/*        </Container>*/}
            {/*    </Row>*/}
            {/*</Overview>*/}
            <Overview>
                <h5 className="card-title">Laptop</h5>
                <h6 className="card-subtitle text-muted">
                    Laptop is best mobile device to work...
                </h6>
                <hr/>
                <row className="justify-content-center my-3">
                    <Stack direction="horizontal" gap={3}>
                        {brands.map((brand, index) => (
                            <button
                                key={index}
                                className="btn btn-outline-primary"
                                onClick={() => fetchProductByBrand(brand)}
                            >
                                {brand}
                            </button>
                        ))}
                    </Stack>
                </row>
            </Overview>
            <Overview>
                <h5 className="card-title">Sort by</h5>
                <h6 className="card-subtitle text-muted">
                    Choose one of config to sort...
                </h6>
                <hr/>
                <row className="justify-content-center my-3">
                    <Stack direction="horizontal" gap={3}>
                        {categories.map((category, index) => (
                            <CustomDropDown key={index} category={category} onSelect={filterProducts}/>
                        ))}
                    </Stack>
                </row>
            </Overview>
            <Overview>
                <h3 className="text-center m-0">Spotlight</h3>
            </Overview>

            <div className="container">
                {/*<h2 className="text-center mb-4">Spotlight</h2>*/}
                <Row>
                    {productList.map(product => (
                        <div key={product.idproduct} className="col col-xxl-3 col-md-6 col-sm-12 mb-4">
                            <ProductItem obj={product} state={count}/>
                        </div>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default ProductList;

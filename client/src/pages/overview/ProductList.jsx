import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Row, Col, Stack } from 'react-bootstrap';
import { SelectSortButton } from "../../components/button/SelectSortButton.jsx";
import ProductItem from "../../components/product/ProductItem";
import Transitionbar from "../../layouts/Transitionbar.jsx";
import Overview from "../../layouts/Overview.jsx";
import apiHandler from "../../utils/apiHandler.jsx";
import { BrandButton } from "../../components/button/BrandButton.jsx";

export default function ProductList() {
    const categories = [
        { categorical: 'CPU', variant: 'primary', item: ['Intel core i3','Intel core i5','Intel core i7','Intel core i9','AMD Ryzen 5','AMD Ryzen 7','Apple M1'] },
        { categorical: 'RAM', variant: 'info', item: ['4','8','16','32','64'] },
        { categorical: 'GPU', variant: 'success', item: ['RTX 2060', 'RTX 3060','RTX 3090', 'RTX 4070','GTX 1660 Ti'] },
        { categorical: 'SSD', variant: 'warning', item: ['128', '256', '512', '1024', "2048"] },
        { categorical: 'Screen', variant: 'danger', item: ['15', '14', '12','16'] },
    ];

    const brands = ['Lenovo', 'Dell', 'HP', 'Acer', 'Microsoft', 'Asus', 'LG', 'Apple', 'Razer', 'Samsung']
    const [count, setCount] = useState(0);
    const [productList, setProductList] = useState([]);
    const location = useLocation();

    // Extract search query from URL
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search");
    const fetchAPI = async () => {
        const response = await apiHandler.get("/products/load-product");
        setProductList(response.data);
    };

    const fetchProductByBrand = async (brand) => {
        const response = await apiHandler.get(`/products/load-productBrand/${brand}`);
        setProductList(response.data);
    };

    const fetchProductByName= async () => {
        try {
           const response = await apiHandler.get(`/products/load-productName/${searchQuery}`);
            setProductList(response.data);
        } catch (error) {
            // console.log('chưa nhập tên tìm kiếm')
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
            const response = await apiHandler.get(`/products/load-productCPU/${selectedItem}`);
            setProductList(response.data);
        };
        filteredProducts();
    };

    return (
        <>
            <Transitionbar/>
            <Overview>
                <h5 className="card-title">Laptop</h5>
                <h6 className="card-subtitle text-muted">
                    Laptop is best mobile device to work...
                </h6>
                <hr className="mb-0"/>
                {/*<Row className="justify-content-center">*/}
                {/*    <Stack direction="horizontal" gap={3}>*/}
                {/*        {brands.map((brand, index) => (*/}
                {/*            <button*/}
                {/*                key={index}*/}
                {/*                className="btn btn-outline-primary"*/}
                {/*                onClick={() => fetchProductByBrand(brand)}*/}
                {/*            >*/}
                {/*                {brand}*/}
                {/*            </button>*/}
                {/*        ))}*/}
                {/*    </Stack>*/}
                {/*</Row>*/}
                <div className="demo-inline-spacing">
                    {/*row justify-content-center*/}
                    {/*<Stack direction="horizontal" gap={3}>*/}
                    {/*    {categories.map((category, index) => (*/}
                    {/*        <SelectSortButton key={index} category={category} onSelect={filterProducts}/>*/}
                    {/*    ))}*/}
                    {/*</Stack>*/}

                    {brands.map((brand, index) => (
                        <BrandButton
                            key={index}
                            brand={brand}
                            onSelect={filterProducts}
                        />
                    ))}
                </div>
            </Overview>
            <Overview>
                <h5 className="card-title">Sort by</h5>
                <h6 className="card-subtitle text-muted">
                    Choose one of config to sort...
                </h6>
                <hr className="mb-0"/>
                <div className="demo-inline-spacing">
                    {/*row justify-content-center*/}
                    {/*<Stack direction="horizontal" gap={3}>*/}
                    {/*    {categories.map((category, index) => (*/}
                    {/*        <SelectSortButton key={index} category={category} onSelect={filterProducts}/>*/}
                    {/*    ))}*/}
                    {/*</Stack>*/}

                    {categories.map((category, index) => (
                        <SelectSortButton
                            key={index}
                            categorical={category.categorical}
                            variant={category.variant}
                            items={category.item}
                            onSelect={filterProducts}
                        />
                    ))}
                </div>
            </Overview>
            <Overview>
                <h3 className="text-center m-0">Spotlight</h3>
            </Overview>

            <div className="container">
                {/*<h2 className="text-center mb-4">Spotlight</h2>*/}
                <div className="row">
                    {productList.map(product => (
                        <div key={product.idproduct} className="col col-sm-12 col-md-6 col-xl-3 col-lg-4 mb-4">
                            <ProductItem obj={product} state={count}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

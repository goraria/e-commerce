import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Row, Col, Stack, Pagination, Form } from 'react-bootstrap';
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
        const response = await apiHandler.get(`/products/load-product-brand/${brand}`);
        setProductList(response.data);
    };

    const fetchProductByName= async () => {
        try {
            const response = await apiHandler.get(`/products/load-product-name/${searchQuery}`);
            setProductList(response.data);
        } catch (error) {
            // console.log('chưa nhập tên tìm kiếm')
        }
    };

    useEffect(() => {
        fetchAPI();
        if(searchQuery != ''){
            // fetchProductByName();
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
                <div className="demo-inline-spacing">
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
                            <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export function ProductListc() {
    const productsPerPage = 8; // Số sản phẩm mỗi trang

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
    const [currentPage, setCurrentPage] = useState(1);
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

    const fetchProductByName = async () => {
        try {
            const response = await apiHandler.get(`/products/load-productName/${searchQuery}`);
            setProductList(response.data);
        } catch (error) {
            // Handle error nếu không tìm thấy
        }
    };

    useEffect(() => {
        fetchAPI();
        if (searchQuery != '') {
            fetchProductByName();
        }
    }, []);

    // Hàm lọc sản phẩm theo category, brand, v.v.
    const filterProducts = (category, selectedItem) => {
        const filteredProducts = async () => {
            const response = await apiHandler.get(`/products/load-productCPU/${selectedItem}`);
            setProductList(response.data);
            setCurrentPage(1); // Reset về trang 1 sau khi lọc
        };
        filteredProducts();
    };

    // Tính toán chỉ số sản phẩm hiển thị cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(productList.length / productsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Transitionbar/>
            <Overview>
                <h5 className="card-title">Laptop</h5>
                <h6 className="card-subtitle text-muted">
                    Laptop is best mobile device to work...
                </h6>
                <hr className="mb-0"/>
                {brands.map((brand, index) => (
                    <BrandButton
                        key={index}
                        brand={brand}
                        onSelect={filterProducts}
                    />
                ))}
            </Overview>
            <Overview>
                <h5 className="card-title">Sort by</h5>
                <h6 className="card-subtitle text-muted">
                    Choose one of config to sort...
                </h6>
                <hr className="mb-0"/>
                {categories.map((category, index) => (
                    <SelectSortButton
                        key={index}
                        categorical={category.categorical}
                        variant={category.variant}
                        items={category.item}
                        onSelect={filterProducts}
                    />
                ))}
            </Overview>
            <Overview>
                <h3 className="text-center m-0">Spotlight</h3>
            </Overview>

            <div className="container">
                <div className="row">
                    {currentProducts.map(product => (
                        <div key={product.idproduct} className="col col-sm-12 col-md-6 col-xl-3 col-lg-4 mb-4">
                            <ProductItem obj={product} state={count}/>
                        </div>
                    ))}
                </div>
                {/* Phần phân trang */}
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <Button
                                variant="outline-primary"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                                <Button variant="outline-primary" onClick={() => paginate(number)}>
                                    {number}
                                </Button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <Button
                                variant="outline-primary"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export function ProductListx() {
    // State quản lý danh sách sản phẩm
    const [productList, setProductList] = useState([]);
    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const location = useLocation();

    // Nếu có search query từ URL
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("search");

    // Lấy dữ liệu sản phẩm từ API
    const fetchAPI = async () => {
        try {
            const response = await apiHandler.get("/products/load-product");
            setProductList(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchProductByName = async () => {
        try {
            const response = await apiHandler.get(`/products/load-productName/${searchQuery}`);
            setProductList(response.data);
        } catch (error) {
            console.error("Error fetching products by name:", error);
        }
    };

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            fetchProductByName();
        } else {
            fetchAPI();
        }
    }, [searchQuery]);

    // Nếu có logic lọc, bạn có thể thay đổi ở đây
    const filteredData = productList; // Hoặc dùng bộ lọc nếu cần

    // Tính chỉ số đầu và cuối của sản phẩm hiển thị cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Hàm render giao diện phân trang
    const renderPagination = () => {
        if (totalPages <= 1) return null;
        let paginationItems = [];

        // Nút First và Prev
        paginationItems.push(
            <Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />
        );
        paginationItems.push(
            <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        );

        // Nếu tổng số trang nhỏ hơn hoặc bằng 7 thì hiển thị tất cả các trang
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            // Nếu trang hiện tại ở đầu
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    paginationItems.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(
                    <Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            } else if (currentPage >= totalPages - 3) {
                // Nếu trang hiện tại ở cuối
                paginationItems.push(
                    <Pagination.Item key={1} onClick={() => paginate(1)}>
                        1
                    </Pagination.Item>
                );
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    paginationItems.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
            } else {
                // Nếu trang hiện tại nằm giữa
                paginationItems.push(
                    <Pagination.Item key={1} onClick={() => paginate(1)}>
                        1
                    </Pagination.Item>
                );
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    paginationItems.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
                paginationItems.push(
                    <Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            }
        }

        // Nút Next và Last
        paginationItems.push(
            <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        );
        paginationItems.push(
            <Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        );

        return <Pagination className="m-0">{paginationItems}</Pagination>;
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchQuery || ""}
                        onChange={(e) => {
                            // Nếu có xử lý tìm kiếm, set lại query hoặc gọi API tìm kiếm
                            // Ví dụ: update URL hoặc gọi fetchProductByName()
                        }}
                        style={{ width: 300 }}
                    />
                    <Form.Select
                        style={{ width: 100 }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={4}>4</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={70}>70</option>
                        <option value={100}>100</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {currentItems.map(product => (
                    <Col key={product.idproduct} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <ProductItem obj={product} />
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto">{renderPagination()}</Col>
            </Row>
        </Container>
    );
}

export function ProductListz() {
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
                            <ProductItem product={product} state={count}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

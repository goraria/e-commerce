import React, { Component, useState, useEffect, version } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Card, Image, ListGroup, Badge, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';

import Transitionbar from "../../layouts/Transitionbar.jsx";
import Overview from "../../layouts/Overview.jsx";
import ProductItem from "../../components/product/ProductItem.jsx";
import RatingStar from "../../components/product/RatingStar.jsx";
import RatingForm from "../../components/modal/form/RatingForm.jsx";
import MaintenancePage from "../misc/MaintenancePage.jsx";
import LoadingPage from "../misc/LoadingPage.jsx";
import Calendar from "react-calendar";
import { NotifyModal } from "../../components/modal/notice/NotifyModal.jsx";
import { renderRatingStar, renderStatusDelivery } from "../../utils/renderHandler.jsx";
import { formatDateTime, formatRatings } from "../../utils/formatHandler.jsx";
import apiHandler from "../../utils/apiHandler.jsx";
import {PaginationCustom} from "../../components/pagination/PaginationCustom.jsx";

export default function ProductPage() {
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [properties, setProperties] = useState([]);

    const [descriptions, setArray] = useState([]);
    const [configurations, setconfig] = useState([]);
    const [default_config, setdefaultconfig] = useState([]);
    const [colors, setcolor] = useState([]);
    const [ratings, setRating] = useState([]);
    const [products, setProduct] = useState([]);
    const [evaluate, setEvaluate] = useState(null);
    const [carts, setCart] = useState();
    const [similars, setSimilars] = useState([]);
    const [ChoosedColor, setChoosedColor] = useState(null);

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedItem, setSelectedItem] = useState(null);

    const [showEvaluate, setShowEvaluate] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        // setShowModal(true);
    };

    const getProperties = async () => {
        try {
            const response = await apiHandler.get(`/products/load-properties/${id}`);

            setProperties(response.data);
            console.log(response.data)
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    }

    // const fetchCart = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5172/cart/loadcart`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const data = await response.json();
    //         setCart(data)
    //     } catch (error) {
    //         // console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
    //     }
    // };

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-productid/${id}`);
            const data = await response.json();
            setProduct(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const fetchProductDecription = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-description/${id}`);
            const data = await response.json();
            setArray(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data[0])

        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchProductRating = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-rating/${id}`);
            const data = await response.json();
            setRating(data); // Cập nhật thông tin sản phẩm từ backend
            // setData(data);
            // console.log(data)
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu mô tả của sản phẩm:', error);
        }
    };

    const fetchProductColor = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-color/${id}`);
            const data = await response.json();
            setcolor(data); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data);
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const fetchProductConfiguration = async () => {
        try {
            const response = await fetch(`http://localhost:5172/products/load-configuration/${id}`);
            const data = await response.json();
            setconfig(data)
            setdefaultconfig(data[0]); // Cập nhật thông tin sản phẩm từ backend
            // console.log(data)
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const getSimilars = async () => {
        try {
            const response = await apiHandler.get(`/products/load-similarity/${id}`);
            // const response = await fetch(`http://localhost:5172/products/load-similarity/${id}`);
            // const data = await response.json();
            setSimilars(response.data)
            // setSimilars(data)
            // console.log(similars)
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    const handleLoadRating = async () => {
        if (!id || !token) return;

        try {
            const response = await apiHandler.post(
                '/products/load-rating',
                { idproduct: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                const data = response.data;
                // console.log('Loaded rating:', data); // Debug dữ liệu tải về
                setEvaluate(data);
            }
        } catch (err) {
            // console.error('Failed to load rating:', err);
            // setError(err.response ? err.response.data.message : 'Failed to load rating');
        }
    };

    const handleConfigurationChange = (config) => {
        setdefaultconfig(config);
    };

    // const [descriptions, setArray] = useState([]);
    // const currentUrl = window.location.href;
    // const url = new URL(currentUrl);
    // const params = new URLSearchParams(url.search);
    // const id = params.get('id');

    const handleColorSelect = (idcolor) => {
        setChoosedColor(idcolor); // Cập nhật idcolor đã chọn
        // console.log(idcolor)
    };

    const handleAddToCart = async () => {
        try {
            const response = await apiHandler.put(`/cart/add-cartitem`, {
                idproduct: parseInt(id),
                quantity: 1,
                idcolor: ChoosedColor,
                idconfiguration: default_config.idconfiguration,
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // if (response.status === 201) {
            //     // alert("Sản phẩm đã được thêm vào giỏ hàng!");
            //     setShowSuccess(true)
            // }
            setShowSuccess(true)
        } catch (error) {
            // console.error('Lỗi khi thêm vào giỏ hàng:', error);
            setShowWarning(true)
        }
    };

    const handleSelectItem = (id) => {
        if (selectedEntries.includes(id)) {
            setSelectedEntries(selectedEntries.filter(item => item !== id));
        } else {
            setSelectedEntries([...selectedEntries, id]);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allVisibleItems = filteredData.slice(indexOfFirstItem, indexOfLastItem).map(item => item.idrating);
            setSelectedEntries(allVisibleItems);
        } else {
            setSelectedEntries([]);
        }
    };

    // const filteredData = data.filter(item =>
    //     item.account?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredData = ratings

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getInitials = (name) => {
        const initials = name.split(" ").map(n => n[0]).join("");
        return initials;
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const calculateScore = (ratings) => {
        if (ratings) {
            const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
            const averageScore = totalScore / ratings.length;
            return averageScore
        } else {
            return 0
        }
    }

    useEffect(() => {
        fetchProductConfiguration();
        fetchProductDetails();
        fetchProductDecription();
        fetchProductRating();
        fetchProductColor();
        // fetchCart();


        // setData(ratings);
        getProperties()
        handleLoadRating()
        getSimilars();
        // calculateScore(ratings)
    }, [id]);

    if (!id || !properties.status) return <MaintenancePage/>;

    // if (!properties || !properties.idproduct) return <></>

    return (
        <>
            <Transitionbar/>
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 col-md-12 col-lg-8 align-items-center">
                        <div className="card p-0 mb-4">
                            <div className="d-flex justify-content-center">
                                <img
                                    className="d-block object-fit-cover w-100 h-100 rounded-4 bg-white"
                                    src={products.product_image}
                                    alt="Second slide"
                                />
                            </div>
                        </div>
                        <div className="card p-3 mb-4">
                            <Card.Body>
                                {/* Section: Cấu hình đặc điểm */}
                                <Card.Title>Cấu hình đặc điểm</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Loại CPU:</strong></Col>
                                            <Col md={8}>{default_config.cpu}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>RAM:</strong></Col>
                                            <Col md={8}>{default_config.ram}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>GPU:</strong></Col>
                                            <Col md={8}>{default_config.gpu}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Storage:</strong></Col>
                                            <Col md={8}>{default_config.storage}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Screen:</strong></Col>
                                            <Col md={8}>{default_config.screen}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={4}><strong>Resolution:</strong></Col>
                                            <Col md={8}>{default_config.resolution}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                                <Button variant="link" className="p-0">Xem cấu hình chi tiết</Button>
                            </Card.Body>
                        </div>
                        <div className="card p-3 mb-4">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h5>Bảo hành & đổi trả</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Bảo hành <strong>12 tháng tại chuỗi cửa
                                                hàng</strong></ListGroup.Item>
                                            <ListGroup.Item>Đổi mới trong 15 ngày đầu tiên</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </div>
                        <div className="card p-3 mb-4">
                            <Card.Body>
                                {/* Section: Cấu hình đặc điểm */}
                                <Card.Title> Mô tả sản phẩm</Card.Title>
                                <div className="mb-4 d-flex justify-content-center">
                                    <img
                                        className="d-block object-fit-cover w-100 h-100 rounded-4"
                                        src={products.product_image}
                                        alt="Second slide"
                                    />
                                </div>
                                <div>
                                    <p>{descriptions.img_description}</p>
                                    <h4>Thiết kế thời thượng, thuận tiện di chuyển</h4>
                                    <p>{descriptions.title_description}</p>
                                </div>
                                <div className="d-flex justify-content-center mb-4">
                                    {products.product_image ? (
                                        <div className="d-flex justify-content-center mb-4">
                                            <Image
                                                className="d-block object-fit-cover w-100 h-100 rounded-4"
                                                src={products.product_image}
                                                alt="Product image"
                                            />
                                        </div>
                                    ) : (
                                        <p>Image not available</p>
                                    )}
                                </div>
                                <div>
                                    <h4>Phù hợp với mọi tác vụ</h4>
                                    <p>{descriptions.sub_description}</p>
                                </div>
                            </Card.Body>
                        </div>
                        <div className="row mb-4 g-4">
                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body row widget-separator g-0">
                                        <div className="col-sm-5 border-shift border-end pe-sm-4">
                                            <h3 className="text-primary d-flex align-items-center gap-2 mb-2">
                                                {formatRatings(calculateScore(ratings))}
                                                <i className="bx bxs-star bx-sm"></i>
                                            </h3>
                                            <p className="h6 mb-2">Total 187 reviews</p>
                                            <p className="pe-2 mb-2">All reviews are from genuine customers</p>
                                            <span className="badge bg-label-primary mb-4 mb-sm-0">+5 This week</span>
                                            <hr className="d-sm-none"/>
                                        </div>

                                        <div
                                            className="col-sm-7 gap-2 text-nowrap d-flex flex-column justify-content-between ps-sm-4 pt-2 py-sm-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <small>5 Star</small>
                                                <div className="progress w-100 bg-label-primary"
                                                     style={{height: '8px'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width: '85%'}} aria-valuenow="61.50" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                                <small className="w-px-20 text-end">124</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <small>4 Star</small>
                                                <div className="progress w-100 bg-label-primary"
                                                     style={{height: '8px'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width: '50%'}} aria-valuenow="24" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                                <small className="w-px-20 text-end">40</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <small>3 Star</small>
                                                <div className="progress w-100 bg-label-primary"
                                                     style={{height: '8px'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width: '35%'}} aria-valuenow="12" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                                <small className="w-px-20 text-end">12</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <small>2 Star</small>
                                                <div className="progress w-100 bg-label-primary"
                                                     style={{height: '8px'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width: '18%'}} aria-valuenow="7" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                                <small className="w-px-20 text-end">7</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <small>1 Star</small>
                                                <div className="progress w-100 bg-label-primary"
                                                     style={{height: '8px'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width: '10%'}} aria-valuenow="2" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                                <small className="w-px-20 text-end">2</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body row">
                                        <div className="col-sm-5">
                                            <div className="mb-12">
                                                <h5 className="mb-2 text-nowrap">Reviews statistics</h5>
                                                <p className="mb-0">
                                                    <span className="me-2">12 New reviews</span>
                                                    <span className="badge bg-label-success">+8.4%</span>
                                                </p>
                                            </div>
                                            <div>
                                                <h6 className="mb-2 fw-normal">
                                                    <span className="text-success me-1">87%</span>Positive reviews
                                                </h6>
                                                <small>Weekly Report</small>
                                            </div>
                                        </div>
                                        <div
                                            className="col-sm-7 d-flex justify-content-sm-end align-items-end position-relative">
                                            <div id="reviewsChart" style={{minHeight: '175px'}}>
                                                <div id="apexchartsmsgmet3n"
                                                     className="apexcharts-canvas apexchartsmsgmet3n apexcharts-theme-light"
                                                     style={{width: '190px', height: '160px'}}>
                                                    <div className="apexcharts-legend"
                                                         style={{maxHeight: '80px'}}></div>
                                                    <div className="apexcharts-tooltip apexcharts-theme-light">
                                                        <div className="apexcharts-tooltip-title"></div>
                                                        <div className="apexcharts-tooltip-series-group order-1">
                                                            <span className="apexcharts-tooltip-marker"></span>
                                                            <div className="apexcharts-tooltip-text">
                                                                <div className="apexcharts-tooltip-y-group">
                                                                    <span
                                                                        className="apexcharts-tooltip-text-y-label"></span>
                                                                    <span
                                                                        className="apexcharts-tooltip-text-y-value"></span>
                                                                </div>
                                                                <div className="apexcharts-tooltip-goals-group">
                                                                    <span
                                                                        className="apexcharts-tooltip-text-goals-label"></span>
                                                                    <span
                                                                        className="apexcharts-tooltip-text-goals-value"></span>
                                                                </div>
                                                                <div className="apexcharts-tooltip-z-group">
                                                                    <span
                                                                        className="apexcharts-tooltip-text-z-label"></span>
                                                                    <span
                                                                        className="apexcharts-tooltip-text-z-value"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                        <div className="apexcharts-yaxistooltip-text"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="resize-triggers">
                                                <div className="expand-trigger">
                                                    <div style={{width: '386px', height: '176px'}}></div>
                                                </div>
                                                <div className="contract-trigger"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-datatable table-responsive">
                                <div className="dataTables_wrapper dt-bootstrap5 no-footer">
                                    <div className="card-header flex-column flex-md-row pb-0">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            {/*<div className="head-label text-center">*/}
                                            {/*    <h5 className="card-title mb-0">Statistics</h5>*/}
                                            {/*</div>*/}
                                            <div className="col-sm-12 col-md-6 d-flex">
                                                <div
                                                    className="dataTables_filter mb-0 mb-md-6 d-flex justify-content-center justify-content-md-end mt-n6 mt-md-0 me-3"> {/* col-sm-6 col-md-2 */}
                                                    <Form.Control
                                                        className="form-control"
                                                        type="search"
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={handleSearch}
                                                    />
                                                </div>
                                                <div className="dataTables_length">
                                                    <label
                                                        className="d-flex justify-content-left align-items-center">
                                                        <select
                                                            name="DataTables_Table_0_length"
                                                            aria-controls="DataTables_Table_0"
                                                            className="form-select" // ms-3 me-3
                                                            style={{width: "80px"}}
                                                            onChange={handleItemsPerPageChange}
                                                            value={itemsPerPage}
                                                        >
                                                            <option value="5">5</option>
                                                            <option value="10">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Table hover responsive
                                           className="table border-top dataTable no-footer dtr-column">
                                        <thead style={{height: 64}}>
                                        <tr>
                                            <th
                                                className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all"
                                                style={{verticalAlign: "middle", fontSize: 16, width: 18}}
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    onChange={handleSelectAll}
                                                    checked={selectedEntries.length === currentItems.length && currentItems.length > 0}
                                                />
                                            </th>
                                            {
                                                ["Reviewer", "Review"].map((item, index) => (
                                                    <th className="sorting" key={index}
                                                        style={{verticalAlign: "middle", fontSize: 13}}>
                                                        {item}
                                                    </th>
                                                ))
                                            }
                                            <th className="sorting"
                                                style={{verticalAlign: "middle", fontSize: 13, width: 180}}>Date
                                            </th>
                                            <th className="sorting"
                                                style={{verticalAlign: "middle", fontSize: 13, width: 128}}>Status
                                            </th>
                                            {/*<th className="sorting_disabled"*/}
                                            {/*    style={{verticalAlign: "middle", fontSize: 13, width: 128}}>Actions*/}
                                            {/*</th>*/}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr style={{height: 64}}>
                                            <td>
                                                <Form.Check
                                                    className="dt-checkboxes-cell"
                                                    type="checkbox"
                                                    checked={selectedEntries.includes()}
                                                    onChange={() => handleSelectItem()}
                                                />
                                            </td>
                                            <td>
                                                <div
                                                    className="d-flex justify-content-start align-items-center customer-name">
                                                    <div className="avatar-wrapper">
                                                        <div className="avatar me-4">{/* avatar-sm */}
                                                            <img
                                                                src="/assets/img/avatars/5.png"
                                                                alt="Avatar"
                                                                className="rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <a>
                                                            <span className="fw-medium text-primary">Braunschweig de Gorthenburg</span>
                                                        </a>
                                                        <small className="text-nowrap">
                                                            username | braunschweig@gorth.org
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="read-only-ratings ps-0 mb-1 jq-ry-container"
                                                     style={{width: '132px'}}>
                                                    <div className="jq-ry-group-wrapper">
                                                        {/*<div className="jq-ry-normal-group jq-ry-group">*/}
                                                        {/*    <i className="bx bxs-star text-warning"></i>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="jq-ry-rated-group jq-ry-group"*/}
                                                        {/*     style={{width: '38.6364%'}}>*/}
                                                        {/*    <i className="bx bxs-star"></i>*/}
                                                        {/*</div>*/}

                                                        <div
                                                            className="jq-ry-normal-group jq-ry-group text-warning mb-2">
                                                            {/*<RatingStar rating={1}/>*/}
                                                            {renderRatingStar(5)}
                                                        </div>
                                                    </div>
                                                    <p className="h6 mb-1 text-truncate">Good</p>
                                                    {/*<small className="text-break pe-3">*/}
                                                    {/*    Fusce consequat. Nulla nisl. Nunc nisl.*/}
                                                    {/*</small>*/}
                                                </div>
                                            </td>
                                            {/*<td className="sorting_1">*/}
                                            {/*    <div*/}
                                            {/*        className="d-flex justify-content-start align-items-center customer-name">*/}
                                            {/*        <div className="avatar-wrapper">*/}
                                            {/*            <div className="avatar me-4 rounded-2 bg-label-secondary">*/}
                                            {/*                <img src="../assets/img/categories/product-9.png"*/}
                                            {/*                     alt="Product-9" className="rounded"/>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*        <div className="d-flex flex-column">*/}
                                            {/*            <span*/}
                                            {/*                className="fw-medium text-nowrap text-heading">Air Jordan</span>*/}
                                            {/*            <small>Air Jordan is a line of basketball shoes produced by*/}
                                            {/*                Nike</small>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</td>*/}
                                            <td>{formatDateTime(new Date())}</td>
                                            <td>{renderStatusDelivery(3)}</td>
                                        </tr>
                                        {currentItems.map((item, index) => (
                                            <tr key={index} style={{height: 64}}>
                                                <td>
                                                    <Form.Check
                                                        className="dt-checkboxes-cell"
                                                        type="checkbox"
                                                        checked={selectedEntries.includes(item.idrating)}
                                                        onChange={() => handleSelectItem(item.idrating)}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-start align-items-center customer-name">
                                                        <div className="avatar-wrapper">
                                                            <div className="avatar me-4">{/* avatar-sm */}
                                                                <img
                                                                    src={item.reviewer?.avatar}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column">
                                                            <a>
                                                                <span className="fw-medium text-primary">
                                                                    {`${item.reviewer?.firstname} ${item.reviewer?.lastname}`}
                                                                </span>
                                                            </a>
                                                            <small className="text-nowrap">
                                                                {`${item.reviewer?.username} | ${item.reviewer?.email}`}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="read-only-ratings ps-0 mb-1 jq-ry-container"
                                                         style={{width: '132px'}}>
                                                        <div className="jq-ry-group-wrapper">
                                                            <div
                                                                className="jq-ry-normal-group jq-ry-group text-warning mb-2">
                                                                {/*<RatingStar rating={item.score}/>*/}
                                                                {renderRatingStar(item.score)}
                                                            </div>
                                                        </div>
                                                        <p className="h6 mb-1 text-truncate">{item.comment}</p>
                                                    </div>
                                                </td>
                                                <td>{formatDateTime(formatDateTime(item.rating_date))}</td>
                                                <td>{renderStatusDelivery(5)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    <div className="card-footer flex-column flex-md-row pb-0 pb-4">
                                        <div className="row">
                                            <div className="d-flex col-sm-12 col-md-6">
                                                <div
                                                    className="dataTables_info d-flex justify-content-start align-items-center">
                                                    <div className="text-center mt-2">
                                                        {/*{`Showing from ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, filteredData.length)} of ${filteredData.length} entries`}*/}
                                                        <span>Showing from </span>
                                                        <span className="text-primary">{indexOfFirstItem + 1}</span>
                                                        <span> to </span>
                                                        <span
                                                            className="text-primary">{Math.min(indexOfLastItem, filteredData.length)}</span>
                                                        <span> of </span>
                                                        <span className="text-primary">{filteredData.length}</span>
                                                        <span> entries</span>
                                                    </div>
                                                </div>
                                                <div className="ms-2 me-2"></div>
                                                <div
                                                    className="dataTables_select d-flex justify-content-start align-items-center">
                                                    <div className="text-center mt-2">
                                                        Selected {selectedEntries.length} entries
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                                                {/*{renderPagination()}*/}
                                                <PaginationCustom
                                                    currentPage={currentPage}
                                                    totalPages={totalPages}
                                                    onPageChange={setCurrentPage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-12 col-lg-4">
                        <div className="card p-3 position-sticky" style={{top: 24}}>
                            <div className="container px-3">
                                <div className="row mt-4">
                                    <div className="col">
                                        <h3>{`${products.brand} ${products.product_name}`}</h3>
                                        <p className="text-warning">
                                            {calculateScore(ratings)
                                                // <RatingStar rating={calculateScore(ratings)}/> //
                                                ? renderRatingStar(calculateScore(ratings))
                                                // <>{renderRatingStar(calculateScore(ratings))}<span className="ms-3">{calculateScore(ratings)}</span></>
                                                : renderRatingStar(0)
                                                // <>{renderRatingStar(0)}<span className="ms-3">No rating</span></>
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <h5>Configurations</h5>
                                        <Form>
                                            <div className="mb-3">
                                                {configurations.map((config, index) =>
                                                    <Form.Check
                                                        key={index}
                                                        type="radio"
                                                        label={config.cpu + " " + config.ram + "GB " + config.storage + "GB"}
                                                        name="version"
                                                        id="version1"
                                                        checked={config.idconfiguration === default_config.idconfiguration}
                                                        onChange={() => handleConfigurationChange(config)}
                                                    />
                                                )}
                                            </div>
                                            <h5>Colors</h5>
                                            <div className="d-flex gap-3 mb-3">
                                                {colors.map((colours, index) =>
                                                    <Button
                                                        key={index}
                                                        variant={colours.color}
                                                        // style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}}
                                                        className="shadow-sm"
                                                        onClick={() => handleColorSelect(colours.idcolor)}
                                                    >{colours.color}</Button>
                                                )}
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <h3 className="text-danger">${default_config.price}</h3>
                                        <h6 className="text-muted">
                                            <del>{default_config.price}</del>
                                            <span className="text-danger">-47%</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col col-sm-12 col-md-6 col-lg-6 mb-3">
                                        <Button
                                            className="w-100 me-2"
                                            variant="secondary"
                                            onClick={handleAddToCart}
                                        >Add to cart</Button>
                                    </div>
                                    <div className="col col-sm-12 col-md-6 col-lg-6 mb-3">
                                        <Button
                                            className="w-100"
                                            as={Link}
                                            to={"/pay/cart"}
                                            variant="danger"
                                        >Buy now</Button>
                                    </div>
                                </div>
                                <h5>Rating</h5>
                                <Button
                                    variant="primary"
                                    className="mb-3 w-100"
                                    onClick={() => {
                                        if (evaluate) {
                                            setShowEvaluate(true);
                                        } else {
                                            setShowWarning(true);
                                        }
                                    }}
                                >
                                    Evaluate
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Overview mt={4}>
                <h3 className="text-center m-0">Similar products</h3>
            </Overview>
            <div className="container">
                <div className="row">
                    {similars.map((product, index) =>
                        <div key={product.idproduct} className="col col-sm-12 col-md-6 col-xl-3 col-lg-4 mb-4">
                            <ProductItem product={product}/>
                        </div>
                    )}
                </div>
            </div>

            <RatingForm
                rate={evaluate}
                prod={products}
                show={showEvaluate}
                onHide={() => setShowEvaluate(false)}
                // onReload={handleLoadRating()}
            />
            <NotifyModal
                type="primary"
                title="Add to cart successfully"
                message="Product added to cart!"
                show={showSuccess}
                onHide={() => setShowSuccess(false)}
            />
            <NotifyModal
                type="warning"
                title="Not Allowed"
                message="You must login to use this feature!"
                show={showWarning}
                onHide={() => {
                    setShowWarning(false);
                    navigate('/auth/login');
                }}
            />
        </>
    )
}
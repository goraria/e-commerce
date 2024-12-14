import React, { Component, useEffect, useState } from "react";
// import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Button,
    Nav,
    Navbar,
    NavDropdown,
    Form,
    DropdownButton,
    ButtonGroup,
} from "react-bootstrap";
import axios from "axios";

import DropdownConfig from "../components/button/DropdownConfig.jsx";
import SaveChange from "../components/modal/notify/SaveChange.jsx";
import getGreetingMessage from "../utils/greetingHandler.js";
import Message from "../components/bar-elements/Message.jsx";
import Basket from "../components/bar-elements/Basket.jsx";
import Notification from "../components/bar-elements/Notification.jsx";
import Activitybar from "./Activitybar.jsx";
import Outbar from "./Outbar.jsx";
// import { search } from '../../../server/src/routes/ProductRouter.js';

const dropdownContains = [
    {
        id: 1,
        // title: <FontAwesomeIcon icon={faShoppingCart} />,
        align: "end",
        className: "ms-2 me-2",
        item: [
            { key: 1, name: "Profile", href: "#" },
            { key: 2, name: "Bill", href: "#" },
            { key: 2, name: "Full Cart", href: "#" },
        ],
    },
    {
        id: 2,
        // title: <i className='bx bx-user' ></i>,
        align: "end",
        className: "",
        item: [
            { key: 1, name: "Profile", href: "#" },
            { key: 2, name: "Bill", href: "#" },
            { key: 2, name: "Logout", href: "#" },
        ],
    },
];

const notifies = [
    { id: 1, title: "Congratulation Lettie 🎉", content: "Won the monthly best seller gold badge", time: "1h ago" },
    { id: 2, title: "CPU is running high", content: "CPU Utilization Percent is currently at 88.63%,", time: "12h" },
    { id: 3, title: "Monthly report is generated", content: "July monthly financial report is generated", time: "1d" },
    { id: 4, title: "Whoo! You have new order 🛒", content: "ACME Inc. made new order $1,154", time: "1 day ago" },
    { id: 5, title: "Application has been approved 🚀", content: "Your ABC project application has been approved.", time: "2 days ago" },
]

const messages = [
    { id: 1, title: "Charles Franklin", content: "Accepted your connection", time: "1h ago" },
    { id: 2, title: "New Message ✉️", content: "You have new message from Natalie", time: "12hr ago" },
    { id: 3, title: "Send connection request", content: "Peter sent you connection request", time: "1h ago" },
    { id: 4, title: "New message from Jane", content: "Your have new message from Jane", time: "1 day ago" },
    { id: 5, title: "Japtor", content: "Your ABC project application has been approved.", time: "2 days ago" },
]

const baskets = [
    { id: 1, name: "Name", description: "Accepted your connection", quantity: 3 },
    { id: 2, name: "Keychron K2 Max", description: "You have new message from Natalie", quantity: 4 },
    { id: 3, name: "MacBook Pro 16' M4 Pro", description: "New Arrived", quantity: 2 },
    { id: 4, name: "DELL Precision 16' 5690", description: "Best Workstation", quantity: 1 },
    { id: 5, name: "Japtor", description: "Your ABC project application has been approved.", quantity: 2 },
]

const Header0 = ({ role }) => {
    const [loading, setLoading] = useState(true);
    const setHeader = () => {
        if (role === 1) {
            return (
                <>
                    <Navbar/>
                </>
            )
        } else if (role === 0) {
            return (
                <>
                    <Activitybar/>
                </>
            )
        } else {
            return (
                <>
                    <Outbar/>
                </>
            )
        }
    }

    useEffect(() => {
        // setHeader()
    }, [loading])

    if (loading) return <div>Load</div>;

    return (
        <>
            {setHeader()}
        </>
    )
}

const Header = () => {
    const [showModalHeader, setShowModalHeader] = useState(false);
    const [submit, setSubmit] = useState({search: ""});

    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
    });
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    const token = localStorage.getItem("token");

    const authenticationCheck = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:5172/authentication/check",
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            setAuth({
                isAuthenticated: true,
                role: response.data.role,
            });
        } catch (error) {
            setAuth({
                isAuthenticated: false,
                role: null,
            });
            localStorage.removeItem("token");
            navigate("/auth/error");
        } finally {
            setLoading(false); // Dừng loading sau khi fetch
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.post(
                "http://localhost:5172/authentication/logout",
                {},
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            localStorage.removeItem("token"); // Xóa JWT
            setShowModalHeader(false);
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleSearch = (event) => {
        try {
            event.preventDefault();
            navigate(`/search?search=${submit.search}`);
            setTimeout(() => {
                window.location.reload();
            }, 50);
            console.log("tìm kiếm thành công");
        } catch (error) {
            console.log("tìm kiếm ko thành công", error);
        }
    };

    const handleChange = (event) => {
        setSubmit({...submit, [event.target.name]: event.target.value});
    };

    useEffect(() => {
        authenticationCheck();
    }, []);

    return (
        <>
            <nav
                className="light bg-body-tertiary layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme mb-4">
                <div className="container p-0">
                    <Link
                        className="navbar-brand app-brand-text demo menu-text fw-bold text-capitalize"
                        to={"/"}
                    >
                        <span>Cipher</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                <h5 className="m-0">Product</h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                <h5 className="m-0">Contact</h5>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                <h5 className="m-0">About</h5>
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    <li className="nav-item navbar-search-wrapper me-2 me-xl-0">
                        <a className="nav-link search-toggler" href="#">
                            <i className="bx bx-search bx-sm"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                        <a
                            className="nav-link dropdown-toggle hide-arrow"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bx bx-globe bx-sm"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link
                                    className="dropdown-item active"
                                    to="#"
                                    data-language="en"
                                    data-text-direction="ltr"
                                >
                                    <span>English</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                    data-language="fr"
                                    data-text-direction="ltr"
                                >
                                    <span>French</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                    data-language="ar"
                                    data-text-direction="rtl"
                                >
                                    <span>Arabic</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                    data-language="de"
                                    data-text-direction="ltr"
                                >
                                    <span>German</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                            <i className="bx bx-sun bx-sm"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                            <li>
                                <Link className="dropdown-item" to="#" data-theme="light">
                                    <span className="align-middle"><i className="bx bx-sun bx-sm me-2"></i>Light</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#" data-theme="dark">
                                    <span className="align-middle"><i className="bx bx-moon bx-sm me-2"></i>Dark</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#" data-theme="system">
                                    <span className="align-middle"><i
                                        className="bx bx-desktop bx-sm me-2"></i>System</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown"
                           data-bs-auto-close="outside"
                           aria-expanded="false">
                            <i className="bx bx-grid-alt bx-sm"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end p-0" style={{width: 352}}>
                            <div className="dropdown-menu-header border-bottom">
                                <div className="dropdown-header d-flex align-items-center py-3">
                                    <h6 className="mb-0 me-auto">Shortcuts</h6>
                                    <a href="#" className="dropdown-shortcuts-add py-2" data-bs-toggle="tooltip"
                                       data-bs-placement="top"
                                       aria-label="Add shortcuts" data-bs-original-title="Add shortcuts">
                                        <i className="bx bx-plus-circle text-heading"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="dropdown-shortcuts-list scrollable-container ps">
                                <div className="row row-bordered overflow-visible g-0">
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-calendar bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Calendar </a>
                                        <small>Appointments</small>
                                    </div>
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-food-menu bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Invoice App </a>
                                        <small>Manage Accounts</small>
                                    </div>
                                </div>
                                <div className="row row-bordered overflow-visible g-0">
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-user bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> User App </a>
                                        <small>Manage Users</small>
                                    </div>
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-check-shield bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Role Management </a>
                                        <small>Permission</small>
                                    </div>
                                </div>
                                <div className="row row-bordered overflow-visible g-0">
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-pie-chart-alt-2 bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Dashboard </a>
                                        <small>User Dashboard</small>
                                    </div>
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-cog bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Setting </a>
                                        <small>Account Settings</small>
                                    </div>
                                </div>
                                <div className="row row-bordered overflow-visible g-0">
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-help-circle bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> FAQs </a>
                                        <small>FAQs &amp; Articles</small>
                                    </div>
                                    <div className="dropdown-shortcuts-item col">
                                        <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                            <i className="bx bx-window-open bx-26px text-heading"></i>
                                        </span>
                                        <a href="#" className="stretched-link"> Modals </a>
                                        <small>Useful Popups</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown"
                           data-bs-auto-close="outside"
                           aria-expanded="false">
                            <span className="position-relative">
                                <i className="bx bx-bell bx-sm"></i>
                                <span
                                    className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-0" style={{width: 352}}>
                            <li className="dropdown-menu-header border-bottom">
                                <div className="dropdown-header d-flex align-items-center py-3">
                                    <h6 className="mb-0 me-auto">Notification</h6>
                                    <div className="d-flex align-items-center h6 mb-0">
                                        <span className="badge bg-label-primary me-2">8 New</span>
                                        <a href="#" className="dropdown-notifications-all p-2" data-bs-toggle="tooltip"
                                           data-bs-placement="top" aria-label="Mark all as read"
                                           data-bs-original-title="Mark all as read">
                                            <i className="bx bx-envelope-open text-heading"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown-notifications-list scrollable-container ps">
                                <ul className="list-group list-group-flush">
                                    {
                                        notifies.map((noty, index) => (
                                            <Notification key={index} notify={noty}/>
                                        ))
                                    }
                                    {
                                        messages.map((mess, index) => (
                                            <Message key={index} message={mess}/>
                                        ))
                                    }
                                </ul>
                            </li>
                            <li className="border-top">
                                <div className="d-grid p-4">
                                    <a className="btn btn-primary d-flex" href="#">
                                        <small className="align-middle"> View all notifications </small>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown"
                           data-bs-auto-close="outside"
                           aria-expanded="false">
                            <span className="position-relative">
                                <i className="bx bx-cart bx-sm"></i>
                                <span
                                    className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-0" style={{width: 352}}>
                            <li className="dropdown-menu-header border-bottom">
                                <div className="dropdown-header d-flex align-items-center py-3">
                                    <h6 className="mb-0 me-auto">Cart</h6>
                                    <div className="d-flex align-items-center h6 mb-0">
                                        <span className="badge bg-label-primary me-2">8 Items</span>
                                        <a href="#" className="dropdown-notifications-all p-2" data-bs-toggle="tooltip"
                                           data-bs-placement="top" aria-label="Find product"
                                           data-bs-original-title="Find product">
                                            <i className="bx bx-cart-download bx-sm text-heading"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="dropdown-notifications-list scrollable-container ps">
                                <ul className="list-group list-group-flush">
                                    {
                                        baskets.map((bask, index) => (
                                            <Basket key={index} bask={bask}/>
                                        ))
                                    }
                                </ul>
                            </li>
                            <li className="border-top">
                                <div className="d-grid p-4">
                                    <Link className="btn btn-primary d-flex" to={"/user/cart"}>
                                        <small className="align-middle"> View full cart </small>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item navbar-dropdown dropdown-user dropdown me-2 me-xl-0">
                        <a
                            aria-label="dropdown profile avatar"
                            className="nav-link dropdown-toggle hide-arrow"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <div className="avatar avatar-online">
                                <img
                                    src="../assets/img/avatars/1.png"
                                    className="w-px-40 h-auto rounded-circle"
                                    alt="avatar-image"
                                    aria-label="Avatar Image"
                                />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a
                                    aria-label="go to profile"
                                    className="dropdown-item"
                                    href="#"
                                >
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img
                                                    src="../assets/img/avatars/1.png"
                                                    className="w-px-40 h-auto rounded-circle"
                                                    alt="avatar-image"
                                                    aria-label="Avatar Image"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-medium d-block">Schweitzenburg</span>
                                            <small className="text-muted">Administrator</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link
                                    to={"/user/profile"}
                                    aria-label="go to profile"
                                    className="dropdown-item"
                                >
                                    <span className="align-middle"><i
                                        className="bx bx-user bx-sm me-2"></i>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/user/address"}
                                    aria-label="address"
                                    className="dropdown-item"
                                >
                                    <span className="align-middle"><i
                                        className="bx bx-location-plus bx-sm me-2"></i>Address</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/user/bill"}
                                    aria-label="bill"
                                    className="dropdown-item"
                                >
                                    <span className="align-middle"><i
                                        className="bx bx-receipt bx-sm me-2"></i>Bill</span>
                                </Link>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link
                                    to={"/user/faq"}
                                    aria-label="faq"
                                    className="dropdown-item"
                                >
                                    <span className="align-middle"><i
                                        className="bx bx-help-circle bx-sm me-2"></i>FAQ</span>
                                </Link>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setShowModalHeader(true)}
                                    variant="light"
                                    aria-label="click to log out"
                                    className="dropdown-item"
                                    to={"#"}
                                >
                                    <span className="align-middle"><i className="bx bx-power-off bx-sm me-2"></i>Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="navbar-search-wrapper search-input-wrapper container-xxl d-none">
                    <span className="twitter-typeahead container-xxl">
                        <input type="text" className="form-control search-input border-0 container-xxl tt-input"
                               placeholder="Search..."
                               aria-label="Search..." autoComplete="off" spellCheck="false" dir="auto"/>
                        <div className="tt-menu navbar-search-suggestion ps">
                            <div className="tt-dataset tt-dataset-pages"></div>
                            <div className="tt-dataset tt-dataset-files"></div>
                            <div className="tt-dataset tt-dataset-members"></div>
                        </div>
                    </span>
                    <i className="bx bx-x bx-md search-toggler cursor-pointer"></i>
                </div>
            </nav>

            {/*<Navbar className="bg-dark bg-body-tertiary"*/}
            {/*        fixed="top" expand="lg"*/}
            {/*        style={{height: 56}}> /!** data-bs-theme="dark" *!/*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand className="app-brand-text demo menu-text fw-bold"*/}
            {/*                      style={{textTransform: 'capitalize'}} href="/">Bill Cipher</Navbar.Brand>*/}
            {/*        <Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
            {/*        <Navbar.Collapse id="basic-navbar-nav">*/}
            {/*            <Nav className="me-auto">*/}
            {/*                <Nav.Link as={Link} to={'/search'}>Product</Nav.Link>*/}
            {/*                <Nav.Link as={Link} to={'/contact'}>Contact</Nav.Link>*/}
            {/*                <Nav.Link as={Link} to={'/about'}>About</Nav.Link>*/}
            {/*            </Nav>*/}
            {/*            <Nav className="ms-auto d-flex">*/}
            {/*                <Form className="d-flex" onSubmit={handleSearch}>*/}
            {/*                    <Form.Control*/}
            {/*                        type="search"*/}
            {/*                        placeholder="Search"*/}
            {/*                        className="me-2"*/}
            {/*                        aria-label="Search"*/}
            {/*                        name="search"*/}
            {/*                        value={submit.search}*/}
            {/*                        onChange={handleChange}*/}
            {/*                    />*/}
            {/*                    <Button as={Link} to={'/search'} variant="outline-primary"><FontAwesomeIcon*/}
            {/*                        icon={faSearch}/></Button>*/}
            {/*                </Form>*/}
            {/*                {token ? auth.role === 0 ?*/}
            {/*                        <>*/}
            {/*                            <DropdownButton*/}
            {/*                                as={ButtonGroup}*/}
            {/*                                align={{lg: 'end'}}*/}
            {/*                                variant={'primary'}*/}
            {/*                                title={<FontAwesomeIcon icon={faShoppingCart}/>}*/}
            {/*                                className="ms-2 me-2">*/}
            {/*                                <NavDropdown.Item as={Link} to={"/#"}>Schweitzenburg</NavDropdown.Item>*/}
            {/*                                <NavDropdown.Item as={Link} to={"#"}>Braunschweig</NavDropdown.Item>*/}
            {/*                                <NavDropdown.Divider/>*/}
            {/*                                <NavDropdown.Item as={Link} to={"/user/cart"}>Full Cart</NavDropdown.Item>*/}
            {/*                            </DropdownButton>*/}
            {/*                        </> :*/}
            {/*                        <>*/}
            {/*                            <DropdownButton*/}
            {/*                                as={ButtonGroup}*/}
            {/*                                align={{lg: 'end'}}*/}
            {/*                                variant={'primary'}*/}
            {/*                                title={<FontAwesomeIcon icon={faBarsProgress}/>}*/}
            {/*                                className="ms-2 me-2">*/}
            {/*                                <NavDropdown.Item as={Link} to={"/admin"}>Dashborad</NavDropdown.Item>*/}
            {/*                            </DropdownButton>*/}
            {/*                        </> :*/}
            {/*                    <>*/}
            {/*                        <DropdownButton*/}
            {/*                            as={ButtonGroup}*/}
            {/*                            align={{ lg: 'end' }}*/}
            {/*                            variant={'primary'}*/}
            {/*                            title={<FontAwesomeIcon icon={faShoppingCart} />}*/}
            {/*                            className="ms-2 me-2">*/}
            {/*                            <NavDropdown.Item as={Link} to={"/"}>Nothing in here now!</NavDropdown.Item>*/}
            {/*                        </DropdownButton>*/}
            {/*                    </>*/}
            {/*                }*/}
            {/*                {token ? auth.role === 0 ?*/}
            {/*                    <>*/}
            {/*                        <DropdownButton*/}
            {/*                            as={ButtonGroup}*/}
            {/*                            align={{ lg: "end" }}*/}
            {/*                            variant={'primary'}*/}
            {/*                            title={<i className='bx bx-user' ></i>}*/}
            {/*                            className="">*/}
            {/*                            <NavDropdown.Item as={Link} to={"/user/profile"}>Profile</NavDropdown.Item>*/}
            {/*                            <NavDropdown.Item as={Link} to={"/user/address"}>Address</NavDropdown.Item>*/}
            {/*                            <NavDropdown.Item as={Link} to={"/user/bill"}>Bill</NavDropdown.Item>*/}
            {/*                            <NavDropdown.Divider />*/}
            {/*                            <NavDropdown.Item onClick={() => setShowModalHeader(true)}>Log out</NavDropdown.Item>*/}
            {/*                        </DropdownButton>*/}
            {/*                    </> : <>*/}
            {/*                        <DropdownButton*/}
            {/*                            as={ButtonGroup}*/}
            {/*                            align={{ lg: "end" }}*/}
            {/*                            variant={'primary'}*/}
            {/*                            title={<i className='bx bx-user' ></i>}*/}
            {/*                            className="">*/}
            {/*                            <NavDropdown.Item as={Link} to={"/admin/profile"}>Profile</NavDropdown.Item>*/}
            {/*                            <NavDropdown.Divider />*/}
            {/*                            <NavDropdown.Item onClick={() => setShowModalHeader(true)}>Log out</NavDropdown.Item>*/}
            {/*                        </DropdownButton>*/}
            {/*                    </> : <>*/}
            {/*                        <DropdownButton*/}
            {/*                            as={ButtonGroup}*/}
            {/*                            align={{ lg: "end" }}*/}
            {/*                            variant={'primary'}*/}
            {/*                            title={<i className='bx bx-user' ></i>}*/}
            {/*                            className="">*/}
            {/*                            <NavDropdown.Item as={Link} to={"/login"}>Log in</NavDropdown.Item>*/}
            {/*                            <NavDropdown.Item as={Link} to={"/register"}>Sign up</NavDropdown.Item>*/}
            {/*                        </DropdownButton>*/}
            {/*                    </>*/}
            {/*                }*/}
            {/*            </Nav>*/}
            {/*        </Navbar.Collapse>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}
            <SaveChange
                show={showModalHeader}
                onHide={() => setShowModalHeader(false)}
                onSave={handleLogout}
                title="Log out"
                text="Do you want to log out?"
                button="Log out"
            />
        </>
    );
};

export default Header;

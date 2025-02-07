import {Link} from "react-router-dom";
import React from "react";
import button from "bootstrap/js/src/button.js";

const Overside = () => {
    return (
        <>
            {/*<aside id="layout-menu" className="layout-menu-horizontal menu menu-horizontal container-fluid bg-menu-theme p-0">*/}
            {/*    <div className="container-xxl d-flex h-100 p-0">*/}
            {/*        <a className="menu-horizontal-prev d-none"></a>*/}
            {/*        <div className="menu-horizontal-wrapper">*/}
            {/*            <ul className="menu-inner align-items-center">*/}
            {/*                <li className="menu-item">*/}
            {/*                    <Link*/}
            {/*                        className="navbar-brand app-brand-text demo menu-text fw-bold text-capitalize"*/}
            {/*                        to={"/"}*/}
            {/*                    >*/}
            {/*                        <span>Cipher</span>*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*                <li className="menu-item me-3">*/}
            {/*                    <Link className="menu-link nav-link" to="/search">*/}
            {/*                        <h5 className="m-0">Product</h5>*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*                <li className="menu-item me-3">*/}
            {/*                    <Link className="menu-link nav-link" to="/contact">*/}
            {/*                        <h5 className="m-0">ContactPage</h5>*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*                <li className="menu-item">*/}
            {/*                    <Link className="menu-link nav-link" to="/about">*/}
            {/*                        <h5 className="m-0">AboutPage</h5>*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</aside>*/}

            <div className="navbar-nav">
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    <li className="nav-item navbar-search-wrapper me-3 me-xl-2">
                        <Link
                            className="navbar-brand app-brand-text demo menu-text fw-bold text-capitalize"
                            to={"/"}
                        >
                            <span>Cipher</span>
                        </Link>
                    </li>
                    <li className="nav-item navbar-search-wrapper me-3 me-xl-2">
                        <Link className="nav-link" to="/search">
                            <h5 className="m-0">Product</h5>
                        </Link>
                    </li>
                    <li className="nav-item navbar-search-wrapper me-3 me-xl-2">
                        <Link className="nav-link" to="/contact">
                            <h5 className="m-0">Contact</h5>
                        </Link>
                    </li>
                    <li className="nav-item navbar-search-wrapper me-3 me-xl-2">
                        <Link className="nav-link" to="/about">
                            <h5 className="m-0">About</h5>
                        </Link>
                    </li>
                </ul>
            </div>

            {/*<aside id="layout-menu"*/}
            {/*       className="layout-menu-horizontal menu menu-horizontal container-fluid flex-grow-0 bg-menu-theme"*/}
            {/*       data-bg-class="bg-menu-theme">*/}
            {/*    <div className="container-xxl d-flex h-100">*/}
            {/*        <a href="#" className="menu-horizontal-prev disabled d-none"></a>*/}
            {/*        <div className="menu-horizontal-wrapper">*/}
            {/*            <ul className="menu-inner py-1">*/}
            {/*                <li className="menu-item active">*/}
            {/*                    <a aria-label="Navigate to Dashboard" aria-current="page" className="menu-link active"*/}
            {/*                       href="/admin"><i className="menu-icon tf-icons bx bx-home"></i>*/}
            {/*                        <div>Dashboard</div>*/}
            {/*                    </a>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <a href="#" className="menu-horizontal-next d-none"></a>*/}
            {/*    </div>*/}
            {/*</aside>*/}
        </>
    )
}

export default Overside
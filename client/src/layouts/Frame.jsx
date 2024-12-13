import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Copyright from './Copyright.jsx';
import Transitionbar from "./Transitionbar.jsx";
import Outbar from "./Outbar.jsx";
import Overside from "./Overside.jsx";
import Navbar from "./Navbar.jsx";
import Activitybar from "./Activitybar.jsx";

const Frame = ({ children, role }) => {
    useEffect(() => {
        Main();
    }, [])

    const renderComponentByRole = async (r) => {
        if (r === 1) {
            return <Navbar/>;
        } else if (r === 0) {
            return <Activitybar/>;
        } else {
            return <Outbar/>;
        }
    }

    return (
        <>
            {/*<Outbar/>*/}
            {/*<Header role={role}/>*/}
            <div className="mb-4">
                {/*{renderComponentByRole(role)}*/}
                <Outbar/>
            </div>
            <div>
                {/*<Overside/>*/}
                {/*className="container flex-grow-1 container-p-y"*/}
                {children}
            </div>

            {/*<Overside/>*/}
            <Footer/>

            {/*<div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">*/}
            {/*    <div className="layout-container">*/}
            {/*        <Outbar/>*/}
            {/*        <div className="layout-page">*/}
            {/*            <div className="content-wrapper">*/}
            {/*                /!*<Outbar/>*!/*/}
            {/*                /!*<Overside/>*!/*/}
            {/*                <div className="container-xxl flex-grow-1 container-p-y">*/}
            {/*                    {children}*/}
            {/*                </div>*/}
            {/*                <Footer/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="layout-overlay layout-menu-toggle"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Frame
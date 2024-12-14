import { React, useState, useEffect, Component } from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import { } from 'react-bootstrap';
import axios from "axios";

import Header from "../layouts/Header.jsx";
import Copyright from "../layouts/Copyright.jsx";

import Home from "../pages/overview/Home.jsx";
import About from "../pages/overview/About.jsx";
import Contact from "../pages/overview/Contact.jsx";

import Product from "../pages/overview/Product.jsx";
import ProductList from "../pages/overview/ProductList.jsx";
import Cart from "../pages/payment-component/Cart.jsx";
import Login from "../pages/authentication/Login.jsx";
import Register from "../pages/authentication/Register.jsx";
import UserProfile from "../pages/profile/UserProfile.jsx";
import AddressManagement from "../pages/user-information/AddressManagement.jsx";

import Protected from "../utils/Protected.jsx";
import Manager from "../utils/Manager.jsx";
import NotFound from "../pages/overview/NotFound.jsx";
import Order from '../pages/payment-component/Order.jsx';
import CheckOut from '../pages/payment-component/Checkout.jsx';

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/checkout" element={<CheckOut />} />

            {/*<Route path="/404" element={<NotFound />} />*/}
        </Routes>
    )
}

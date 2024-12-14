import { React, useState, useEffect, Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { } from 'react-bootstrap';
import axios from "axios";

import Header from "../layouts/Header.jsx";
import Copyright from "../layouts/Copyright.jsx";

import Home from "../pages/overview/Home.jsx";
import About from "../pages/overview/About.jsx";
import Contact from "../pages/overview/Contact.jsx";

import Product from "../pages/overview/Product.jsx";
import ProductList from "../pages/overview/ProductList.jsx";
import Cart from "../pages/user-component/Cart.jsx";
import Login from "../pages/authentication/Login.jsx";
import Register from "../pages/authentication/Register.jsx";
import UserProfile from "../pages/user-component/UserProfile.jsx";
import AddressManagement from "../pages/user-infomation/AddressManagement.jsx";

import Protected from "../utils/Protected.jsx";
import Manager from "../utils/Manager.jsx";
import NotFound from "../pages/overview/NotFound.jsx";
import Order from '../pages/user-component/Order.jsx';
import CheckOut from '../pages/user-component/Checkout.jsx';
import VoucherWallet from "../pages/user-infomation/VoucherWallet.jsx";
import ChangePassword from '../pages/authentication/ChangePassword.jsx';
export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/address" element={<AddressManagement />} />
            <Route path="/voucher" element={<VoucherWallet />} />
            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="/bill" element={<NotFound />} />
            <Route path="/rating" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
        </Routes>
    )
}

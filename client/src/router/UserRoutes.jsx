import { React, useState, useEffect, Component } from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import { } from 'react-bootstrap';
import axios from "axios";

import UserProfile from "../pages/profile/UserProfile.jsx";
import AddressManagement from "../pages/user-information/AddressManagement.jsx";

import NotFound from "../pages/overview/NotFound.jsx";
import Order from '../pages/payment-component/Order.jsx';
import CheckOut from '../pages/payment-component/Checkout.jsx';
import VoucherWallet from "../pages/user-information/VoucherWallet.jsx";
import {Preview} from "../pages/dashboard/Preview.jsx";
import OrderHistory from "../pages/user-information/OrderHistory.jsx";

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Preview />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/address" element={<AddressManagement />} />
            <Route path="/voucher" element={<VoucherWallet />} />

            <Route path="/bill" element={<OrderHistory />} />
            <Route path="/rating" element={<NotFound />} />
            {/*<Route path="/404" element={<NotFound />} />*/}
        </Routes>
    )
}

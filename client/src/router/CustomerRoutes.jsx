import { React, useState, useEffect, Component } from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import { } from 'react-bootstrap';
import axios from "axios";

import Cart from "../pages/payment-component/Cart.jsx";
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

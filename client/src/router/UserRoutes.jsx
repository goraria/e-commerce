import { React, useState, useEffect, Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { } from 'react-bootstrap';
import axios from "axios";

import AddressManagement from "../pages/user-information/AddressManagement.jsx";
import NotFound from "../pages/overview/NotFound.jsx";
import VoucherWallet from "../pages/user-information/VoucherWallet.jsx";
import { Preview } from "../pages/dashboard/Preview.jsx";
import { OrderHistory } from "../pages/user-information/OrderHistory.jsx";
import { ProfilePage } from "../pages/account/ProfilePage.jsx";
import { OrderDetails } from "../pages/user-information/OrderDetails.jsx";

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Preview />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/address" element={<AddressManagement />} />
            <Route path="/voucher" element={<VoucherWallet />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="/bill" element={<OrderDetails />} />
            <Route path="/rating" element={<NotFound />} />
            {/*<Route path="/404" element={<NotFound />} />*/}
        </Routes>
    )
}

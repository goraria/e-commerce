import { React, useState, useEffect, Component } from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

import UserProfile from "../pages/user-component/UserProfile.jsx";
import AddressManagement from "../pages/user-infomation/AddressManagement.jsx";

import NotFound from "../pages/overview/NotFound.jsx";
import VoucherWallet from "../pages/user-infomation/VoucherWallet.jsx";

export const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/" element={<AddressManagement />} />
            <Route path="/" element={<VoucherWallet />} />

            <Route path="/" element={<NotFound />} />
            <Route path="/" element={<NotFound />} />
            <Route path="/" element={<NotFound />} />
        </Routes>
    )
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/overview/HomePage.jsx";
import AboutPage from "../pages/overview/AboutPage.jsx";
import ContactPage from "../pages/overview/ContactPage.jsx";
import ProductPage from "../pages/overview/ProductPage.jsx";
import ProductList from "../pages/overview/ProductList.jsx";
import ErrorPage from "../pages/misc/ErrorPage.jsx";
import NotfoundPage from "../pages/misc/NotfoundPage.jsx";

export const ShareRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/search" element={<ProductList />} />
            <Route path="/faq" element={<NotfoundPage />} />
            {/*<Route path="/404" element={<NotfoundPage />} />*/}

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
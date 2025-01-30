import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/overview/NotFound.jsx";
import { Home } from "../pages/overview/Home.jsx";
import { About } from "../pages/overview/About.jsx";
import { Contact } from "../pages/overview/Contact.jsx";
import { Product } from "../pages/overview/Product.jsx";
import { ProductList } from "../pages/overview/ProductList.jsx";
import {ErrorPage} from "../pages/misc/ErrorPage.jsx";

export const ShareRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/search" element={<ProductList />} />
            <Route path="/faq" element={<NotFound />} />
            {/*<Route path="/404" element={<NotFound />} />*/}

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
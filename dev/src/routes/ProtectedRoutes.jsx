import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { NotFound } from "../pages/overview/NotFound.jsx";

export const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<NotFound />} />
        </Routes>
    )
}

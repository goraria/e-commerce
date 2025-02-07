import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import NotfoundPage from "../pages/misc/NotfoundPage.jsx";

export const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<NotfoundPage />} />
        </Routes>
    )
}

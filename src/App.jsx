import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage.jsx";
import Pricing from "./pages/pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/pricing'} element={<Pricing/>}/>
                    <Route path={"/product"} element={<Product/>}/>
                    <Route path={"/app"} element={<AppLayout/>}/>
                    <Route path={"/logIn"} element={<Login/>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
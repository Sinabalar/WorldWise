import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";


import Product from "./pages/Product";
import HomePage from "./pages/HomePage.jsx";
import Pricing from "./pages/pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./component/CityList.jsx";
import CountryList from "./component/CountryList.jsx";
import City from "./component/City.jsx";
import Form from "./component/Form.jsx";

export default function App() {

    const BASE_URL = 'http://localhost:8000'

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                alert(`there was an error loading data`)
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path={'/pricing'} element={<Pricing/>}/>
                    <Route path={"/product"} element={<Product/>}/>
                    <Route path={"/app"} element={<AppLayout/>}>
                        <Route
                            index
                            element={
                            <Navigate replace to={'cities'}/>
                            }
                        />
                        <Route
                            path={"cities"}
                            element={<CityList cities={cities} loading={isLoading}/>}
                        />
                        <Route
                            path={"cities/:id"}
                            element={<City/>}
                        />
                        <Route
                            path={"countries"}
                            element={<CountryList
                                cities={cities}

                            />}
                        />
                        <Route
                            path={"form"}
                            element={<Form/>}
                        />
                    </Route>
                    <Route path={"/logIn"} element={<Login/>}/>
                    <Route path={"*"} element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
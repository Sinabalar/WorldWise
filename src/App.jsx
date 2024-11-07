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
import {CitiesProvider} from "./context/citiesContext.jsx";
import {AuthProvider} from "./context/FakeAuthContext.jsx";

export default function App() {


    return (
        <div>
            <CitiesProvider>
                <AuthProvider>
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
                                    element={<CityList/>}
                                />
                                <Route
                                    path={"cities/:id"}
                                    element={<City/>}
                                />
                                <Route
                                    path={"countries"}
                                    element={<CountryList/>}
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
                </AuthProvider>
            </CitiesProvider>
        </div>
    )
}
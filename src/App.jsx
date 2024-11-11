import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import CityList from "./component/CityList.jsx";
import CountryList from "./component/CountryList.jsx";
import City from "./component/City.jsx";
import Form from "./component/Form.jsx";
import {CitiesProvider} from "./context/citiesContext.jsx";
import {AuthProvider} from "./context/FakeAuthContext.jsx";
import SpinnerFullPage from "./component/SpinnerFullPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));


export default function App() {


    return (
        <div>
            <CitiesProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Suspense fallback={<SpinnerFullPage/>}>
                            <Routes>
                                <Route index element={<HomePage/>}/>
                                <Route path={'/pricing'} element={<Pricing/>}/>
                                <Route path={"/product"} element={<Product/>}/>
                                <Route path={"/app"} element={
                                    <ProtectedRoute>
                                        <AppLayout/>
                                    </ProtectedRoute>
                                }>
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
                        </Suspense>
                    </BrowserRouter>
                </AuthProvider>
            </CitiesProvider>
        </div>
    )
}
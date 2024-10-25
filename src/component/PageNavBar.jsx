import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./PageNav.module.css"
import Logo from "./Logo.jsx";

export default function PageNavBar() {
    return (
        <nav className={style.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to={"/pricing"}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to={"/product"}>Product</NavLink>
                </li>
                <li>
                    <NavLink to={"/logIn"} className={style.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}
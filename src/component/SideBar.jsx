import styles from './Sidebar.module.css'
import Logo from "./Logo.jsx";
import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";
export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}
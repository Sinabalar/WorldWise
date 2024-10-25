import styles from './Sidebar.module.css'
import Logo from "./Logo.jsx";
import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";
export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNavBar/>
            <p>List of cities</p>
            <Footer/>
        </div>
    );
}
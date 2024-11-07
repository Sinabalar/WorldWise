import React from 'react';
import SideBar from "../component/SideBar.jsx";
import styles from './AppLayout.module.css';
import Map from "../component/Map.jsx";
import User from "../component/User.jsx";




export default function AppLayout() {
    return (
        <div className={styles.app}>
            <SideBar/>
            <Map/>
            <User/>
        </div>
    );
}
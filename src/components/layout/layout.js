import { Link, Outlet } from 'react-router-dom';
import Header from "../header";
import React from "react";
import styles from "../../styles/app.module.scss";

const Layout = () => {
    return (
        <div>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;
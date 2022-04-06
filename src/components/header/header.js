import React from "react";
import styles from "../../styles/header.module.scss";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Realworld Blog</Link>
            <div>
                <a className={styles.signIn}>Sign In</a>
                <a className={styles.signUp}>Sign Up</a>
            </div>
        </header>
    )
}

export default Header;
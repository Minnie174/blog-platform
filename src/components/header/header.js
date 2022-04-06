import React from "react";
import styles from "../../styles/header.module.scss";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Realworld Blog</Link>
            <div>
                <Link to="sign-in" className={styles.signIn}>Sign In</Link>
                <Link to="sign-up" className={styles.signUp}>Sign Up</Link>
            </div>
        </header>
    )
}

export default Header;
import React, {useCallback, useEffect} from "react";
import styles from "../../styles/header.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.userLogin.isAuth);
    const isAuth2 = JSON.parse(localStorage.getItem('auth'))
    const nameUser = JSON.parse(localStorage.getItem('user')) || ''
    let image = JSON.parse(localStorage.getItem('image'))
    const errorEdit = useSelector(state => state.userEdit.isError)
    const isImage = nameUser.image ? nameUser.image : image

    const logOut = () => {
        localStorage.clear();
        dispatch(isAuth(false))
    }

    useEffect(() => {
        if (!errorEdit) {
            image = JSON.parse(localStorage.getItem('image'))
        }
        navigate('/')
    }, [isAuth2, image, isAuth, errorEdit])

    const ifName = !nameUser.username ? <Loader /> : nameUser.username


    const Authorized = () => {
        if (isAuth === null) return null;
        return (
            <div className={styles.logUser}>
                <Link to="new-article" className={styles.create}>Create article</Link>
                <Link to="profile" className={styles.profile}>
                    <div className={styles.name}>{ifName}</div>
                    <img className={styles.avatar} src={isImage} alt="avatar"/>
                </Link>
                <Link to="/" className={styles.logOut} onClick={logOut}>Log out</Link>
            </div>
        )
    }

    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Realworld Blog</Link>
            {isAuth2 &&
            <Authorized />
            }
            {!isAuth2 &&
            <div>
                <Link to="sign-in" className={styles.signIn}>Sign In</Link>
                <Link to="sign-up" className={styles.signUp}>Sign Up</Link>
            </div>
            }
        </header>
    )
}

export default Header;
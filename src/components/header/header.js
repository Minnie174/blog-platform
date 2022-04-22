import React, {useEffect, useState} from "react";
import styles from "../../styles/header.module.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Rectangle from '../../utilities/img/Rectangle 1.svg'
import ApiService from "../../utilities/api-service/api-service";
import Loader from "../loader";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.user.userRegistration);
    const userLogin2 = useSelector(state => state.user.userLogin);
    const isAuth = useSelector(state => state.user.isAuth);
    const isAuth2 = JSON.parse(localStorage.getItem('auth')) === true
    const nameUser = JSON.parse(localStorage.getItem('user')) || ''

    const [name, setName] = useState(nameUser);
    const [image, setImage] = useState(userLogin2.image);

    useEffect(() => { // меняет картинку
        setImage(image)
    }, [image])

    useEffect(() => { // меняет имя пользователя
        setName(name)
    }, [name])

    const isToken = JSON.parse(localStorage.getItem('token')) !== null;

    const logOut = () => {
        localStorage.clear();
        dispatch(isAuth(false))
    }
    const ifName = !nameUser.username ? <Loader /> : nameUser.username

    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Realworld Blog</Link>
            {isAuth2 &&
            <div className={styles.logUser}>
                <Link to="new-article" className={styles.create}>Create article</Link>
                <Link to="profile" className={styles.profile}>
                    <div className={styles.name}>{ifName}</div>
                    <img className={styles.avatar} src={image} alt="avatar"/>
                </Link>
                <Link to ="/" className={styles.logOut} onClick={logOut}>Log out</Link>
            </div>
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
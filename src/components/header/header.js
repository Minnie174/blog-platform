import React from "react";
import styles from "../../styles/header.module.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Rectangle from '../../utilities/img/Rectangle 1.svg'
import ApiService from "../../utilities/api-service/api-service";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.user.userRegistration);
    console.log(userLogin)
    const userLogin2 = useSelector(state => state.user.userLogin);
    const isAuth = useSelector(state => state.user.isAuth);
    console.log(userLogin2)
    // const userName = userLogin(el => el.username)
    // const avatar = userLogin(el => el.image)
    // console.log(userName)

    const x = JSON.parse(localStorage.getItem('token')) !== null;

    console.log(x)

    const IsLogin = () => {
        return (
            <div className={styles.logUser}>
                <Link to="new-article" className={styles.create}>Create article</Link>
                <Link to="profile" className={styles.profile}>
                    <div>John Doe</div>
                    <img className={styles.avatar} src={Rectangle} alt="avatar"/>
                </Link>
                <Link to ="/" className={styles.logOut} onClick={logOut}>Log out</Link>
            </div>
        )
    }

    const IsNotLogin = () => {
        return (
            <div>
                <Link to="sign-in" className={styles.signIn}>Sign In</Link>
                <Link to="sign-up" className={styles.signUp}>Sign Up</Link>
            </div>
        )
    }

    const logOut = () => {
        localStorage.clear();
        dispatch(isAuth(false))
    }


    return (
        <header className={styles.header}>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Realworld Blog</Link>
            {x &&
            <div className={styles.logUser}>
                <Link to="new-article" className={styles.create}>Create article</Link>
                <Link to="profile" className={styles.profile}>
                    <div>John Doe</div>
                    <img className={styles.avatar} src={Rectangle} alt="avatar"/>
                </Link>
                <Link to ="/" className={styles.logOut} onClick={logOut}>Log out</Link>
            </div>
            }
            {!x &&
            <div>
                <Link to="sign-in" className={styles.signIn}>Sign In</Link>
                <Link to="sign-up" className={styles.signUp}>Sign Up</Link>
            </div>
            }
        </header>
    )
}

export default Header;
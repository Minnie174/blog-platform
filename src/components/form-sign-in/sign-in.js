import React from "react";
import styles from './sign-in.module.scss';
import {Button, Checkbox, Input} from "antd";
import {Link} from "react-router-dom";

const SignIn = () => {
    return (
        <div className={styles.signIn}>
            <h1 className={styles.sign}>Sign In</h1>
            <div className={styles.text}>
                <span>Email address</span>
                <Input
                    className={styles.input}
                    placeholder="Email address"/>
            </div>
            <div className={styles.text}>
                <span>Password</span>
                <Input.Password
                    className={styles.input}
                    placeholder="Password" />
            </div>
            <Button type="primary"
                    className={styles.button}>
                Login
            </Button>
            <span className={styles.acc}>Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
            </span>
        </div>
    )
}

export default SignIn;
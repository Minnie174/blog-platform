import React from "react";
import styles from './sign-up.module.scss';
import {Button, Checkbox, Input} from "antd";
import {Link} from "react-router-dom";

const SignUp = () => {
    return (
        <div className={styles.mainSignIn}>
            <h1 className={styles.create}>Create new account</h1>
            <div className={styles.text}>
                <span>Username</span>
                <Input className={styles.input}
                       placeholder="Username"/>
            </div>
            <div className={styles.text}>
                <span>Email Address</span>
                <Input className={styles.input}
                       placeholder="Email address"/>
            </div>
            <div className={styles.text}>
                <span>Password</span>
                <Input.Password status="error"
                       className={styles.input}
                       placeholder="Password"/>
                <span className={styles.error}>Your password needs to be at least 6 characters</span>
            </div>
            <div className={styles.text}>
                <span>Repeat Password</span>
                <Input.Password className={styles.input}
                       status="error"
                       placeholder="Repeat password"/>
                <span className={styles.error}>Passwords must match</span>

            </div>
            <Checkbox className={styles.checkbox}>I agree to the processing of my personal
                information
            </Checkbox>
            <Button type="primary" className={styles.button}>
                Create
            </Button>
            <span className={styles.acc}>
                Already have an account? <Link to="/sign-in">Sign In.</Link>
            </span>
        </div>
    )
}

export default SignUp;
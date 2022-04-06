import React from "react";
import styles from './edit-profile.module.scss';
import {Button, Checkbox, Input} from "antd";
import {Link} from "react-router-dom";

const EditProfile = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.edit}>Edit Profile</h1>
            <div>
                <span>Username</span>
                <Input className={styles.input}
                       placeholder="Username"/>
            </div>
            <div>
                <span>Email address</span>
                <Input className={styles.input}
                       placeholder="Email"/>
            </div>
            <div>
                <span>New password</span>
                <Input className={styles.input}
                       placeholder="New password"/>
            </div>
            <div>
                <span>Avatar image (url)</span>
                <Input className={styles.input}
                       placeholder="Avatar image"/>
            </div>
            <Button
                type="primary"
                className={styles.button}>
                    Save
            </Button>
        </div>
    )
}

export default EditProfile;
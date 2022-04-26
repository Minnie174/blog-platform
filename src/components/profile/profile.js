import React, {useEffect, useState} from "react";
import styles from '../../styles/profile.module.scss';
import {Link, useNavigate} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {Button, Input, notification} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginUsers} from "../../redux/actions/user-login";
import {editUser} from "../../redux/actions/user-edit";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.userEdit.isError);
    const info = useSelector(state => state.userEdit.isEdited)

    const {
        control,
        formState: {
            errors,
        },
        reset,
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })

    const openWarning = (type) => {
        notification[type]({
            message: 'Error',
            description: 'Something got wrong'
        })
    }

    const onSubmit = (data) => {
        dispatch(editUser(data))
        dispatch(loginUsers(data))
        reset();
        if (error === true) {
            return openWarning('warning')
        }
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.profile}>
            <h1 className={styles.create}>Edit Profile</h1>
            <div className={styles.text}>
                <label>Username</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Username" {...field}/>}
                           rules={{ required: true,
                                    minLength: 1
                            }}
                           name="username"
                           control={control}
                           defaultValue=""
                />
                <span className={styles.error}>{errors.Username && `Don't forget to sign your name`}</span>
            </div>
            <div className={styles.text}>
                <label>Email address</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Email address" {...field}/>}
                            rules={{ required: true,
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    minLength: 6,
                            }}
                            name="email"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.Email && `Please add a valid email`}</span>
            </div>
            <div className={styles.text}>
                <label>New password</label>
                <Controller render={({ field}) =>
                    <Input.Password
                        className={styles.input}
                        placeholder="New password"
                        {...field}/>}
                            rules={{ required: true,
                                minLength: 6,
                                maxLength: 40
                            }}
                            name="password"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.Password && `Your password needs to be at least 6 characters`}</span>

            </div>
            <div className={styles.text}>
                <label>Avatar image (url)</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Avatar image" {...field}/>}
                            rules={{ required: true,
                                pattern: '/^((?:https?\:)?(?:\/{2})?)?((?:[\w\d-_]{1,64})\.(?:[\w\d-_\.]{2,64}))(\:\d{2,6})?((?:\/|\?|#|&){1}(?:[\w\d\S]+)?)?$/u' // ([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)
                            }}
                            name="image"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.image && 'You need to click on agree'}</span>
            </div>
            <Button type="primary" htmlType="submit" className={styles.button}>Save</Button>
        </form>
    )
}

export default EditProfile;
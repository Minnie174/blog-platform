import React, {useEffect} from "react";
import styles from '../../styles/profile.module.scss';
import {useNavigate} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {Button, Input, notification} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginUsers} from "../../redux/actions/user-login";
import {editUser, isErrorAddress, isErrorNewUser, isErrorUser} from "../../redux/actions/user-edit";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.userEdit.isError);
    const info = JSON.parse(localStorage.getItem('user'))
    const image = info.image ? info.image : JSON.parse(localStorage.getItem('image'))

    const isErrorEmail = useSelector(state => state.userEdit.isErrorAddress);
    const isErrorName = useSelector(state => state.userEdit.isErrorUser);
    console.log(isErrorName, isErrorEmail)

    const {
        control,
        setError,
        formState: {
            errors,
        },
        reset,
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })

    useEffect(() => {
        if (isErrorName) {
            setError("username", {type: "server", message: "is already taken"})
            // dispatch(isErrorUser(null))
        }
        if (isErrorEmail) {
            setError("email", {type: "server", message: "is already taken"})
            // dispatch(isErrorAddress(null))
        }
    }, [isErrorEmail, isErrorName, error])

    const openWarning = (type) => {
        notification[type]({
            message: 'Error',
            description: 'Update failed'
        })
    }

    const onSubmit = (data) => {
        dispatch(editUser(data))
        dispatch(loginUsers(data))
        localStorage.setItem('image', JSON.stringify(data.image))
        if (error === true) {
            openWarning('warning');
        }
        if (isErrorName) {
            setError("username", {type: "server", message: "is already taken"})
            dispatch(isErrorNewUser(null))
        }
        if (isErrorEmail) {
            setError("email", {type: "server", message: "is already taken"})
            dispatch(isErrorAddress(null))
        }
        if (!error) {
            navigate('/');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.profile}>
            <h1 className={styles.create}>Edit Profile</h1>
            <div className={styles.text}>
                <label>Username</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Username" {...field}/>}
                           rules={{
                                    minLength: 1
                            }}
                           name="username"
                           control={control}
                           defaultValue={info.username}
                />
                {errors.username && <span className={styles.error}>{errors.username.message || `Don't forget to sign your name`}</span> }
                {/*<span className={styles.error}>{errors.username && `Don't forget to sign your name`}</span>*/}
            </div>
            <div className={styles.text}>
                <label>Email address</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Email address" {...field}/>}
                            rules={{
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    minLength: 6,
                            }}
                            name="email"
                            control={control}
                            defaultValue={info.email}
                />
                {errors.email && <span className={styles.error}>{errors.email.message || `Please add a valid email`}</span> }

                {/*<span className={styles.error}>{errors.email && `Please add a valid email`}</span>*/}
            </div>
            <div className={styles.text}>
                <label>New password</label>
                <Controller render={({ field}) =>
                    <Input.Password
                        className={styles.input}
                        placeholder="New password"
                        {...field}/>}
                            rules={{
                                minLength: 6,
                                maxLength: 40
                            }}
                            name="password"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.password && `Your password needs to be at least 6 characters`}</span>

            </div>
            <div className={styles.text}>
                <label>Avatar image (url)</label>
                <Controller render={({field}) =>
                    <Input className={styles.input}
                           placeholder="Avatar image" {...field}/>}
                            rules={{
                                pattern: '/^((?:https?\:)?(?:\/{2})?)?((?:[\w\d-_]{1,64})\.(?:[\w\d-_\.]{2,64}))(\:\d{2,6})?((?:\/|\?|#|&){1}(?:[\w\d\S]+)?)?$/u' // ([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)
                            }}
                            name="image"
                            control={control}
                            defaultValue={image}
                />
                <span className={styles.error}>{errors.image && 'You need to click on agree'}</span>
            </div>
            <Button type="primary" htmlType="submit" className={styles.button}>Save</Button>
        </form>
    )
}

export default EditProfile;
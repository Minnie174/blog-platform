import React, {useEffect, useRef, useState} from "react";
import styles from './sign-up.module.scss';
import {Button, Checkbox, Input, notification} from "antd";
import {Link, useNavigate} from "react-router-dom";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegistration, isErrorEmail, isErrorUser, isErrorUsername} from "../../redux/actions/user";

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isErrorRegistration = useSelector(state => state.userReg.isError)
    const isErrEmail = useSelector(state => state.userReg.isErrorEmail);
    const isErrUsername = useSelector(state => state.userReg.isErrorUsername);

    const {
        control,
        setError,
        formState: {
            errors,
        },
        reset,
        handleSubmit,
        watch
    } = useForm({
        mode: 'onBlur'
    })

    const password = useRef({});
    password.current = watch("Password", "");

    useEffect(() => {
        if (isErrorRegistration === false) {
            openWarning('warning', 'something went wrong with registration')
            dispatch(isErrorUser(null));
        }
        if (isErrUsername) {
            setError('Username', {type: "server", message: "is already taken"})
            dispatch(isErrorUsername(null))
        }
        if (isErrEmail) {
            setError('Email', {type: "server", message: "is already taken"})
            dispatch(isErrorEmail(null))
        }
    }, [isErrorRegistration, isErrEmail, isErrUsername])

    const openWarning = (type, description) => {
        notification[type]({
            message: 'Error',
            description: description
        })
    }

    const onSubmit = (data) => {
        const {Username, Password, Email} = data; // вытащили данные
        dispatch(fetchRegistration(Username, Email, Password));
        if (isErrorRegistration) {
            navigate('/sign-in')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.mainSignIn}>
            <h1 className={styles.create}>Create new account</h1>
            <div className={styles.text}>
                <label>Username</label>
                <Controller render={({ field}) =>
                    <Input className={styles.input}
                           placeholder="Username"
                           {...field}/>}
                            rules={{ required: true,
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                },
                                maxLength: 20,}}
                            name="Username"
                            control={control}
                            defaultValue=""
                />
                {errors.Username && <span className={styles.error}>{errors.Username.message || `Don't forget to sign your name`}</span> }
            </div>
            <div className={styles.text}>
                <label>Email Address</label>
                <Controller render={({ field}) =>
                    <Input className={styles.input}
                           placeholder="Email"
                           {...field}/>}
                            rules={{ required: true,
                                     pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    minLength: 6,
                                    maxLength: 40,
                            }}
                            name="Email"
                            control={control}
                            defaultValue=""
                />
                {errors.Email && <span className={styles.error}>{errors.Email.message || `Please add a valid email`}</span> }
            </div>
            <div className={styles.text}>
                <label>Password</label>
                <Controller render={({ field}) =>
                    <Input.Password
                            className={styles.input}
                            placeholder="Password"
                            {...field}/>}
                            rules={{ required: true,
                                    minLength: 6,
                                    maxLength: 40
                            }}
                            name="Password"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.Password && `Your password needs to be at least 6 characters`}</span>
            </div>
            <div className={styles.text}>
                <label>Repeat Password</label>
                <Controller render={({ field}) =>
                    <Input.Password
                        className={styles.input}
                        placeholder="Repeat password"
                        {...field}/>}
                            rules={{ required: true,
                                    validate: value => value === password.current || 'The passwords do not match'}}
                            name="Repeat"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.Repeat && `Passwords must match`}</span>
            </div>
            <Controller render={({ field: { value, onChange } }) => (
                <Checkbox className={styles.checkbox} checked={value} onChange={e => onChange(e.target.checked)}>I agree to the processing of my personal
                    information</Checkbox>)}
                        name="checkbox"
                        rules={{ required: true }}
                        control={control}
                        defaultValue=""
            />
            <span className={styles.error}>{errors.checkbox && 'You need to click on agree'}</span>
            <Button type="primary" htmlType="submit" className={styles.button}>
                Create
            </Button>
            <span className={styles.acc}>
                Already have an account? <Link to="/sign-in">Sign In.</Link>
            </span>
        </form>
    )
}

export default SignUp;
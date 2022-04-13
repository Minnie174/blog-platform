import React, {useState} from "react";
import styles from './sign-up.module.scss';
import {Button, Checkbox, Input} from "antd";
import {Link, useHistory, useLocation, useNavigate} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegistration} from "../../redux/actions";
const SignUp = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state || '/';
    const dispatch = useDispatch();

    const isErrorRegistration = useSelector(state => state.user.isError)

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

    const onSubmit = (data) => {
        const {Username, Password, Email} = data; // вытащили данные

        dispatch(fetchRegistration(Username, Email, Password));

        if (!isErrorRegistration) {
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
                <span className={styles.error}>{errors.Username && `Don't forget to sign your name`}</span>
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
                <span className={styles.error}>{errors.Email && `Please add a valid email`}</span>

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
                            rules={{ required: true }}
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
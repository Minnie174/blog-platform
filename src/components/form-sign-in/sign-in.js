import React, {useCallback, useEffect} from "react";
import styles from './sign-in.module.scss';
import {Button, Input, notification} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, isLogin} from "../../redux/actions/user-login";

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userIsError = useSelector(state => state.userReg.isError) // если тру, то не сабмитим
    const isLogin2 = useSelector(state => state.userLogin.isLogin)
    console.log(userIsError, isLogin2)

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

    // const initHistory = useCallback(() => {
    //     if (!userIsError) {
    //         openWarning('warning', 'something went wrong with registration')
    //         dispatch(isLogin(null));
    //     }
    //     if (!isLogin2) {
    //         openWarning('warning', 'you could not authorized')
    //         dispatch(isLogin(null));
    //     }
    // }, [isLogin, userIsError])

    useEffect(() => {
        if (isLogin2 === false) {
            openWarning('warning', 'you could not authorized')
            dispatch(isLogin(null));
        }
    }, [isLogin2, userIsError])

    const openWarning = (type, description) => {
        notification[type]({
            message: 'Error',
            description: description
        })
    }

    const onSubmit = (data) => {
        const {email, password} = data;
        dispatch(fetchLogin(email, password));

        // if (userIsError) {
        //     return notification['warning']({
        //         message: 'Error',
        //         description: 'Something got wrong'
        //     })
        // }
        // if (!isLogin2) {
        //     openWarning('warning')
        // }
        navigate('/')
        reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn}>
            <h1 className={styles.sign}>Sign In</h1>
            <div className={styles.text}>
                <label>Email address</label>
                <Controller render={({ field}) =>
                    <Input className={styles.input}
                           placeholder="Email address"
                           {...field}/>}
                            rules={{ required: true,
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                minLength: 6,
                                maxLength: 40,
                            }}
                            name="email"
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
                                minLength: 1
                            }}
                            name="password"
                            control={control}
                            defaultValue=""
                />
                <span className={styles.error}>{errors.Password && `What about password?`}</span>

            </div>
            <Button type="primary" htmlType="submit"
                    className={styles.button}>
                Login
            </Button>
            <span className={styles.acc}>Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
            </span>
        </form>
    )
}

export default SignIn;
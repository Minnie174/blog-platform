import React from "react";
import styles from './sign-in.module.scss';
import {Button, Checkbox, Input} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../../redux/actions";

const SignIn = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userLogin)

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
        const {Email, Password} = data;

        console.log(Email, Password);
        dispatch(fetchLogin(Email, Password));
        // localStorage.setItem('user', JSON.stringify(userData))

        navigate ('/') // потом прописать норм хедер
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
                                minLength: 1
                            }}
                            name="Password"
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
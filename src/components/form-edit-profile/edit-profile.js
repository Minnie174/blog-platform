import React from "react";
import styles from './edit-profile.module.scss';
import {Button, Input} from "antd";
import {Link} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";

const EditProfile = () => {

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
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
            <h1 className={styles.edit}>Edit Profile</h1>
            <div>
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
            </div>
            <div>
                <label>Email address</label>
                <Controller render={({ field}) =>
                    <Input className={styles.input}
                           placeholder="Email"
                           {...field}/>}
                            rules={{ required: true,
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                minLength: 1
                            }}
                            name="Email"
                            control={control}
                            defaultValue=""
                />
            </div>
            <div>
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
                            name="Password"
                            control={control}
                            defaultValue=""
                />
            </div>
            <div>
                <label>Avatar image (url)</label>
                <Controller render={({ field}) =>
                    <Input.Password
                        className={styles.input}
                        placeholder="Avatar image"
                        {...field}/>}
                            rules={{ required: true,
                                pattern: /([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)/,
                            }}
                            name="Image"
                            control={control}
                            defaultValue=""
                />
            </div>
            <Button
                type="primary"
                className={styles.button}>
                    Save
            </Button>
        </form>
    )
}

export default EditProfile;
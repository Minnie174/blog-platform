import React from "react";
import styles from '../../styles/create-article.module.scss';
import {useForm, useFieldArray, useController} from "react-hook-form";
import { Controller } from "react-hook-form";
import {Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

const CreateArticle = () => {

    const defaultValue = {
        tag: [{name: ''}]
    }

    const {
        register,
        control,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        defaultValues: defaultValue
    })

    const {fields, append, remove} = useFieldArray({control, name: 'tag'});

    const addTag = () => {
        append({name: ''}) // прописать добавление тэга
    }

    const tagList = fields.map((el, index) => {
        const lastTag = fields.indexOf(fields[fields.length - 1]);
        const firstTag = fields.indexOf(fields[0]);
        return (
            <div className={styles.tags} key={el.id}>
                <div>
                    <Controller render={({field}) =>
                        <Input
                            className={styles.tagInput}
                            placeholder="Text"
                            {...field}
                        />}
                                rules={{ required: true}}
                                name={`tag[${index}].name`}
                                control={control}
                    />
                </div>
                <Button className={styles.buttonDelete} onClick={() => remove(index)} danger>Delete</Button>
                {/*{firstTag !== index || fields.length > 1 ? <Button className={styles.buttonDelete} onClick={() => remove(index)} danger>Delete</Button> : ''}*/}
                {lastTag === index ? <Button className={styles.add} onClick={addTag}>Add tag</Button> : ''}
            </div>
        )
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.create}>
            <h1 className={styles.title}>Create new article</h1>
            <div className={styles.req}>
                <label>Title</label>
                <Controller render={({field}) =>
                    <Input
                        className={styles.titleInput}
                        placeholder="Title"
                        {...field}/>}
                    rules={{ required: true}}
                    name="Title"
                    control={control}
                    defaultValue=""
                />
            </div>
            <div className={styles.req}>
                <label>Title</label>
                <Controller render={({field}) =>
                    <Input
                        className={styles.titleInput}
                        placeholder="Short description"
                        {...field}/>}
                            rules={{ required: true}}
                            name="Description"
                            control={control}
                            defaultValue=""
                />
            </div>
            <div className={styles.req}>
                <label>Title</label>
                <Controller render={({field}) =>
                    <TextArea
                        className={styles.inputText}
                        placeholder="Text"
                        rows={7}
                        {...field}/>}
                            rules={{ required: true}}
                            name="Text"
                            control={control}
                            defaultValue=""
                />
            </div>
            {tagList}
            <Button type="primary" htmlType="submit" className={styles.send}>Send</Button>
        </form>
    )
}

export default CreateArticle;
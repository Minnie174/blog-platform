import React, {useCallback, useEffect} from "react";
import styles from '../../styles/edit-create.module.scss';
import {Button, Input} from "antd";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import {getArticle} from "../../redux/actions/single-article";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

const FormCreateFormArticle = ({title, description, body, onHandleSubmit, nameList, value}) => {
    const {
        control,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        defaultValues: value
    })


    const {fields, append, remove} = useFieldArray({control, name: 'tag'}); // оставляем

    const addTag = () => { // оставляем
        append({name: ''}) // прописать добавление тэга
    }

    const tagList = fields.map((el, index) => {
        const lastTag = fields.indexOf(fields[fields.length - 1]);
        // const firstTag = fields.indexOf(fields[0]);
        return (
            <div className={styles.tags} key={el.id}>
                <div>
                    <Controller render={({field}) =>
                        <Input
                            className={styles.tagInput}
                            placeholder="Tag"
                            {...field}
                        />}
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

    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} className={styles.create}>
            <h1 className={styles.title}>{nameList}</h1>
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
                            defaultValue={title}
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
                            defaultValue={description}
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
                            defaultValue={body}
                />
            </div>
            {tagList}
            <Button type="primary" htmlType="submit" className={styles.send}>Send</Button>
        </form>
    )
}

export default FormCreateFormArticle;
import React, {useEffect} from "react";
import {useForm, useFieldArray, useController} from "react-hook-form";
import {notification} from "antd";
import {useDispatch} from "react-redux";
import {createNewArticle, fetchDispatch} from "../../redux/actions";
import EditCreate from "../form-reate-form-article";
import {useNavigate} from "react-router-dom";

const CreateArticle = ({howToHandleSubmit}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultValue = {
        tag: [{name: ''}]
    }

    useEffect(() => {

    }, [])

    const {
        control,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: defaultValue
    })

    // const {fields, append, remove} = useFieldArray({control, name: 'tag'});

    // const addTag = () => {
    //     append({name: ''}) // прописать добавление тэга
    // }

    // const tagList = fields.map((el, index) => {
    //     const lastTag = fields.indexOf(fields[fields.length - 1]);
    //     const firstTag = fields.indexOf(fields[0]);
    //     return (
    //         <div className={styles.tags} key={el.id}>
    //             <div>
    //                 <Controller render={({field}) =>
    //                     <Input
    //                         className={styles.tagInput}
    //                         placeholder="Tag"
    //                         {...field}
    //                     />}
    //                             rules={{ required: true}}
    //                             name={`tag[${index}].name`}
    //                             control={control}
    //                 />
    //             </div>
    //             <Button className={styles.buttonDelete} onClick={() => remove(index)} danger>Delete</Button>
    //             {/*{firstTag !== index || fields.length > 1 ? <Button className={styles.buttonDelete} onClick={() => remove(index)} danger>Delete</Button> : ''}*/}
    //             {lastTag === index ? <Button className={styles.add} onClick={() => append({name: ''})}>Add tag</Button> : ''}
    //         </div>
    //     )
    // })

    const openWarning = (type) => {
        notification[type]({
            message: 'Error',
            description: 'Something got wrong'
        })
    }

    const onSubmit = (data) => {
        const {Title, Description, Text, tag} = data;
        console.log(Title, Description, Text, tag);
        const tagList = tag.map(el => Object.values(el)).flat();
        dispatch(createNewArticle(Title, Description, Text, tagList))
        dispatch(fetchDispatch(5, 1, dispatch))
        navigate('/')
    }

    return (
        <EditCreate value={defaultValue} title="" body="" description="" nameList={"Create actions"} onHandleSubmit={onSubmit} />
    )
}

export default CreateArticle;
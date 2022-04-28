import React, {useEffect} from "react";
import {useForm, useFieldArray, useController} from "react-hook-form";
import {notification} from "antd";
import {useDispatch, useSelector} from "react-redux";
import FormCreateFormArticle from "../form-reate-form-article";
import {useNavigate} from "react-router-dom";
import {createNewArticle} from "../../redux/actions/article-create";
import {fetchDispatch} from "../../redux/actions/articles";

const CreateArticle = ({howToHandleSubmit}) => {

    const error = useSelector(state => state.articleCreated.isCreated)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultValue = {
        tag: [{name: ''}]
    }

    const {
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: defaultValue
    })

    const openWarning = (type) => {
        notification[type]({
            message: 'Error',
            description: 'Something got wrong'
        })
    }

    const onSubmit = (data) => {
        const {Title, Description, Text, tag} = data;
        const tagList = tag.map(el => Object.values(el)).flat();
        dispatch(createNewArticle(Title, Description, Text, tagList))
        dispatch(fetchDispatch(5, 1, dispatch))
        if (error) {
            openWarning('warning')
        }
        navigate('/')
    }

    return (
        <FormCreateFormArticle value={defaultValue} title="" body="" description="" nameList={"Create actions"} onHandleSubmit={onSubmit} />
    )
}

export default CreateArticle;
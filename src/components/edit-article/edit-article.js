import React, {useEffect, useState} from "react";
import FormCreateFormArticle from "../form-reate-form-article";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {editingArticle} from "../../redux/actions/article-edit";
import {getArticle} from "../../redux/actions/single-article";
import {notification} from "antd";

const EditArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();
    const loading = useSelector(state => state.singleArticle.isLoading);
    const info = useSelector(state => state.singleArticle.fullArticle);
    const error = useSelector(state => state.articleEdit.isEdit);

    const tagsObject = info.tagList === undefined ? [{name: ''}] : info.tagList.map((tag) => Object.fromEntries([['name', tag]]));

    const defaultValue = {
        tag: tagsObject
    }

    useEffect(() => {
        dispatch(getArticle(slug))
    }, [])

    const openWarning = (type) => {
        notification[type]({
            message: 'Error',
            description: 'Something got wrong'
        })
    }

    const handleSubmit = (data) => {
        const {Title, Text, Description, tag} = data;
        const tagNew = tag.map(el => Object.values(el)).flat();
        dispatch(editingArticle(Title, Description, Text, tagNew, slug))
        if (error) {
            openWarning('warning')
        }
        navigate('/')
    }

    const loader = loading ? <Loader /> : null

    return (
        <div>
            {loader}
            <FormCreateFormArticle value={defaultValue} title={info.title} description={info.description} body={info.body} onHandleSubmit={handleSubmit} nameList={'Edit article'} />
        </div>
    )
}

export default EditArticle;
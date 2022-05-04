import React, {useCallback, useEffect, useState} from "react";
import FormCreateFormArticle from "../form-reate-form-article";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {editingArticle} from "../../redux/actions/article-edit";
import {getArticle, isGetArticle} from "../../redux/actions/single-article";
import {notification} from "antd";
import {fetchDispatch} from "../../redux/actions/articles";

const EditArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();
    const loading = useSelector(state => state.singleArticle.isLoading);
    const info = useSelector(state => state.singleArticle.fullArticle);
    const {title, description, body, author} = info;
    const dataUser = JSON.parse(localStorage.getItem('user'))
    // console.log(dataUser.username, author.username)
    const error = useSelector(state => state.articleEdit.isEdit);

    const tagsObject = info.tagList === undefined ? [{name: ''}] : info.tagList.map((tag) => Object.fromEntries([['name', tag]]));

    const defaultValue = {
        tag: tagsObject
    }


    useEffect(() => {
        dispatch(getArticle(slug))
    }, [slug])

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
            {loader ||
            <FormCreateFormArticle value={defaultValue} title={title} description={description} body={body} onHandleSubmit={handleSubmit} nameList={'Edit article'} />}
        </div>
    )
}

export default EditArticle;
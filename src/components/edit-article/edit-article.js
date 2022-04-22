import React, {useEffect, useState} from "react";
import EditCreate from "../form-reate-form-article";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editingArticle, getOldArticle} from "../../redux/actions";
import ApiService from "../../utilities/api-service/api-service";
import Loader from "../loader";
import {notification} from "antd";

const EditArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();
    const loading = useSelector(state => state.articles.isLoading)
    const info = useSelector(state => state.articles.fullArticle); // запихнули инфу о статье в стор
    const user = JSON.parse(localStorage.getItem('user'))
    const userInfo = info.author.username

    const tagsObject = info.tagList === undefined ? [{name: ''}] : info.tagList.map((tag) => Object.fromEntries([['name', tag]]));

    const defaultValue = {
        tag: tagsObject
    }

    useEffect(() => { // вроде как получаю данные с сервера о статье
        // dispatch(editingArticle(info.title, info.description, info.body, info.tagList, slug))
        dispatch(getOldArticle(slug))
    }, [])

    const handleSubmit = (data) => {
        const {Title, Text, Description, tag} = data;
        const tagNew = tag.map(el => Object.values(el)).flat();
        dispatch(editingArticle(Title, Description, Text, tagNew, slug))
        navigate('/')
        // сюда прописать диспатч с editingArticle из useEffect'а
    }

    const loader = loading ? <Loader /> : null

    // получаем всю инфу по статье с сервера. распределяем по инпутам в defaultValue

    // делаем асинковый запрос на сервер, получаем  инфу, прокидываем в defaultValue. а что если мы при клике еще в фулл артикл достаем инфу,
    // диспатчим ее в стор, а уже из стора едитим и снова вызываем createArticle, передавая новые пропсы
    // где мы будем получать всю инфу.
    // не, мы будем получать всю инфу о статье из пропсов, а потом прокидывать в форму

    return (
        <div>
            {loader}
            <EditCreate value={defaultValue} title={info.title} description={info.description} body={info.body} onHandleSubmit={handleSubmit} nameList={'Edit article'} />
        </div>
    )
}

export default EditArticle;
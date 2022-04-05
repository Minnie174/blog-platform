import React, {useEffect} from "react";
import Article from "../article";
import {useDispatch, useSelector} from "react-redux";
import {fetchDispatch, getArticles} from "../../redux/actions";
import {uniqueId} from "lodash";
import ApiService from "../../utilities/api-service/api-service";
// import styles from '../../styles/articles-list.module.scss';

const ArticlesList = () => {
    const dispatch = useDispatch();
    const api = new ApiService()
    const articlesList = useSelector(state => state.articles.articlesData); // массив со всеми статьями
    const newResponse = articlesList.map(el => ({...el, id: el.slug})) // с уникальным айди
    const currentPage = useSelector(state => state.articles.currentPage) // по дефолту 0
    const perPage = useSelector(state => state.articles.perPage)

    useEffect( () => {
        dispatch(fetchDispatch(5, currentPage))
        // async function getPage() {
        //     const res = await api.getPagination(5, currentPage) // вернется массив с пятью штуками
        //     console.log(res)
        // }
        // console.log(getPage())
        // const response = await api.getPagination(5, currentPage)
        // dispatch(getArticles())
    }, [currentPage])
    console.log(articlesList)

    const indexOfLastPost = currentPage * perPage; // 1 * 5 = 5
    const indexOfFirstPost = indexOfLastPost - perPage // 5 - 5 = 0
    const currentArticles = newResponse.slice(indexOfFirstPost, indexOfLastPost); // первые пять
    // console.log(currentArticles) // вомзможно, нам эта штука и не понадобится - все сделаем в апи-сервис

    const article = newResponse.map(el => { // возвращается массив с артиклями
        return (
            <Article
                key={el.id}
                title={el.title}
                info={el.description}
                date={el.createdAt}
                tag={el.tagList}
                num={el.favoritesCount}
                profile={el.author.username}
                avatar={el.author.image}
            />
        )
    })

    return (
        <div>
            {article}
        </div>
    )
}

export default ArticlesList;
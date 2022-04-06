import React, {useEffect} from "react";
import Article from "../article";
import {useDispatch, useSelector} from "react-redux";
import {fetchDispatch, getArticles} from "../../redux/actions";
import {Route, Routes, Link} from "react-router-dom";
import FullArticle from "../full-article";
// import styles from '../../styles/articles-list.module.scss';

const ArticlesList = () => {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.articles.articlesData); // массив со всеми статьями
    const newResponse = articlesList.map(el => ({...el, id: el.slug})) // с уникальным айди
    const currentPage = useSelector(state => state.articles.currentPage) // по дефолту 1

    useEffect( () => {
        dispatch(fetchDispatch(5, currentPage))
    }, [currentPage])

    const article = newResponse.map(el => { // возвращается массив с артиклями
        return (
                <Article
                key={el.id}
                id={el.slug}
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
            {/*<FullArticle />*/}
        </div>
    )
}

export default ArticlesList;
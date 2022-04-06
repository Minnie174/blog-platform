import React, {useEffect} from "react";
import Article from "../article";
import {useDispatch, useSelector} from "react-redux";
import {fetchDispatch, getArticles, getLoading} from "../../redux/actions";
import Loader from "../loader";

const ArticlesList = () => {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.articles.articlesData); // массив со всеми статьями
    const newResponse = articlesList.map(el => ({...el, id: el.slug})) // с уникальным айди
    const loading = useSelector(state => state.articles.isLoading)
    const currentPage = useSelector(state => state.articles.currentPage) // по дефолту 1
    console.log(loading)

    useEffect( () => {
        // dispatch(getLoading(true))
        dispatch(fetchDispatch(5, currentPage, dispatch))
    }, [currentPage])

    const loader = loading ? <Loader /> : null

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
            {loader}
            {article}
        </div>
    )
}

export default ArticlesList;
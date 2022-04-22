import React, {useEffect} from "react";
import Article from "../article";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteLike,
    fetchDispatch,
    getArticles,
    getLoading,
    isLiked,
    isLikeDelete,
    likeArticle
} from "../../redux/actions";
import Loader from "../loader";
import {notification} from "antd";

const ArticlesList = () => {
    const dispatch = useDispatch();
    const articlesList = useSelector(state => state.articles.articlesData); // массив со всеми статьями
    const newResponse = articlesList.map(el => ({...el, id: el.slug})) // с уникальным айди
    const loading = useSelector(state => state.articles.isLoading)
    const isErrorLike = useSelector(state => state.articles.isError);
    const currentPage = useSelector(state => state.articles.currentPage) // по дефолту 1
    const isToken = JSON.parse(localStorage.getItem('token')) !== null;

    const statusLike = useSelector(state => state.articles.isLike);
    const statusUnLike = useSelector(state => state.articles.isUnlike);
    console.log(statusLike, statusUnLike)

    useEffect( () => {
        dispatch(fetchDispatch(5, currentPage, dispatch))
        if (statusLike || statusUnLike) {
            dispatch(isLiked(null))
        } else {
            dispatch(isLikeDelete(null));
            // if (!isErrorLike) {
            //     return notification['warning']({
            //         message: 'Error',
            //         description: `Like or dislike didn't count`
            //     })
            // }
        }
    }, [currentPage, statusLike, statusUnLike, isToken])

    const handleLike = (el) => {
        if (isToken) {
            if (!el.favorited) {
                dispatch(likeArticle(el.slug))
            }
            dispatch(deleteLike(el.slug))
        } else {
            return notification['warning']({
                message: 'Error',
                description: 'You should sign in'
            })
        }
    }

    const loader = loading ? <Loader /> : null;

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
                fav={el.favorited}
                profile={el.author.username}
                avatar={el.author.image}
                likeArticle={() => handleLike(el)}
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
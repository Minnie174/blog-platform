import React, {useState, useEffect} from "react";
import {Route, Routes, Link} from "react-router-dom";
import ArticlesList from "../articles-list";
import styles from '../../styles/app.module.scss'
import PaginationArticles from "../pagination";
import ApiService from "../../utilities/api-service/api-service";
import {useDispatch} from "react-redux";
import {getArticles, setLengthOfPosts} from "../../redux/actions";


const BlogPlatform = () => {

    // const dispatch = useDispatch();
    //
    // const getList = async () => {
    //     // const api = new ApiService();
    //     // const res = await api.getListOfArticles() // получаем общий массив
    //     // dispatch(setLengthOfPosts(res.length - 1)) // обновляем стейт totalCount
    //     // console.log(await api.getPagination(5, 25))
    // }
    //
    // useEffect( () => {
    //     dispatch(getArticles)
    // }, [])


    return (
        <div>
            <header className={styles.header}>
                <h1>Realworld Blog</h1>
                <div>
                    <a className={styles.signIn}>Sign In</a>
                    <a className={styles.signUp}>Sign Up</a>
                </div>
            </header>
            <main className={styles.main}>
                <div>
                    <ArticlesList />
                </div>
                <PaginationArticles />
            </main>
        </div>
    )
};

export default BlogPlatform;
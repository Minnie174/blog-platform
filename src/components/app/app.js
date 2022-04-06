import React, {useState, useEffect} from "react";
import {Route, Routes, Link} from "react-router-dom";
import ArticlesList from "../articles-list";
import styles from '../../styles/app.module.scss'
import PaginationArticles from "../pagination";
import FullArticle from "../full-article";
import Header from "../header";
import SignIn from "../form-sign-in";
import SignUp from "../form-sign-up";


const BlogPlatform = () => {
    return (
        <div>
            <Header />
                <main className={styles.main}>
                    <div>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                    <ArticlesList />
                                    <PaginationArticles />
                                    </>}
                            />
                            <Route />
                            <Route path="articles/:id"
                                   element={<FullArticle />}
                            />
                            <Route path="sign-in"
                                   element={<SignIn />}
                            />
                            <Route path="sign-up"
                                   element={<SignUp />}
                            />
                        </Routes>
                    </div>
                </main>
        </div>
    )
};

export default BlogPlatform;
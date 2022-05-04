import React from "react";
import {Navigate, Outlet, Redirect, Route, Routes} from "react-router-dom";
import ArticlesList from "../articles-list";
import styles from '../../styles/app.module.scss'
import FullArticle from "../full-article";
import Header from "../header";
import SignIn from "../sign-in";
import SignUp from "../sign-up";
import {RequireAuth} from "../../hoc/RequireAuth";
import EditProfile from "../profile";
import CreateArticle from "../create-article";
import EditArticle from "../edit-article";
import Layout from "../layout";
import {RequireUser} from "../../hoc/RequireUser";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<Layout />}>
                    <Route path="articles/:slug"
                           element={<FullArticle />}
                    />
                    <Route path="sign-in"
                           element={<SignIn />}
                    />
                    <Route path="sign-up"
                           element={<SignUp />}
                    />
                    <Route path="profile"
                           element={<RequireAuth><EditProfile /></RequireAuth>}
                    />
                    <Route path="new-article"
                           element={<RequireAuth><CreateArticle /></RequireAuth>}
                    />
                    <Route path="articles/:slug/edit"
                           element={<RequireUser><EditArticle /></RequireUser>}
                    />
                    <Route
                        index
                        element={<ArticlesList />}
                    />
                </Route>
            </Routes>
        </div>
    )
};

export default App;
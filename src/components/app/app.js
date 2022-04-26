import React from "react";
import {Route, Routes} from "react-router-dom";
import ArticlesList from "../articles-list";
import styles from '../../styles/app.module.scss'
import FullArticle from "../full-article";
import Header from "../header";
import SignIn from "../form-sign-in";
import SignUp from "../form-sign-up";
import {RequireAuth} from "../../hoc/RequireAuth";
import EditProfile from "../profile";
import CreateArticle from "../create-article";
import EditArticle from "../edit-article";


const App = () => {
    return (
        <div>
            <Header />
                <main className={styles.main}>
                    <div>
                        <Routes>
                            <Route
                                path="/"
                                element={<ArticlesList />}
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
                            <Route path="profile"
                                   element={<RequireAuth><EditProfile /></RequireAuth>}
                            />
                            <Route path="new-article"
                                   element={<RequireAuth><CreateArticle /></RequireAuth>}
                            />
                            <Route path="articles/:slug/edit"
                                   element={<RequireAuth><EditArticle /></RequireAuth>}
                            />
                        </Routes>
                    </div>
                </main>
        </div>
    )
};

export default App;
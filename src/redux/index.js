import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";
import {reducerArticleEdit} from "./reducers/article-edit";
import {reducerSingleArticle} from "./reducers/single-article";
import {reducerArticleCreate} from "./reducers/article-create";
import {reducerLogin} from "./reducers/user-login";
import {reducerEditUser} from "./reducers/user-edit";
import {reducerLikes} from "./reducers/likes";
import {reducerUser} from "./reducers/user";
import {reducerArticle} from "./reducers/articles";

const rootReducer = combineReducers({
    articles: reducerArticle,
    articleEdit: reducerArticleEdit,
    articleCreated: reducerArticleCreate,
    singleArticle: reducerSingleArticle,
    userReg: reducerUser,
    userLogin: reducerLogin,
    userEdit: reducerEditUser,
    likes: reducerLikes
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
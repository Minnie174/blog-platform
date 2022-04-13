import {createStore, combineReducers, applyMiddleware} from "redux";
import {reducerArticle} from "./reducerArticle";
import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";
import reducerUser from "./reducerUser";

const rootReducer = combineReducers({
    articles: reducerArticle,
    user: reducerUser
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
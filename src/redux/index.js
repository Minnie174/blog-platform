import {createStore, combineReducers, applyMiddleware} from "redux";
import {reducerArticle} from "./reducerArticle";
import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    articles: reducerArticle,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import BlogPlatform from "./components/app/app";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <BlogPlatform />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

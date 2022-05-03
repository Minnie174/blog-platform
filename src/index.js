import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import App from "./components/app/app";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
);

import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import App from "./components/app/app";
import ReactDOM from 'react-dom/client';
//import { createRoot } from 'react-dom/client';

// const container = document.getElementById('root');
// const root = createRoot(container)
//
// root.render(
//         <BrowserRouter>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );
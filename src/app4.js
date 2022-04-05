import {Route, Routes, Link} from "react-router-dom";
import React from "react";
import {Home} from "./home";
import {Blog} from "./blog";

export const App4 = () => {
    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <a>About</a>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
            </Routes>
        </div>
    )
}
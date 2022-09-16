import React from 'react';
import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Main from "./layouts/Main"
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}>
                <Route index element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/work" element={<Work/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/post" element={<Post/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;

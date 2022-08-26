import React from 'react';
import SearchBar from "../components/SearchBar";
import MyCarousel from "../components/MyCarousel";
import Articles from "../components/Articles";


function Home(props) {

    return (
        <>
            <SearchBar/>
            <MyCarousel/>
            <Articles title={"Articles"}/>
            <Articles title={"Tutorials"}/>
        </>
    );
}

export default Home;
import React from 'react';
import MyCarousel from "../components/MyCarousel";
import Articles from "../components/Articles";


function Home(props) {

    return (
        <>
            <MyCarousel/>
            <Articles title={"Articles"}/>
            <Articles title={"Tutorials"}/>
        </>
    );
}

export default Home;
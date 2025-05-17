import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import Slider_features from "./Slider_features.jsx";

const Home = () => {
    const [subPage, setSubPage] = React.useState("home"); // home, pollen, uv, pollution, mental

    return (
        <>
            <Navbar />
            <h1>Home</h1>
            <Slider_features activeSubpage={subPage} changeSubpage={setSubPage} />
        </>
    );
};

export default Home;

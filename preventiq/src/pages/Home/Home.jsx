import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Bell } from 'lucide-react';
import Slider_features from "./Slider_features.jsx";

import Top from "./HomepageView/Top.jsx";
import Metrics from "./HomepageView/Metrics.jsx";
import Footer from "../GeneralComponents/Footer.jsx";


const Home = () => {
    const [subPage, setSubPage] = React.useState("home"); // home, pollen, uv, pollution, mental

    return (
        <>

            {/* User Header */}
            <Top/>
            <Slider_features activeSubpage={subPage} changeSubpage={setSubPage} />
            <Metrics/>
        </>
    );
};

export default Home;

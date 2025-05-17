import React from 'react'
import userDefault from "../../../assets/userDefault.jpg";
import bossImage from "../../../assets/Boss.png"
import SplitText from "./SplitText.jsx";
import { Link } from "react-router-dom";

const Top = () => {
    return (
        <div className="px-6 pt-4 flex justify-between items-center " data-theme="nord">
            <div className="flex items-center space-x-3 w-full">
                {/*<div*/}
                {/*    className="w-12 h-12 rounded-full bg-primary-content flex items-center justify-center overflow-hidden">*/}
                {/*    <Link to="/profile">*/}
                {/*        <img*/}
                {/*            src={userDefault}*/}
                {/*            alt="User avatar"*/}
                {/*            className="w-full h-full object-cover"*/}
                {/*        />*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<div className="font-semibold text-lg">Hello, Ana!</div>*/}
                <div className="flex justify-between w-full">
                    <div>
                        <h1 className="text-base">Welcome</h1>
                        <h1 className="text-2xl font-bold">Borjan Gjorgjievski</h1>
                    </div>
                </div>
                <div
                    className="w-14 h-14 rounded-full bg-primary-content flex items-center justify-center overflow-hidden">
                    <Link to="/profile">
                        <img
                            src={bossImage}
                            alt="User avatar"
                        />

                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Top

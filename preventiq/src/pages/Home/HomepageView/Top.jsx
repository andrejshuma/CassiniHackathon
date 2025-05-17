import React from 'react'
import userDefault from "../../../assets/userDefault.jpg";
import SplitText from "./SplitText.jsx";

const Top = () => {
    return (
        <div className="px-6 py-4 flex justify-between items-center" data-theme = "nord">
            <div className="flex items-center space-x-3">
                <div
                    className="w-12 h-12 rounded-full bg-primary-content flex items-center justify-center overflow-hidden">
                    <img
                        src={userDefault}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="font-semibold text-lg">Hello, Ana!</div>
            </div>
        </div>
    )
}
export default Top

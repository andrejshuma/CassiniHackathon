import React from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Bell } from 'lucide-react';
import userDefault from "../../assets/userDefault.jpg";
const Home = () => {
    return (
        <>
            <Navbar/>
            {/* User Header */}
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


        </>
    );
};

export default Home;

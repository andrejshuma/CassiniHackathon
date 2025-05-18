import React from 'react'
import {Bubbles, Factory, House, Sun, Building, LeafyGreen, CloudFog, Biohazard} from "lucide-react";

const NewSlider = ({ setSubPage }) => {


    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-1">
                <button
                    onClick={() => setSubPage("home")}
                    className="bg-blue-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <House size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Home</span>
                </button>
                <button
                    onClick={() => setSubPage("pollen")}
                    className="bg-purple-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <Bubbles size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Pollen</span>
                </button>
                <button
                    onClick={() => setSubPage("cityDensity")}
                    className="bg-yellow-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <Building size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Urbanization</span>
                </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <button
                    onClick={() => setSubPage("pollution")}
                    className="bg-amber-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <Biohazard size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Pollution</span>
                </button>
                <button
                    onClick={() => setSubPage("uv")}
                    className="bg-green-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <Sun size={24} color="#374151"/>
                    <span className="text-s text-gray-700">UV</span>
                </button>
                <button
                    onClick={() => setSubPage("ozone")}
                    className="bg-orange-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <CloudFog size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Ozone</span>
                </button>
                <button
                    onClick={() => setSubPage("greenDensity")}
                    className="bg-red-100 p-3 rounded-lg flex flex-col justify-between items-center gap-1 shadow-md">
                    <LeafyGreen size={24} color="#374151"/>
                    <span className="text-s text-gray-700">Greenery</span>
                </button>

            </div>
        </>
    )
}
export default NewSlider

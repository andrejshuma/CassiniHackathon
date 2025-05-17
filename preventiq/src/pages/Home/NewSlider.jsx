import React from 'react'
import { Bubbles, Factory, House , Sun,Building,LeafyGreen,CloudFog } from "lucide-react";

const NewSlider = ({ setSubPage }) => {
    return (
        <div className="grid grid-cols-7 gap-2 mb-4">
            <button
                onClick={() => setSubPage("home")}
                className="bg-blue-100 p-3 rounded-xl flex flex-col justify-between items-center ">
                <House size={24}/>
                <span className="text-xs text-gray-700">Home</span>
            </button>
            <button
                onClick={() => setSubPage("pollen")}
                className="bg-purple-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <Bubbles size={24}/>
                <span className="text-xs text-gray-700" >Pollen</span>
            </button>
            <button
                onClick={() => setSubPage("uv")}
                className="bg-green-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <Sun size={24}/>
                <span className="text-xs text-gray-700">UV index</span>
            </button>
            <button
                onClick={() => setSubPage("pollution")}
                className="bg-amber-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <Building size={24}/>
                <span className="text-xs text-gray-700">Air pollution</span>
            </button>
            <button
                onClick={() => setSubPage("greenDensity")}
                className="bg-red-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <LeafyGreen size={24}/>
                <span className="text-xs text-gray-700">Green density</span>
            </button>
            <button
                onClick={() => setSubPage("ozone")}
                className="bg-orange-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <CloudFog size={24}/>
                <span className="text-xs text-gray-700">Ozone</span>
            </button>
            <button
                onClick={() => setSubPage("cityDensity")}
                className="bg-yellow-100 p-3 rounded-xl flex flex-col justify-between items-center">
                <Building size={24}/>
                <span className="text-xs text-gray-700">City density</span>
            </button>

        </div>
    )
}
export default NewSlider

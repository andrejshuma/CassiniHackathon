import React from 'react'
import { Bubbles, Factory, House , Sun,Building,LeafyGreen,CloudFog } from "lucide-react";

const NewSlider = () => {
    return (
        <div className="grid grid-cols-7 gap-2 mb-4">
            <button className="bg-blue-100 p-3 rounded-2xl flex flex-col items-center">
                <House size={24}/>
                <span className="text-xs text-gray-700">Home</span>
            </button>
            <button className="bg-purple-100 p-3 rounded-2xl flex flex-col items-center">
                <Bubbles size={24}/>
                <span className="text-xs text-gray-700">Pollen</span>
            </button>
            <button className="bg-green-100 p-3 rounded-2xl flex flex-col items-center">
                <Sun size={24}/>
                <span className="text-xs text-gray-700">UV index</span>
            </button>
            <button className="bg-amber-100 p-3 rounded-2xl flex flex-col items-center">
                <Building size={24}/>
                <span className="text-xs text-gray-700">Air pollution</span>
            </button>
            <button className="bg-red-100 p-3 rounded-2xl flex flex-col items-center">
                <LeafyGreen size={24}/>
                <span className="text-xs text-gray-700">Green density</span>
            </button>
            <button className="bg-orange-100 p-3 rounded-2xl flex flex-col items-center">
                <CloudFog size={24}/>
                <span className="text-xs text-gray-700">Ozone</span>
            </button>
            <button className="bg-yellow-100 p-3 rounded-2xl flex flex-col items-center">
                <Building size={24}/>
                <span className="text-xs text-gray-700">City density</span>
            </button>

        </div>
    )
}
export default NewSlider

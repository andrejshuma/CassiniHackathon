import {Activity, Brain, Heart, MessageCircle, Phone, Sun, Moon, Zap} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import NewSlider from "../NewSlider.jsx";
import OverralHealth from "../OverralHealth.jsx";
import Slider_features from "../Slider_features.jsx";
import FeaturePage from "../../FeatureIndexes/FeaturePage.jsx";

const data = {
    "name": "Pollen",
    "array": [
        {
            "name": "Pollen Tree",
            "index": 0.2,
            "description": "Pollen Three is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Weed",
            "index": 0.5,
            "description": "Pollen Weed is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Grass",
            "index": 0.8,
            "description": "Pollen v is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Tree",
            "index": 0.2,
            "description": "Pollen Three is a type of pollen that is common in the spring and summer months.",
        },
        {
            "name": "Pollen Weed",
            "index": 0.5,
            "description": "Pollen Weed is a type of pollen that is common in the spring and summer months.",
        }
    ]
}

export default function Metrics() {
    const navigate = useNavigate();
    const [mentalHealthScore, setMentalHealthScore] = useState(72);
    const [subPage, setSubPage] = useState("home"); // home, pollen, uv, pollution, greenDensity, ozoneDensity


    const getMentalHealthCategory = (score) => {
        if (score >= 80) return {label: "Excellent", color: "text-green-600"};
        if (score >= 70) return {label: "Good", color: "text-green-500"};
        if (score >= 60) return {label: "Fair", color: "text-yellow-500"};
        if (score >= 50) return {label: "Needs Attention", color: "text-orange-500"};
        return {label: "Poor", color: "text-red-500"};
    };

    const mentalHealthCategory = getMentalHealthCategory(mentalHealthScore);
    const shadowStyle = { boxShadow: "1px 4px 3px rgba(0, 0, 0, 0.1)" };
    return (
        <div className="p-4 max-w-md mx-auto">
            {/* Mental Health Card */}
            <div className="bg-blue-50 rounded-3xl p-4 mb-4 shadow-md">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <div
                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden mr-4">
                            <svg viewBox="0 0 24 24" width="24" height="24" className="text-green-500">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-700">Safety Score</h3>
                            <p className="text-sm text-gray-600">Today's Status: <span
                                className={mentalHealthCategory.color}>{mentalHealthCategory.label}</span></p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                    <div
                        className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{width: `${mentalHealthScore}%`}}
                    ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                </div>


                {/* Tips/Recommendations */}
                <div className="bg-white rounded-lg p-3 text-sm border border-blue-100">
                    <h4 className="font-medium text-gray-700 mb-1">Today's Recommendation</h4>
                    <p className="text-gray-600">Try 5 minutes of mindful breathing to reduce stress and improve your
                        focus for the day.</p>
                </div>
            </div>


            <NewSlider setSubPage={setSubPage}/>

            {
                subPage === "home" ? (
                    <>
                        <div className="bg-green-100 rounded-3xl p-4 mb-4 flex justify-between shadow-md">
                            <div className="space-y-3 flex justify-center flex-col">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-700 mb-1">Health Tips</h2>
                                    <p className="text-base text-gray-700">Air quality requires caution</p>
                                    <p className="text-base text-gray-700">Try indoor activities today</p>
                                </div>
                                <button
                                    className="bg-white border border-gray-300 text-gray-800 px-4 py-1 rounded-lg text-base"
                                    onClick={() => navigate('/advice')} // Navigate to Advice page
                                >
                                    See Details
                                </button>
                            </div>
                            <div className="w-32 h-32 relative">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    {/* Background circle */}
                                    <circle cx="100" cy="100" r="90" fill="#f0f9ff"/>

                                    {/* Shield outline */}
                                    <path
                                        d="M100 30 C 140 30, 160 45, 160 90 C 160 130, 130 160, 100 170 C 70 160, 40 130, 40 90 C 40 45, 60 30, 100 30"
                                        fill="#b3e0c9" stroke="#4ade80" strokeWidth="3"/>

                                    {/* Lungs */}
                                    <path
                                        d="M80 65 C 80 80, 70 90, 70 100 C 70 110, 75 120, 85 125 C 90 127, 95 120, 90 115 C 85 110, 85 105, 85 100 C 85 90, 90 85, 90 75 L 90 65 Z"
                                        fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
                                    <path
                                        d="M120 65 C 120 80, 130 90, 130 100 C 130 110, 125 120, 115 125 C 110 127, 105 120, 110 115 C 115 110, 115 105, 115 100 C 115 90, 110 85, 110 75 L 110 65 Z"
                                        fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>

                                    {/* Trachea */}
                                    <path d="M100 65 L 100 50 M 90 65 L 110 65 M 95 57.5 L 105 57.5"
                                          fill="none" stroke="#3b82f6" strokeWidth="1.5"/>

                                    {/* Air particles */}
                                    <circle cx="65" cy="90" r="3" fill="#60a5fa"/>
                                    <circle cx="75" cy="108" r="3" fill="#60a5fa"/>
                                    <circle cx="135" cy="90" r="3" fill="#60a5fa"/>
                                    <circle cx="125" cy="108" r="3" fill="#60a5fa"/>

                                    {/* Leaf for environmental health */}
                                    <path
                                        d="M100 100 C 115 85, 130 95, 115 115 C 110 120, 105 125, 100 130 C 95 125, 90 120, 85 115 C 70 95, 85 85, 100 100 Z"
                                        fill="#86efac" stroke="#22c55e" strokeWidth="1.5"/>
                                    <path d="M100 100 L 100 130"
                                          fill="none" stroke="#22c55e" strokeWidth="1.5"/>

                                    {/* Sun rays for UV */}
                                    <circle cx="50" cy="50" r="10" fill="#fcd34d"/>
                                    <line x1="40" y1="40" x2="35" y2="35" stroke="#fcd34d" strokeWidth="2"/>
                                    <line x1="50" y1="36" x2="50" y2="30" stroke="#fcd34d" strokeWidth="2"/>
                                    <line x1="60" y1="40" x2="65" y2="35" stroke="#fcd34d" strokeWidth="2"/>
                                    <line x1="64" y1="50" x2="70" y2="50" stroke="#fcd34d" strokeWidth="2"/>
                                    <line x1="36" y1="50" x2="30" y2="50" stroke="#fcd34d" strokeWidth="2"/>

                                    {/* Air quality wave */}
                                    <path d="M160 70 C 150 65, 145 75, 135 70 C 125 65, 120 75, 110 70"
                                          fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M160 80 C 150 75, 145 85, 135 80 C 125 75, 120 85, 110 80"
                                          fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                        {/*health tips*/}

                        {/* Metrics Row */}
                        <div className="grid grid-cols-2 gap-4 mb-4 ">
                            {/* Air Pollution */}
                            <div className="bg-gray-100 rounded-3xl p-4 shadow-md">
                                <div className="w-10 h-10 mb-6 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="40" height="40" className="text-gray-700">
                                        <path d="M4 14a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4z" fill="currentColor"/>
                                        <path d="M7 10a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2H7z" fill="currentColor"/>
                                        <path d="M9 18a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2H9z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Air pollution</p>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-gray-700">123</span>
                                        <span className="text-lg text-gray-500"> PM10</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pollen Count */}
                            <div className="bg-gray-100 rounded-3xl p-4 s shadow-md">
                                <div className="w-10 h-10 mb-6 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className="text-gray-700">
                                        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor"
                                                strokeWidth="2"/>


                                        <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                                        <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
                                        <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                                        <circle cx="19" cy="12" r="1.5" fill="currentColor"/>


                                        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>
                                        <circle cx="16.5" cy="16.5" r="1.5" fill="currentColor"/>
                                        <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor"/>
                                        <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor"/>


                                        <line x1="12" y1="2" x2="12" y2="3.5" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                        <line x1="12" y1="20.5" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                        <line x1="2" y1="12" x2="3.5" y2="12" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                        <line x1="20.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>


                                        <line x1="4.5" y1="4.5" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                        <line x1="18" y1="18" x2="19.5" y2="19.5" stroke="currentColor"
                                              strokeWidth="1.5" strokeLinecap="round"/>
                                        <line x1="4.5" y1="19.5" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                        <line x1="18" y1="6" x2="19.5" y2="4.5" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Pollen level</p>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-gray-700">67</span>
                                        <span className="text-lg text-gray-500"> / 100</span>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-gray-100  rounded-3xl p-4 shadow-md">
                                <div className="w-10 h-10 mb-6 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="35" height="35" className="text-gray-700 ">
                                        <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor"
                                                strokeWidth="2"/>
                                        <path
                                            d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">UV index</p>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-gray-700">5</span>
                                        <span className="text-lg text-gray-500"> / 10</span>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-gray-100 rounded-3xl p-4 shadow-md">
                                <div className="w-10 h-10 mb-6 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="40" height="40" className="text-gray-700"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M12 21v-6"/>
                                        <path d="M12 15c-1.5-3-5-4-8-4 1.5 3 5 4 8 4z"/>
                                        <path d="M12 15c1.5-3 5-4 8-4-1.5 3-5 4-8 4z"/>
                                        <circle cx="12" cy="12" r="0.5" fill="currentColor"/>
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-700">Green coverage</p>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-gray-700">32%</span>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-indigo-50 rounded-3xl p-4 mb-4 shadow-md">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <Zap size={18} className="text-indigo-600"/>
                                </div>
                                <h3 className="font-bold text-gray-700">Today's Insights</h3>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-indigo-100">
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Pattern detected:</span> Your mental health scores
                                    tend to improve on days with less air pollution.
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Suggestion:</span> Plan your outdoor activities for
                                    early morning when air quality is better.
                                </p>
                            </div>
                        </div>
                    </>
                ) : <FeaturePage data={data}/>
            }


        </div>
    );
}
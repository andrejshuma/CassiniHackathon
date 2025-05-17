import React from 'react'

const OverralHealth = () => {
    return (
        <div className="bg-yellow-100 rounded-3xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 24 24" width="24" height="24" className="text-green-500">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700">Overall Health</h3>
                        <p className="text-sm text-gray-700">Score: 78/100 (Good)</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="18" height="18" className="text-green-500">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="18" height="18" className="text-green-500">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>


            {/* Overall Health Score Breakdown */}
            <div className="bg-white rounded-lg p-3 mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Health Score Breakdown</h4>

                {/* Mental Component */}
                <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Mental Health</span>
                        <span className="font-medium">1/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${1}%` }}></div>
                    </div>
                </div>

                {/* Physical Component */}
                <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Physical Health</span>
                        <span className="font-medium">80/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '80%' }}></div>
                    </div>
                </div>

                {/* Environmental Component */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Environmental Health</span>
                        <span className="font-medium">65/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>

            {/* Summary and Reminder */}
            <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded-lg">
                Your environmental and physical health metrics are good, but consider focusing on mental wellbeing today. Taking short breaks and practicing mindfulness can help improve your overall score.
            </p>
        </div>
    )
}
export default OverralHealth

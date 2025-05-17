import { Activity, Heart, MessageCircle, Phone } from 'lucide-react';

export default function HeartHealthMetrics() {
    return (
        <div className="p-4 max-w-md mx-auto">
            {/* Health Tips Card with 3D Heart */}
            <div className="bg-green-100 rounded-3xl p-4 mb-4 flex justify-between">
                <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <Heart size={20} className="text-gray-700"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-700">Health Tips</h2>
                        <p className="text-sm text-gray-700">Air quality requires caution</p>
                        <p className="text-sm text-gray-700">Try indoor activities today</p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-800 px-4 py-1 rounded-full text-sm">
                        See Details
                    </button>
                </div>
                <div className="w-32 h-32 relative">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Background circle */}
                        <circle cx="100" cy="100" r="90" fill="#f0f9ff" />

                        {/* Shield outline */}
                        <path d="M100 30 C 140 30, 160 45, 160 90 C 160 130, 130 160, 100 170 C 70 160, 40 130, 40 90 C 40 45, 60 30, 100 30"
                              fill="#b3e0c9" stroke="#4ade80" strokeWidth="3" />

                        {/* Lungs */}
                        <path d="M80 65 C 80 80, 70 90, 70 100 C 70 110, 75 120, 85 125 C 90 127, 95 120, 90 115 C 85 110, 85 105, 85 100 C 85 90, 90 85, 90 75 L 90 65 Z"
                              fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
                        <path d="M120 65 C 120 80, 130 90, 130 100 C 130 110, 125 120, 115 125 C 110 127, 105 120, 110 115 C 115 110, 115 105, 115 100 C 115 90, 110 85, 110 75 L 110 65 Z"
                              fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />

                        {/* Trachea */}
                        <path d="M100 65 L 100 50 M 90 65 L 110 65 M 95 57.5 L 105 57.5"
                              fill="none" stroke="#3b82f6" strokeWidth="1.5" />

                        {/* Air particles */}
                        <circle cx="65" cy="90" r="3" fill="#60a5fa" />
                        <circle cx="75" cy="108" r="3" fill="#60a5fa" />
                        <circle cx="135" cy="90" r="3" fill="#60a5fa" />
                        <circle cx="125" cy="108" r="3" fill="#60a5fa" />

                        {/* Leaf for environmental health */}
                        <path d="M100 100 C 115 85, 130 95, 115 115 C 110 120, 105 125, 100 130 C 95 125, 90 120, 85 115 C 70 95, 85 85, 100 100 Z"
                              fill="#86efac" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M100 100 L 100 130"
                              fill="none" stroke="#22c55e" strokeWidth="1.5" />

                        {/* Sun rays for UV */}
                        <circle cx="50" cy="50" r="10" fill="#fcd34d" />
                        <line x1="40" y1="40" x2="35" y2="35" stroke="#fcd34d" strokeWidth="2" />
                        <line x1="50" y1="36" x2="50" y2="30" stroke="#fcd34d" strokeWidth="2" />
                        <line x1="60" y1="40" x2="65" y2="35" stroke="#fcd34d" strokeWidth="2" />
                        <line x1="64" y1="50" x2="70" y2="50" stroke="#fcd34d" strokeWidth="2" />
                        <line x1="36" y1="50" x2="30" y2="50" stroke="#fcd34d" strokeWidth="2" />

                        {/* Air quality wave */}
                        <path d="M160 70 C 150 65, 145 75, 135 70 C 125 65, 120 75, 110 70"
                              fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
                        <path d="M160 80 C 150 75, 145 85, 135 80 C 125 75, 120 85, 110 80"
                              fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Air Pollution */}
                <div className="bg-gray-100 rounded-3xl p-4">
                    <div className="w-10 h-10 mb-6 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="20" height="20" className="text-gray-700">
                            <path d="M4 14a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4z" fill="currentColor"/>
                            <path d="M7 10a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2H7z" fill="currentColor"/>
                            <path d="M9 18a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2H9z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-700">Air pollution</p>
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-gray-700">123</span>
                            <span className="text-lg text-gray-500"> PM2.5</span>
                        </div>
                    </div>
                </div>

                {/* Pollen Count */}
                <div className="bg-gray-100 rounded-3xl p-4">
                    <div className="w-10 h-10 mb-6 flex items-center justify-center" >
                        <svg viewBox="0 0 24 24" width="35" height="35" className="text-gray-700">
                            <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
            </div>

            {/* Doctor Contact */}
            <div className="bg-yellow-100 rounded-3xl p-4 flex justify-between items-center">
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
        </div>
    );
}
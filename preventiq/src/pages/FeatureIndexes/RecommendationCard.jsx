import { useState } from 'react';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';

const RecommendationCard = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-indigo-100 rounded-2xl shadow-md p-4 w-full max-w-md mx-auto transition-all duration-300 mb-4 ">
            {/* Header with toggle */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Zap size={18} className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-700">Today's Recommendation</h3>
                </div>
                {open ? (
                    <ChevronUp className="text-gray-600" size={20} />
                ) : (
                    <ChevronDown className="text-gray-600" size={20} />
                )}
            </div>

            {/* Collapsible content */}
            {open && (
                <div className="mt-4 bg-white rounded-lg p-3 border border-indigo-100 text-sm text-gray-600 space-y-2">
                    <p>
                        <span className="font-medium">Pattern detected:</span> Pollen increased by 20% in the last 24 hours.
                    </p>
                    <p>
                        <span className="font-medium">Suggestion:</span> Based on the current pollen levels, it is advisable to limit outdoor activities.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecommendationCard;

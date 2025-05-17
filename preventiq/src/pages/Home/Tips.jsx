import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use any icon lib or SVG

export default function Tips({ title, tips }) {
    const [index, setIndex] = useState(0);
    const [healthAdvice, setHealthAdvice] = useState(tips[index]);

    const prevTip = () => setIndex((i) => (i === 0 ? tips.length - 1 : i - 1));
    const nextTip = () => setIndex((i) => (i === tips.length - 1 ? 0 : i + 1));

    const refreshAdvice = () => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * tips.length);
            setHealthAdvice(tips[randomIndex]);
        }, 500);
    };

    return (
        <div className="space-y-4 flex flex-col items-center justify-center min-h-40">
            <div className="text-center py-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-blue-700">
                        Your Personalized Health Tip
                    </h3>
                    <p className="text-gray-700 mb-4">{healthAdvice}</p>
                    <button
                        onClick={refreshAdvice}
                        className="text-blue-600 text-sm flex items-center justify-center mx-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Get another tip
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    These tips are customized based on your health profile.
                </p>
            </div>
        </div>
    );
}

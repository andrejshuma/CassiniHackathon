import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {Zap, ChevronDown, ChevronUp, BarChart3} from 'lucide-react';

const data = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 40 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 50 },
    { day: 'Fri', value: 55 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 80 },
];

const MiniChartBox = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-indigo-100 rounded-lg p-4 mb-4 w-92 shadow transition-all duration-300">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <BarChart3 className="text-indigo-700" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-700 text-sm">Pollen Trend</h3>
                </div>
                {open ? (
                    <ChevronUp size={18} className="text-gray-600" />
                ) : (
                    <ChevronDown size={18} className="text-gray-600" />
                )}
            </div>

            {open && (
                <div className="bg-white rounded-md p-3 border border-indigo-100 mt-3">
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Observation:</span> Pollen levels rising over the week.
                    </p>
                    <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={data}>
                            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                            <YAxis hide />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default MiniChartBox;

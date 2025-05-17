import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
    LabelList,
} from "recharts";
export default function FeaturePages({ dataName, data }) {
    return (
        <div className="p-4 mx-auto max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-center">{dataName} Index</h2>

            {/* Make the container smaller and centered */}
            <div className="bg-white w-full max-w-xl mx-auto p-4 rounded-lg shadow">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                        barGap={8}
                    >
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: "µg/m³", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#ff0000" name="Concentration">
                            <LabelList dataKey="value" position="top" />
                        </Bar>
                        <Bar
                            dataKey="limit"
                            fill="#00ff00"
                            name="Normal Limit"
                            barSize={8}
                            radius={[2, 2, 2, 2]}
                            opacity={0.5}
                        >
                            <LabelList dataKey="limit" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


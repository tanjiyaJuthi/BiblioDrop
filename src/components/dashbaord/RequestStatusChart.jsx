"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#5d1bb6",
    "#10B981",
    "#ef0161",
    "#EF4444",
    "#8B5CF6",
];

const RequestStatusChart = ({ data }) => {

    const chartData = data.map((item, index) => ({
        name: item._id,
        value: item.value,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                    }
                />

                <Tooltip />

                <Legend />

            </PieChart>
        </ResponsiveContainer>
    );
};

export default RequestStatusChart;
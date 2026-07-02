"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const monthNames = [
    "",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EarningsChart = ({ data = [] }) => {
    const chartData = data.map((item) => ({
        month: monthNames[item._id.month],
        earnings: item.earnings,
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 13 }}
                />

                <YAxis
                    tick={{ fontSize: 13 }}
                />

                <Tooltip
                    formatter={(value) => [`৳${value}`, "Earnings"]}
                />

                <Bar
                    dataKey="earnings"
                    radius={[8, 8, 0, 0]}
                    fill="#ef0161"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EarningsChart;
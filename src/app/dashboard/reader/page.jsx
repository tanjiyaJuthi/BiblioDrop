"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import Loading from "@/app/loading";

import {
    BookOpen,
    Clock3,
    Wallet,
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

import StatCard from "@/components/dashbaord/StatCard";

const COLORS = [
    "#ef0161",
    "#f472b6",
    "#fb7185",
    "#f59e0b",
    "#8b5cf6",
];

const ReaderPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/reader`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();

                if (data.success) {
                    setStats(data.data);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <Loading />;

    const pieData = stats.deliveryStatus.map((item, index) => ({
        name: item._id,
        value: item.value,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className="space-y-8">
            {/* Heading */}
            <div>
                <h1 className="text-3xl font-bold">
                    Reader Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome back! Here's an overview of your reading activity.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    title="Books Read"
                    value={stats.booksRead}
                    icon={<BookOpen size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Pending Deliveries"
                    value={stats.pendingDeliveries}
                    icon={<Clock3 size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Total Spent"
                    value={`৳${stats.totalSpent}`}
                    icon={<Wallet size={24} />}
                    color="bg-[#ef0161]/10"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-xl bg-white p-5">
                    <h2 className="mb-6 text-xl font-semibold">
                        Monthly Reading
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={stats.monthlyRead}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id.month" />
                            <YAxis />
                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#ef0161"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl bg-white p-5">
                    <h2 className="mb-6 text-xl font-semibold">
                        Delivery Status
                    </h2>

                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            />

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;
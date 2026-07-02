"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import Loading from "@/app/loading";

import {
    Users,
    BookOpen,
    Truck,
    Wallet,
} from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
} from "recharts";

import StatCard from "@/components/dashbaord/StatCard";
import { capitalizeWords } from "@/lib/helper/helper";

const COLORS = [
    "#ef0161",
    "#f472b6",
    "#fb7185",
    "#f59e0b",
    "#8b5cf6",
    "#14b8a6",
    "#3b82f6",
];

const AdminPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/admin`,
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

    const pieData = stats.booksByCategory.map((item, index) => ({
        name: capitalizeWords(item.name),
        value: item.value,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Library management overview.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Total Books"
                    value={stats.totalBooks}
                    icon={<BookOpen size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Total Deliveries"
                    value={stats.totalDeliveries}
                    icon={<Truck size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Total Revenue"
                    value={`৳${stats.totalRevenue}`}
                    icon={<Wallet size={24} />}
                    color="bg-[#ef0161]/10"
                />
            </div>

            <div className="rounded-xl bg-white p-6">
                <h2 className="mb-6 text-xl font-semibold">
                    Books by Category
                </h2>

                <ResponsiveContainer width="100%" height={450}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
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
    );
};

export default AdminPage;
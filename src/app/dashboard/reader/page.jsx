"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

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
} from "recharts";

const ReaderPage = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const load = async () => {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/reader`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const json = await res.json();
            setStats(json.data);
        };

        load();

    }, []);

    if (!stats) return null;

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-white shadow p-6">
                    <h3>Total Books Read</h3>
                    <p className="text-4xl font-bold">
                        {stats.booksRead}
                    </p>
                </div>

                <div className="rounded-xl bg-white shadow p-6">
                    <h3>Pending Deliveries</h3>
                    <p className="text-4xl font-bold">
                        {stats.pendingDeliveries}
                    </p>
                </div>

                <div className="rounded-xl bg-white shadow p-6">
                    <h3>Total Spent</h3>
                    <p className="text-4xl font-bold">
                        ৳{stats.totalSpent}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-xl bg-white p-6 shadow">
                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >
                        <BarChart data={stats.monthlyRead}>
                            <CartesianGrid strokeDasharray="3 3"/>

                            <XAxis dataKey="_id.month"/>

                            <YAxis/>

                            <Tooltip/>

                            <Bar dataKey="total"/>
                        </BarChart>

                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <PieChart width={350} height={350}>
                        <Pie
                            data={stats.deliveryStatus}
                            dataKey="value"
                            nameKey="_id"
                            label
                        />

                        <Tooltip/>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;
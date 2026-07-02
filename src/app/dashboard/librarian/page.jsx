"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import Loading from "@/app/loading";

import {
    BookOpen,
    Wallet,
    Clock3,
} from "lucide-react";
import StatCard from "@/components/dashbaord/StatCard";
import EarningsChart from "@/components/dashbaord/EarningsChart";
import RequestStatusChart from "@/components/dashbaord/RequestStatusChart";
import TopRequestedBooks from "@/components/dashbaord/TopRequestedBooks";

const LibrarianPage = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/librarian`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();

                // console.log(data.data);

                if (data.success) {
                    setDashboard(data.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <Loading />;

    // console.log(dashboard);

    return (
        <div className="space-y-8">
            {/* Heading */}
            <div>
                <h1 className="text-3xl font-bold">
                    Librarian Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back! Here's an overview of your library.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    title="Total Books Listed"
                    value={dashboard?.totalBooks}
                    icon={<BookOpen size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Total Earnings"
                    value={`৳${dashboard?.totalEarnings}`}
                    icon={<Wallet size={24} />}
                    color="bg-[#ef0161]/10"
                />

                <StatCard
                    title="Pending Requests"
                    value={dashboard?.pendingRequests}
                    icon={<Clock3 size={24} />}
                    color="bg-[#ef0161]/10"
                />

            </div>

            {/* Charts */}

            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-xl bg-white p-5">
                    <h2 className="mb-6 text-xl font-semibold">
                        Monthly Earnings
                    </h2>

                    <EarningsChart
                        data={dashboard?.monthlyEarnings}
                    />

                </div>

                <div className="rounded-xl bg-white p-5">
                    <h2 className="mb-6 text-xl font-semibold">
                        Request Status
                    </h2>

                    <RequestStatusChart
                        data={dashboard?.requestStatus}
                    />

                </div>
            </div>

            {/* Top Requested Books */}
            <TopRequestedBooks
                books={dashboard?.topRequestedBooks}
            />

        </div>
    );
};

export default LibrarianPage;
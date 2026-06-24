"use client";

import { useEffect, useState } from "react";

import {
    Card,
    Avatar,
    Chip,
    Divider,
} from "@heroui/react";

import { Mail, Shield } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

const ReaderProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: tokenData } =
                    await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/my-profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message ||
                            "Failed to fetch profile"
                    );
                }

                setProfile(data.data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <Avatar
                        src={profile?.image || '/images/fallback.jpg'}
                        className="w-32 h-32 text-large"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold">
                            {profile?.name}
                        </h1>

                        <p className="text-default-500 mt-2">
                            {profile?.email}
                        </p>

                        <div className="mt-4">
                            <Chip
                                color={
                                    profile?.role ===
                                    "admin"
                                        ? "danger"
                                        : "primary"
                                }
                                variant="flat"
                                className="capitalize"
                            >
                                {profile?.role}
                            </Chip>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 my-8" />

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-5 border shadow-none">
                        <h3 className="font-semibold mb-4">
                            Personal Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-default-500">
                                    Full Name
                                </p>

                                <p className="font-medium">
                                    {profile?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-default-500">
                                    Email Address
                                </p>

                                <p className="font-medium flex items-center gap-2">
                                    <Mail size={16} />
                                    {profile?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-default-500">
                                    Role
                                </p>

                                <p className="font-medium capitalize">
                                    {profile?.role}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 border shadow-none">
                        <h3 className="font-semibold mb-4">
                            Account Status
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-default-500">
                                    Authentication
                                </p>

                                <Chip
                                    color="success"
                                    variant="flat"
                                >
                                    Active
                                </Chip>
                            </div>

                            <div>
                                <p className="text-sm text-default-500">
                                    Access Level
                                </p>

                                <p className="capitalize font-medium">
                                    {profile?.role}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default ReaderProfilePage;
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function ChooseRolePage() {
    const router = useRouter();

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRoles = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            // console.log("tokenData:", tokenData);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/role`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            // console.log("roles:", data);

            if (res.ok) {
                setRoles(
                    data.data.filter(
                        (role) => role.title !== "admin"
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleRoleSubmit = async () => {
        if (!selectedRole) return;

        setLoading(true);

        try {
            await fetch("/api/user/role", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: selectedRole,
                }),
            });

            await authClient.signOut();

            router.push("/signin");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-5 lg:px-0 my-10">
            <Card className="w-full max-w-md space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Choose your role
                    </h1>

                    <p className="text-sm text-zinc-500">
                        Select how you want to use LexiCart
                    </p>
                </div>

                <div className="grid gap-4">
                    {roles.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => {
                                setSelectedRole(item.title);
                            }}
                            className={`
                                cursor-pointer
                                rounded-2xl
                                border
                                p-5
                                transition-all
                                hover:shadow-md
                                ${
                                    selectedRole === item.title
                                        ? "border-[#f10262]/10 bg-[#f10262]/5"
                                        : "border-zinc-200 bg-white"
                                }
                            `}
                        >
                            <h3 className="font-semibold text-lg">
                                {item.title}
                            </h3>

                            <p className="text-sm text-slate-700 mt-1">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <Button
                    className="w-full bg-[#f10262] text-white rounded-xl"
                    isLoading={loading}
                    isDisabled={!selectedRole}
                    onClick={handleRoleSubmit}
                >
                    Continue
                </Button>
            </Card>
        </div>
    );
}
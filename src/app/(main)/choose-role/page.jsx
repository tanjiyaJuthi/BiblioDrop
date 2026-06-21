"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function ChooseRolePage() {
    const router = useRouter();

    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const roles = [
        {
            id: "reader",
            title: "Reader",
            description: "Browse and borrow books",
        },
        {
            id: "librarian",
            title: "Librarian",
            description: "Manage books and library resources",
        },
    ];

    const handleRoleSubmit = async () => {
        if (!role) return;

        setLoading(true);

        try {
            await fetch("/api/user/role", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role,
                }),
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-md space-y-6">
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
                    <button
                    key={item.id}
                    onClick={() => setRole(item.id)}
                    className={`
                        text-left p-5 rounded-xl border transition
                        ${
                        role === item.id
                            ? "border-[#f10262] bg-[#f10262]/10"
                            : "border-zinc-200 hover:border-[#f10262]"
                        }
                    `}
                    >
                    <h3 className="font-semibold">
                        {item.title}
                    </h3>

                    <p className="text-sm text-zinc-500">
                        {item.description}
                    </p>
                    </button>
                ))}
            </div>


            <Button
                className="w-full bg-[#f10262] text-white rounded-xl"
                isLoading={loading}
                disabled={!role}
                onClick={handleRoleSubmit}
            >
                Continue
            </Button>

        </div>
    </div>
    );
}
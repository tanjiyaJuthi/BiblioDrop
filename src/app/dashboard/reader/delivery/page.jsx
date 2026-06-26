"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const DeliveryPage = () => {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/reader`;

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${tokenData?.token}`,
                },
            });

            const data = await res.json();
            console.log(data);
            if (data.success) {
                setDeliveries(data.deliveries);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">
                My Deliveries
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                Book
                            </th>

                            <th className="px-4 py-3">
                                Delivery Fee
                            </th>

                            <th className="px-4 py-3">
                                Request Date
                            </th>

                            <th className="px-4 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {deliveries.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b"
                            >
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <Image
                                        width={100}
                                        height={100}
                                        alt={item.bookId.title}
                                        src={item.bookId.coverImage}
                                        className="w-14 h-20 object-cover rounded"
                                    />

                                    <div>
                                        <p className="font-semibold">
                                            {item.bookId.title}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {item.bookId.author}
                                        </p>
                                    </div>
                                </td>

                                <td className="text-center">
                                    ${item.deliveryFee}
                                </td>

                                <td className="text-center">
                                    {new Date(
                                        item.requestDate
                                    ).toLocaleDateString()}
                                </td>

                                <td className="text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm
                                        ${
                                            item.deliveryStatus ===
                                            "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : item.deliveryStatus ===
                                                "Dispatched"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {item.deliveryStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryPage;
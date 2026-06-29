'use client'

import { authClient } from "@/lib/auth-client";
import { Button, Card, Table } from "@heroui/react";
import Image from "next/image";
import { CheckCheck, Truck, Ban } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeliveryPage = () => {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/librarian`;

            const res = await fetch(url,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                },
            );
            
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                setDeliveries(data.deliveries);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const { data: tokenData } = await authClient.token();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/${id}/status`;

            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            // console.log(res.status);
            // console.log(data);

            if (!res.ok) {
                alert(data.message);
                return;
            }

            toast.success('Delivery Status Changed!');

            fetchDeliveries();
        } catch (err) {
            console.error(err);
        }
    };

    const cancelDelivery = async (id) => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            toast.success('Removed from delivery!');
            fetchDeliveries();
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        Pending: "bg-yellow-100 text-yellow-700",
        Dispatched: "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Returned: "bg-gray-100 text-gray-700",
    };

    return (
        <Card className="rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Card.Title className="text-xl">
                Manage Deliveries
                </Card.Title>

                <div className="text-sm text-gray-500">
                Total: {deliveries.length}
                </div>

                <div className="text-sm text-gray-500">
                Pending: {
                    deliveries.filter(
                    (d) => d.deliveryStatus === "Pending"
                    ).length
                }
                </div>

                <div className="text-sm text-gray-500">
                Dispatched: {
                    deliveries.filter(
                    (d) => d.deliveryStatus === "Dispatched"
                    ).length
                }
                </div>

                <div className="text-sm text-gray-500">
                Delivered: {
                    deliveries.filter(
                    (d) => d.deliveryStatus === "Delivered"
                    ).length
                }
                </div>
            </div>

            <Table className="bg-[#ef0161]/10 rounded-xl">
                <Table.ScrollContainer>
                <Table.Content
                    aria-label="Deliveries"
                    className="min-w-[1000px]"
                >
                    <Table.Header>
                    <Table.Column isRowHeader>
                        Client
                    </Table.Column>

                    <Table.Column>
                        Book
                    </Table.Column>

                    <Table.Column>
                        Date
                    </Table.Column>

                    <Table.Column>
                        Status
                    </Table.Column>

                    <Table.Column>
                        Actions
                    </Table.Column>
                    </Table.Header>

                    <Table.Body>
                    {deliveries.length === 0 ? (
                        <Table.Row>
                        <Table.Cell colSpan={5}>
                            No deliveries found
                        </Table.Cell>
                        </Table.Row>
                    ) : (
                        deliveries.map((delivery) => (
                        <Table.Row key={delivery._id}>
                            <Table.Cell>
                            <div className="flex items-center gap-3">
                                <Image
                                src={
                                    delivery.userId.image ||
                                    "/images/fallback.jpg"
                                }
                                alt={delivery.userId.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                                />

                                <div>
                                <p className="font-medium">
                                    {delivery.userId.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {delivery.userId.email}
                                </p>
                                </div>
                            </div>
                            </Table.Cell>

                            <Table.Cell>
                            {delivery.bookId.title}
                            </Table.Cell>

                            <Table.Cell>
                            {new Date(
                                delivery.requestDate
                            ).toLocaleDateString()}
                            </Table.Cell>

                            <Table.Cell>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                statusColors[
                                    delivery.deliveryStatus
                                ]
                                }`}
                            >
                                {delivery.deliveryStatus}
                            </span>
                            </Table.Cell>

                            <Table.Cell>
                                <div className="flex gap-2">

                                    {/* Status Button */}
                                    <Button
                                        size="sm"
                                        className="rounded-lg text-white bg-[#ef0161]"
                                        isDisabled={delivery.deliveryStatus === "Returned"}
                                        onPress={() => {
                                            const nextStatus =
                                                delivery.deliveryStatus === "Pending"
                                                    ? "Dispatched"
                                                    : delivery.deliveryStatus === "Dispatched"
                                                    ? "Delivered"
                                                    : "Returned";

                                            updateStatus(delivery._id, nextStatus);
                                        }}
                                    >
                                        {delivery.deliveryStatus === "Pending" && (
                                            <>
                                                <Truck size={15} />
                                                <span className="ml-1">Dispatch</span>
                                            </>
                                        )}

                                        {delivery.deliveryStatus === "Dispatched" && (
                                            <>
                                                <CheckCheck size={15} />
                                                <span className="ml-1">Deliver</span>
                                            </>
                                        )}

                                        {delivery.deliveryStatus === "Delivered" && (
                                            <>
                                                <CheckCheck size={15} />
                                                <span className="ml-1">Return</span>
                                            </>
                                        )}

                                        {delivery.deliveryStatus === "Returned" && (
                                            "Completed"
                                        )}
                                    </Button>

                                    {/* Cancel Button */}
                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="flat"
                                        isDisabled={delivery.deliveryStatus !== "Pending"}
                                        onPress={() => cancelDelivery(delivery._id)}
                                    >
                                        <Ban size={15} />
                                    </Button>

                                </div>
                            </Table.Cell>
                        </Table.Row>
                        ))
                    )}
                    </Table.Body>
                </Table.Content>
                </Table.ScrollContainer>
            </Table>
            </Card>
    );
};

export default DeliveryPage;
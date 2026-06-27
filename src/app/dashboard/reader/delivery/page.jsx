"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, Table } from "@heroui/react";
import Link from "next/link";
import NoData from "@/components/NoData";

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
            // console.log(data);
            if (data.success) {
                setDeliveries(data.deliveries);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        Pending: "bg-yellow-100 text-yellow-700",
        Dispatched: "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Returned: "bg-red-100 text-red-700",
        };
    
    return (
  <Card className="rounded-xl p-6">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <Card.Title className="text-xl">
        My Deliveries
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

      <div className="text-sm text-gray-500">
        Returned: {
          deliveries.filter(
            (d) => d.deliveryStatus === "Returned"
          ).length
        }
      </div>
    </div>

    <Table className="bg-[#ef0161]/10 rounded-xl">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="My Deliveries"
          className="min-w-225"
        >
          <Table.Header>
            <Table.Column isRowHeader>
              Book
            </Table.Column>

            <Table.Column>
              Delivery Fee
            </Table.Column>

            <Table.Column>
              Request Date
            </Table.Column>

            <Table.Column>
              Status
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {deliveries.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <NoData />
                </Table.Cell>
              </Table.Row>
            ) : (
              deliveries.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.bookId.coverImage || "/images/fallback.jpg"}
                        alt={item.bookId.title}
                        width={55}
                        height={75}
                        className="rounded object-cover"
                      />

                      <div>
                        <Link href={`/books/${item.bookId._id}`} className="font-semibold">
                          {item.bookId.title}
                        </Link>

                        <p className="text-xs text-gray-500">
                          {item.bookId.author}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    ${Number(item.deliveryFee).toFixed(2)}
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      item.requestDate
                    ).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[item.deliveryStatus]
                      }`}
                    >
                      {item.deliveryStatus}
                    </span>
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
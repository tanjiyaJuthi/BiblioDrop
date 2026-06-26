"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ReadingListPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchReadingList();
    }, []);

    const fetchReadingList = async () => {
        try {
            const { data: tokenData } = await authClient.token();
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/readingList/my-list`;

            const res = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();
            console.log(data);

            if (data.success) {
                setBooks(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeBook = async (id) => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/readingList/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            if (res.ok) {
                setBooks((prev) =>
                    prev.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className="p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <Card.Title>My Reading List</Card.Title>

                <span className="text-gray-500">
                    {books.length} Books
                </span>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No books in your reading list.
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {books.map((item) => (
                        <Card
                            key={item._id}
                            className="overflow-hidden rounded-xl"
                        >
                            <Image
                                src={item.bookId.coverImage}
                                alt={item.bookId.title}
                                width={300}
                                height={420}
                                className="w-full h-72 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold">
                                    {item.bookId.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.bookId.author}
                                </p>

                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-xl">
                                        Read
                                    </span>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="flat"
                                        onPress={() =>
                                            removeBook(item._id)
                                        }
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default ReadingListPage;
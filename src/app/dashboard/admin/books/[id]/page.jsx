'use client';

import Loading from "@/app/loading";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookDetailsPage = () => {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);

                const { data: tokenData } = await authClient.token();
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/dashboard/${id}`;

                const res = await fetch(url,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`,
                        },
                    },
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch book"
                    );
                }

                setBook(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-10">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                {error}
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-10">
                Book not found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Image
                        width={100}
                        height={100}
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full rounded-lg"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold">
                        {book.title}
                    </h1>

                    <p className="mt-2 text-gray-600">
                        By {book.author}
                    </p>

                    <p className="mt-4">
                        Category: {book.category?.name}
                    </p>

                    <p className="mt-4">
                        Delivery Fee: ৳{book.deliveryFee}
                    </p>

                    <p className="mt-6 text-gray-700">
                        {book.description}
                    </p>

                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold">
                            Librarian
                        </h3>

                        <div className="flex items-center gap-3 mt-3">
                            <Image
                                width={100}
                                height={100}
                                src={book.librarianId?.image}
                                alt={book.librarianId?.name}
                                className="w-12 h-12 rounded-full"
                            />

                            <div>
                                <p>
                                    {book.librarianId?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {book.librarianId?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
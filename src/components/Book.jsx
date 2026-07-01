"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getToken = async () => {
    const { data } = await authClient.token();
    return data?.token;
};

const Book = ({ book }) => {
    const router = useRouter();

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkWishlist = async () => {
        const token = await getToken();

        if (!token) {
            setIsWishlisted(false);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/check/${book._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            if (data.success) {
                setIsWishlisted(data.isWishlisted);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let mounted = true;

        const fetchWishlist = async () => {
            const token = await getToken();

            if (!token) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/check/${book._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (mounted && data.success) {
                    setIsWishlisted(data.isWishlisted);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchWishlist();

        return () => {
            mounted = false;
        };
    }, [book._id]);

    const toggleWishlist = async () => {
        if (loading) return;

        setLoading(true);

        const token = await getToken();
        
        if (!token) {
             setLoading(false);
            router.push("/signin");
            return;
        }

        const endpoint = isWishlisted
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${book._id}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`;

        const options = {
            method: isWishlisted ? "DELETE" : "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                ...(isWishlisted
                    ? {}
                    : { "Content-Type": "application/json" }),
            },
            ...(isWishlisted
                ? {}
                : { body: JSON.stringify({ bookId: book._id }) }),
        };

        try {
            const res = await fetch(endpoint, options);
            const data = await res.json();

            // console.log(res.status);
            // console.log(data);

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            setIsWishlisted(prev => !prev);

            toast.success(
                isWishlisted
                    ? "Removed from wishlist"
                    : "Added to wishlist"
            );
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group h-full">
            <div className="overflow-hidden rounded-xl border border-[#ef0161]/5 shadow-sm transition-all duration-300 flex flex-col">
                {/* Fixed Image Area */}
                <div className="relative h-62 shrink-0 bg-[#fff8fb] overflow-hidden w-full">
                    <Image
                        src={book.coverImage || "/images/fallback.jpg"}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <Button
                        disabled={loading}
                        onClick={toggleWishlist}
                        className="absolute top-4 right-4 bg-white rounded-xl shadow-md"
                    >
                        <Heart
                            size={20}
                            className={
                                isWishlisted
                                    ? "fill-[#ef0161] text-[#ef0161]"
                                    : "text-gray-600"
                            }
                        />
                    </Button>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-5">
                <p className="text-sm text-gray-500 line-clamp-1">
                    By {book.author}
                </p>

                <Link href={`/books/${book._id}`} className="mt-5 min-h-14 text-lg font-semibold text-gray-900 capitalize transition-colors group-hover:text-[#ef0161]">
                    {book.title}
                </Link>

                {/* Push Footer to Bottom */}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div>
                    <p className="text-xs text-gray-500">
                        Delivery Fee
                    </p>

                    <p className="font-bold text-[#ef0161]">
                        ৳{book.deliveryFee}
                    </p>
                    </div>

                    <Button
                        disabled={book.status !== "Available"}
                        className={`relative overflow-hidden h-9.5 px-5 text-sm font-semibold text-white rounded-xl flex items-center ${
                            book.status === "Available"
                                ? "bg-[#ef0161]"
                                : "bg-[#ef0161]/50"
                        }`}
                    >
                        <span className="relative z-10">
                            {book.status === "Available"
                                ? "Available"
                                : "Checked Out"}
                        </span>
                    </Button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
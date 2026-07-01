"use client";

import { useEffect, useState } from "react";
import Book from "@/components/Book";
import Loading from "@/app/loading";
import { authClient } from "@/lib/auth-client";

const WishListPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        const { data: tokenData } = await authClient.token();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/my`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                setWishlist(data.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) return <p><Loading /></p>;

    return (
        <div className="grid gap-6 lg:grid-cols-4">
            {wishlist.map((item) => (
                <Book
                    key={item._id}
                    book={item.bookId}
                />
            ))}
        </div>
    );
};

export default WishListPage;
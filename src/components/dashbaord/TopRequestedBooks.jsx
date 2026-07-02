"use client";

import Image from "next/image";

const TopRequestedBooks = ({ books }) => {

    if (!books?.length) {
        return (
            <div className="rounded-xl bg-white p-5">
                <h2 className="text-xl font-semibold mb-5">
                    Most Requested Books
                </h2>

                <p className="text-gray-500">
                    No requests yet.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white">
            <div className="border-b border-[#ef0161]/10 px-6 py-5">
                <h2 className="text-xl font-semibold">
                    Most Requested Books
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Books that readers requested the most.
                </p>
            </div>

            <div>

                {books.map((book, index) => (
                    <div
                        key={book._id}
                        className="flex items-center justify-between px-6 py-5 hover:bg-[#ef0161]/5 transition border-b last:border-none"
                    >
                        <div className="flex items-center gap-4">
                            <div className="font-bold text-gray-500 w-6">
                                #{index + 1}
                            </div>

                            <Image
                                src={book.coverImage}
                                alt={book.title}
                                width={60}
                                height={80}
                                className="rounded-xl object-cover"
                            />

                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Requested by readers
                                </p>
                            </div>
                        </div>

                        <div>
                            <span className="rounded-xl bg-[#ef0161]/5 px-4 py-2 text-sm font-semibold text-[#ef0161]">
                                {book.requests} Requests
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRequestedBooks;
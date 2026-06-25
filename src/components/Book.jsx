import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Book = ({ book }) => {
  return (
    <div className="group h-full">
        <div className="overflow-hidden rounded-xl border border-[#ef0161]/5 shadow-sm transition-all duration-300 hover:-translate-y-2 flex flex-col">
            {/* Fixed Image Area */}
            <div className="relative h-62 shrink-0 bg-[#fff8fb] overflow-hidden">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                {book.category?.name && (
                    <span className="absolute right-4 top-4 rounded-lg bg-[#ef0161] px-3 py-1 text-xs font-semibold text-white">
                    {book.category.name}
                    </span>
                )}
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
                    className="relative overflow-hidden h-9.5 px-6 text-sm font-semibold text-white rounded-xl flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 bg-[#ef0161]"
                    >
                    <span className="relative z-10">
                        {book.status === "Available" ? "Available" : "Checked Out"}
                    </span>
                </Button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Book;
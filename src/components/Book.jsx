// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// const Book = ({book}) => {
//     return (
//         <div
//             key={book._id}
//             className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
//         >
//             <div className="relative overflow-hidden">
//                 <Image
//                     width={200}
//                     height={200}
//                     src={book.coverImage}
//                     alt={book.title}
//                     className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
//                 />

//                 <span className="absolute left-4 top-4 rounded bg-[#ef0161] px-3 py-1 text-xs font-semibold text-white">
//                     {book.category?.name}
//                 </span>
//             </div>

//             <div className="p-6">
//             <p className="text-sm text-gray-500">{book.author}</p>

//             <h3 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
//                 {book.title}
//             </h3>

//             <p className="mt-3 line-clamp-3 text-sm text-gray-600">
//                 {book.description}
//             </p>

//             <div className="mt-6 flex items-center justify-between">
//                 <div>
//                 <p className="text-xs text-gray-500">Delivery Fee</p>

//                 <p className="font-bold text-[#ef0161]">
//                     ৳{book.deliveryFee}
//                 </p>
//                 </div>

//                 <Link
//                     href={`/books/${book._id}`}
//                     className="
//                         group
//                         relative
//                         overflow-hidden
//                         inline-flex
//                         items-center
//                         justify-center
//                         rounded-xl
//                         px-5
//                         h-9.5
//                         text-sm
//                         font-semibold
//                         text-white
//                     "
//                     >
//                     <span className="relative z-10">
//                         View Details
//                     </span>

//                     {/* Default Background */}
//                     <span className="absolute inset-0 bg-[#ef0161]" />

//                     {/* Hover Background */}
//                     <span
//                         className="
//                         absolute
//                         inset-0
//                         bg-[#5d1bb6]
//                         translate-x-full
//                         transition-transform
//                         duration-500
//                         ease-in-out
//                         group-hover:translate-x-0
//                         "
//                     />
//                 </Link>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default Book;

import Image from "next/image";

const Book = ({ book }) => {
  return (
    <div className="group h-full">
        <div className="overflow-hidden rounded-xl border border-[#ef0161]/5 shadow-sm transition-all duration-300 hover:-translate-y-2 flex flex-col">
            {/* Fixed Image Area */}
            <div className="relative h-[250px] shrink-0 bg-[#fff8fb] overflow-hidden">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {book.category?.name && (
                    <span className="absolute top-4 left-4 rounded-full bg-[#ef0161] px-3 py-1 text-xs font-semibold text-white">
                    {book.category.name}
                    </span>
                )}
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5">
            <p className="text-sm text-gray-500 line-clamp-1">
                By {book.author}
            </p>

            <h3 className="mt-5 min-h-[56px] text-lg font-semibold text-gray-900 capitalize transition-colors group-hover:text-[#ef0161]">
                {book.title}
            </h3>

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

                <button className="rounded-xl bg-[#ef0161] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d80058]">
                View Book
                </button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Book;
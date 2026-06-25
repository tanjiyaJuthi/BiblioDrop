// "use client";

// import Loading from "@/app/loading";
// import { ArrowRight, Image } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Book from "../Book";

// const Featured = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/featured`,
//         );

//         const data = await res.json();
//         console.log(data);

//         if (data.success) {
//           setBooks(data.data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-7xl mx-auto px-5 lg:px-0">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//             {/* Left */}
//             <h2 className="text-3xl md:text-5xl font-bold">Featured Books</h2>
//             <Link
//                 href="/books"
//                 className="
//                     group
//                     relative
//                     overflow-hidden
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     h-10
//                     px-5
//                     rounded-xl
//                     border
//                     border-[#ef0161]
//                     font-semibold
//                     text-[#ef0161]
//                     transition-colors
//                     duration-300
//                     hover:text-white
//                     hover:border-[#5d1bb6]
//                 "
//             >
//                 <span className="relative z-10 inline-flex items-center gap-2">
//                     Explore More

//                     <ArrowRight
//                     size={22}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                     />
//                 </span>

//                 <span
//                     className="
//                     absolute
//                     inset-0
//                     bg-[#5d1bb6]
//                     translate-x-full
//                     transition-transform
//                     duration-500
//                     ease-in-out
//                     group-hover:translate-x-0
//                     "
//                 />
//             </Link>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <Loading />
//         ) : (
//           <>
//             {/* Books Grid */}
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
//               {books.map((book) => (
//                 <Book book={book} key={book._id} />
//               ))}
//             </div>            
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Featured;

'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Book from '../Book';

// Import Swiper styling dependencies directly
import 'swiper/css';
import Link from 'next/link';
import NoData from '../NoData';

const Featured = () => {
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/featured`,
        );

        const data = await res.json();
        console.log(data);

        if (data.success) {
          setBooks(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="w-full pt-5 pb-20 px-5 lg:px-0 max-w-7xl mx-auto font-sans antialiased">
      
      {/* Header Panel Layout */}
      <div className="flex items-center justify-between mb-10">
            {/* Left */}
            <h2 className="text-3xl md:text-5xl font-bold">Featured Books</h2>
             <Link
                href="/books"
                className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    h-10
                    px-5
                    rounded-xl
                    border
                    border-[#ef0161]
                    font-semibold
                    text-[#ef0161]
                    transition-colors
                    duration-300
                    hover:text-white
                    hover:border-[#5d1bb6]
                "
            >
                <span className="relative z-10 inline-flex items-center gap-2">
                    Explore More

                    <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </span>

                <span
                    className="
                    absolute
                    inset-0
                    bg-[#5d1bb6]
                    translate-x-full
                    transition-transform
                    duration-500
                    ease-in-out
                    group-hover:translate-x-0
                    "
                />
            </Link>
        </div>

      {/* Automated Carousel Element Wrapper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        loop
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
        }}
        breakpoints={{
            0: {slidesPerView: 1,},
            640: {slidesPerView: 2,},
            1024: {slidesPerView: 3,},
            1280: {slidesPerView: 4,},
        }}
        >
          <div className="max-w-7xl mx-auto">
            {categories.length === 0 && <NoData />}
          </div>
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <Book book={book} />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default Featured;
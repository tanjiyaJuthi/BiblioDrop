// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import Book from '@/components/Book';

// const CategoryDetailsPage = () => {
//   const { id } = useParams();

//   const [category, setCategory] = useState(null);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const [categoryRes, booksRes] = await Promise.all([
//           fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${id}`
//           ),
//           fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/book?category=${id}`
//           ),
//         ]);

//         const categoryData = await categoryRes.json();
//         const booksData = await booksRes.json();

//         if (categoryData.success) {
//           setCategory(categoryData.data);
//         }

//         if (booksData.success) {
//           setBooks(booksData.data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCategoryData();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="h-[300px] rounded-3xl bg-gray-100 animate-pulse" />
//       </div>
//     );
//   }

//   if (!category) {
//     return (
//       <div className="text-center py-20">
//         Category not found.
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
      
//       {/* Banner */}
//       <div className="relative overflow-hidden rounded-[36px] h-[350px]">
//         <Image
//           src={category.image}
//           alt={category.name}
//           fill
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

//         <div className="absolute bottom-10 left-10 max-w-2xl">
//           <span className="inline-block rounded-full bg-[#ef0161] px-4 py-2 text-sm font-semibold text-white">
//             Category
//           </span>

//           <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white capitalize">
//             {category.name}
//           </h1>

//           {category.description && (
//             <p className="mt-4 text-gray-200 text-lg">
//               {category.description}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="mt-8 flex items-center gap-4">
//         <div className="rounded-2xl bg-[#ef0161]/10 px-5 py-3">
//           <span className="font-semibold text-[#ef0161]">
//             {books.length} Books Available
//           </span>
//         </div>
//       </div>

//       {/* Books */}
//       <div className="mt-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//           Books in this Category
//         </h2>

//         {books.length === 0 ? (
//           <div className="rounded-3xl border border-dashed border-gray-300 p-16 text-center">
//             <p className="text-gray-500">
//               No books found in this category.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {books.map((book) => (
//               <Book
//                 key={book._id}
//                 book={book}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CategoryDetailsPage;



'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Book from '@/components/Book';
import NoData from '@/components/NoData';

const CategoryDetailsPage = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const [categoryRes, booksRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${id}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/book?category=${id}`
          ),
        ]);

        const categoryData = await categoryRes.json();
        const booksData = await booksRes.json();

        if (categoryData.success) {
          setCategory(categoryData.data);
        }

        if (booksData.success) {
          setBooks(booksData.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen">
        <div className="h-[500px] animate-pulse rounded-xl bg-gray-100" />

        <div className="mx-auto max-w-7xl px-4">
          <div className="-mt-20 h-52 animate-pulse rounded-xl bg-gray-100" />

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[520px] animate-pulse rounded-xl bg-gray-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!category) {
    <NoData />
  }

  return (
    <section className="relative pb-20">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-125 w-125 rounded-full bg-[#ef0161]/10 blur-[120px]" />

      {/* Hero */}
      <div className="relative overflow-hidden min-h-[50vh] bg-cover bg-center">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#ef0161]/40" />
      </div>

      {/* Floating Card */}
      <div className="relative z-20 mx-auto -mt-35 max-w-7xl px-5 lg:px-0">
        <div className="overflow-hidden rounded-xl bg-white border border-[#ef0161]/10">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-xl bg-[#ef0161]/10 px-4 py-2 text-sm font-semibold text-[#ef0161]">
                Category
              </span>

              <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {books.length} Books Available
              </span>
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-bold capitalize ">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-5 text-sm lg:text-lg leading-relaxed text-slate-600">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="mx-auto mt-20 max-w-7xl px-4">
        <div className="mb-12 flex items-center gap-6">
          <div>
            <h2 className="font-bold text-slate-900 text-2xl md:text-3xl">
              Explore Books
            </h2>
          </div>

          <div className="mt-3 h-px flex-1 bg-[#ef0161]/20 block" />
        </div>

        {books.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
            {books.map((book) => (
              <Book
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryDetailsPage;
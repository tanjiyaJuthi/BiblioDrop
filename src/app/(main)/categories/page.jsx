'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/with-counts`
        );

        const data = await res.json();

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group"
          >
            <div className="relative h-[380px] overflow-hidden rounded-xl">
              
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Book Count */}
              <div className="absolute right-5 top-5 rounded bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-white/20">
                {category.bookCount} Books
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-xl font-bold text-white capitalize">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <div className="mt-4 inline-flex items-center gap-2 text-white font-medium">
                  Explore Collection
                  <span className="transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
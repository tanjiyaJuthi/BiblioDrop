"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NoData from "../NoData";
import Loading from "@/app/loading";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/with-counts`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        if (data.success) {
          setCategories(data.data.slice(0, 5));
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-[#fff8fb]">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl border border-[#ef0161]/20 p-8 md:p-12">
          {/* Heading */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[#fff8fb] px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 whitespace-nowrap">
              Top Categories
            </h2>
          </div>

          {loading ? (
            <Loading />
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pt-12">
              {categories.map((category, index) => (
                <div
                  key={category._id}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-xl bg-white shadow-sm">
                    <div className="absolute inset-2 rounded-xl border-2 border-dashed border-[#ef0161]/40 transition-transform duration-700 group-hover:rotate-45" />

                    <div className="relative z-10 h-24 w-24 overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={category.image || "/images/fallback.jpg"}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-[#ef0161] text-xs font-bold text-white">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <Link
                    href={`/categories/${category._id}`}
                    className="mt-5 text-center text-lg font-semibold text-gray-900 capitalize transition-colors group-hover:text-[#ef0161]"
                  >
                    {category.name} ({category.bookCount})
                  </Link>

                  {category.description && (
                    <p className="mt-1 text-center text-sm text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-12">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
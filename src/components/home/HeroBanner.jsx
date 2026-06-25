import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#fff0f6] via-white to-[#ffe4ef]">
      {/* Background Blur Effects */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ef0161]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#ef0161]/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 lg:px-0 py-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-xl bg-[#ef0161]/10 px-4 py-2 text-sm font-medium text-[#ef0161]">
              📚 Books Delivered To Your Doorstep
            </span>

            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Your Local Library,
              <span className="block text-[#ef0161]">
                Delivered
              </span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Discover thousands of books from nearby libraries and get
              them delivered straight to your home. Read more, wait less.
            </p>

            <div className="flex flex-wrap gap-4">
                <Link
                    href="/books"
                    className="relative overflow-hidden h-9.5 px-6 text-sm font-semibold text-white rounded-xl bg-[#ef0161] group flex items-center"
                  >
                    <span className="relative z-10">
                      Browse Books
                    </span>

                    <span
                      className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none"
                    />
                </Link>

               <Link
                    href="#"
                    className="relative overflow-hidden h-9.5 px-6 text-sm font-semibold rounded-xl bg-white text-gray-500 border border-gray-300 group flex items-center hover:text-white"
                  >
                    <span className="relative z-10">
                      Learn More
                    </span>

                    <span
                      className="absolute inset-0 rounded-xl bg-[#5d1bb6] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none "
                    />
                </Link>
            </div>

            <div className="flex items-center gap-8 pt-4 text-sm text-gray-500">
              <div>
                <p className="text-2xl font-bold text-gray-900">10k+</p>
                <p>Books Available</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p>Partner Libraries</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">24h</p>
                <p>Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-6 shadow-2xl">
              <Image
                width={500}
                height={500}
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
                alt="Library Books"
                className="w-full rounded-2xl object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl border border-[#ef0161]/10">
              <p className="font-semibold text-gray-900">
                📖 2,500+ New Arrivals
              </p>
              <p className="text-sm text-gray-500">
                Updated weekly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
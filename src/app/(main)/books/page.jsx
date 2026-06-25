'use client';

import { useEffect, useState } from 'react';
import Book from '@/components/Book';
import { Search } from 'lucide-react';
import Loading from '@/app/loading';
import NoData from '@/components/NoData';
import { div } from 'framer-motion/client';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchBooks();
  }, [debouncedSearch, category, sort]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
      );

      const data = await res.json();

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (debouncedSearch) {
        params.append(
          'search',
          debouncedSearch
        );
      }

      if (category) {
        params.append('category', category);
      }

      if (sort) {
        params.append('sort', sort);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/book?${params}`
      );

      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-20">
      <div
        className="relative overflow-hidden min-h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542911077-46bd18a594f6')",
        }}
      >
        <div className="absolute inset-0 bg-[#ef0161]/40" />
      </div>

      {/* Floating Card */}
      <div className="relative z-20 mx-auto -mt-40 px-5 lg:px-0">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-xl border border-[#ef0161]/5 bg-white">
          <div className="p-8 md:p-12">
            {/* Heading */}
            <h1 className="mt-5 text-3xl font-bold md:text-5xl">
              Discover Books You'll Love
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Browse books across categories,
              discover new authors, and find
              your next favorite read.
            </p>

            {/* Filters */}
            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_220px_220px]">
              {/* Search */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search books or authors..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    pl-14
                    pr-4
                    outline-none
                    transition-all
                    focus:border-[#ef0161]
                    focus:ring-4
                    focus:ring-[#ef0161]/10
                  "
                />
              </div>

              {/* Category */}
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  h-10
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  outline-none
                  transition-all
                  focus:border-[#ef0161]
                  focus:ring-4
                  focus:ring-[#ef0161]/10
                "
              >
                <option value="">
                  All Categories
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="
                  h-10
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  outline-none
                  transition-all
                  focus:border-[#ef0161]
                  focus:ring-4
                  focus:ring-[#ef0161]/10
                "
              >
                <option value="newest">
                  Newest Books
                </option>

                <option value="oldest">
                  Oldest Books
                </option>

                <option value="fee-low">
                  Lowest Delivery Fee
                </option>

                <option value="fee-high">
                  Highest Delivery Fee
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Books */}
      {loading ? (
        <Loading />
      ) : books.length === 0 ? (
        <div className='max-w-7xl mx-auto mt-10'>
          <NoData />
        </div>
      ) : (
        <div className="mt-10 max-w-7xl mx-auto px-5 lg:px-0 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Book
              key={book._id}
              book={book}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BooksPage;
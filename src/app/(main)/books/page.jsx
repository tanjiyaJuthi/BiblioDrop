"use client";

import Loading from "@/app/loading";
import Book from "@/components/Book";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Label, ListBox, Select } from "@heroui/react";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [status, setStatus] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const limit = 12;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, status, minFee, maxFee, sort]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchBooks();
  }, [debouncedSearch, category, status, minFee, maxFee, sort, page]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
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
        params.append("search", debouncedSearch);
      }

      if (category) {
        params.append("category", category);
      }

      if (sort) {
        params.append("sort", sort);
      }

      if (status) {
        params.append("status", status);
      }

      if (minFee) {
        params.append("minFee", minFee);
      }

      if (maxFee) {
        params.append("maxFee", maxFee);
      }

      params.append("page", page);
      params.append("limit", limit);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/book?${params}`,
      );

      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
        setPagination(data.pagination);
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
              Browse books across categories, discover new authors, and find
              your next favorite read.
            </p>

            {/* Filters */}
            <div className="mt-10">
              {/* Search */}
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search books or authors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-14 pr-4 outline-none transition-all focus:border-[#ef0161] focus:ring-1 focus:ring-[#ef0161]/10"
                />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-4">
                {/* Category */}
                <Select
                  selectedKeys={category ? [category] : new Set()}
                  onChange={(value) => {
                    setCategory(String(value));
                  }}
                >
                  <Select.Trigger>
                    <Select.Value>
                      {category
                        ? categories.find((c) => c._id === category)?.name
                        : "All Categories"}
                    </Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-xl">
                    <ListBox>
                      {categories.map((cat) => (
                        <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white"
                          key={cat._id}
                          id={cat._id}
                          textValue={cat.name}
                        >
                          {cat.name}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Sort */}
                <Select
                  selectedKeys={[sort]}
                  onChange={(value) => setSort(String(value))}
                >
                  <Select.Trigger className="h-10 rounded-xl border border-gray-200 bg-white px-5 outline-none transition-all focus:border-[#ef0161] focus:ring-1 focus:ring-[#ef0161]/10">
                    <Select.Value>Sort By</Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-xl">
                    <ListBox>
                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="newest" textValue="Newest Books">
                        Newest Books
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="oldest" textValue="Oldest Books">
                        Oldest Books
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="fee-low" textValue="Lowest Delivery Fee">
                        Lowest Delivery Fee
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="fee-high" textValue="Highest Delivery Fee">
                        Highest Delivery Fee
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* avaiability */}
                <Select
                  selectedKeys={status ? [status] : []}
                  onChange={(value) => setStatus(String(value))}
                >
                  <Select.Trigger className="h-10 rounded-xl border border-gray-200 bg-white px-5 outline-none transition-all focus:border-[#ef0161] focus:ring-1 focus:ring-[#ef0161]/10">
                    <Select.Value>All Status</Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-xl">
                    <ListBox>
                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="Available" textValue="Available">
                        Available
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="Checked Out" textValue="Checked Out">
                        Checked Out
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* fee */}
                <Select
                  onChange={(value) => {
                    switch (String(value)) {
                      case "0-5":
                        setMinFee(0);
                        setMaxFee(5);
                        break;

                      case "5-10":
                        setMinFee(5);
                        setMaxFee(10);
                        break;

                      case "10-15":
                        setMinFee(10);
                        setMaxFee(15);
                        break;

                      default:
                        setMinFee("");
                        setMaxFee("");
                    }
                  }}
                >
                  <Select.Trigger className="h-10 rounded-xl border border-gray-200 bg-white px-5 outline-none transition-all focus:border-[#ef0161] focus:ring-1 focus:ring-[#ef0161]/10">
                    <Select.Value>All Fees</Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-xl">
                    <ListBox>
                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="0-5" textValue="$0 - $5">
                        $0 - $5
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="5-10" textValue="$5 - $10">
                        $5 - $10
                      </ListBox.Item>

                      <ListBox.Item className="hover:rounded-xl hover:bg-[#ef0161] hover:text-white" id="10-15" textValue="$10 - $15">
                        $10 - $15
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books */}
      {loading ? (
        <Loading />
      ) : books.length === 0 ? (
        <div className="max-w-7xl mx-auto mt-10">
          <NoData />
        </div>
      ) : (
        <div className="mt-10 max-w-7xl mx-auto px-5 lg:px-0 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} page={page} setPage={setPage} />
      )}
    </section>
  );
};

export default BooksPage;

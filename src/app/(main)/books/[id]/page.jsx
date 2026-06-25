'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  User,
  Truck,
  Star,
  Edit,
  Trash2,
  EyeOff,
} from 'lucide-react';

import Loading from '@/app/loading';
import NoData from '@/components/NoData';
import { useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const BookDetailPage = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setBook(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!book) return <div className="max-w-7xl mx-auto my-20"><NoData /></div>;

  const isOwner =
    user?._id === book?.librarianId?._id;

  const isUnavailable =
    book?.status === 'Checked Out';

  return (
    <section className="pb-20">
      {/* Hero */}
      <div className="h-72 bg-[#ef0161]" />

      <div className="max-w-7xl mx-auto px-5 lg:px-0">
        {/* Main Card */}
        <div className="-mt-32 overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
            {/* Cover */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                {book.category?.name && (
                  <span className="rounded-xl bg-[#ef0161]/10 px-4 py-2 text-sm font-medium text-[#ef0161]">
                    {book.category.name}
                  </span>
                )}

                <span
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    book.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {book.status}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-slate-900">
                {book.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-slate-600">
                <User size={18} />
                <span>{book.author}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-slate-600">
                <Calendar size={18} />

                <span>
                  Added{' '}
                  {new Date(
                    book.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              {/* Librarian */}
              {book.librarianId && (
                <div className="mt-4 flex items-center gap-2 text-slate-600">
                  <User size={18} />

                  <span>
                    Librarian:{' '}
                    {book.librarianId.name}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mt-8">
                <h3 className="mb-3 text-xl font-semibold">
                  Description
                </h3>

                <p className="leading-8 text-slate-600">
                  {book.description}
                </p>
              </div>

              {/* Delivery Fee */}
              <div className="mt-8 rounded-xl border border-[#ef0161]/10 bg-[#fff8fb] p-6">
                <div className="flex items-center gap-3">
                  <Truck
                    size={22}
                    className="text-[#ef0161]"
                  />

                  <div>
                    <p className="text-sm text-slate-500">
                      Delivery Fee
                    </p>

                    <h3 className="text-3xl font-bold text-[#ef0161]">
                      ৳{book.deliveryFee}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Request Delivery */}
              {!isOwner && (
                <button
                  disabled={isUnavailable}
                  className={`mt-8 h-12 rounded-xl px-8 font-semibold text-white transition ${
                    isUnavailable
                      ? 'cursor-not-allowed bg-gray-300'
                      : 'bg-[#ef0161] hover:bg-[#d10056]'
                  }`}
                >
                  Request Delivery
                </button>
              )}

              {/* Librarian Controls */}
              {isOwner && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/books/edit/${book._id}`}
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-3 font-medium text-blue-600"
                  >
                    <Edit size={18} />
                    Edit
                  </Link>

                  <button className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-medium text-red-600">
                    <Trash2 size={18} />
                    Delete
                  </button>

                  <button className="flex items-center gap-2 rounded-xl bg-yellow-50 px-5 py-3 font-medium text-yellow-700">
                    <EyeOff size={18} />
                    Unpublish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold">
            Reader Reviews
          </h2>

          <div className="space-y-5">
            {book.reviews?.length > 0 ? (
              book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">
                      {review.user?.name}
                    </h4>

                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(review.rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-slate-600">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="max-w-7xl mx-auto">
                <NoData />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;
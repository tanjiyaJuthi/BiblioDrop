'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Edit,
  Trash2,
  EyeOff,
} from 'lucide-react';

import Loading from '@/app/loading';
import NoData from '@/components/NoData';
import { useParams } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import Rating from '@/components/Rating';
import { useRouter } from 'next/navigation';

const BookDetailPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [myComment, setMyComment] = useState(null);
  const [myRating, setMyRating] = useState(null);
  const hasReviewed = !!myComment && !!myRating;

  const { id } = useParams();

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/${id}`);
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

  const fetchReviews = async () => {
    try {
      const [commentsRes, ratingsRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/book/${id}`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/book/${id}`
        ),
      ]);

      const commentsData = await commentsRes.json();
      const ratingsData = await ratingsRes.json();

      if (commentsData.success) {
        setComments(commentsData.data);
      }

      if (ratingsData.success) {
        setRatings(ratingsData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchMyReview = async () => {
    const { data: tokenData } = await authClient.token();

    const [commentRes, ratingRes] = await Promise.all([
        fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/book/${id}/me`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.token}`,
                },
            }
        ),
        fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/book/${id}/me`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.token}`,
                },
            }
        ),
    ]);

    const comment = await commentRes.json();
    const rating = await ratingRes.json();

    setMyComment(comment.data);
    setMyRating(rating.data);
  };

  useEffect(() => {
    if (user?.role === "reader") {
        fetchMyReview();
    }
  }, [id, user]);

  const [canReview, setCanReview] = useState(false);
  
  const checkPermission = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review/permission/${book._id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
      });

      const data = await res.json();
      setCanReview(data.canReview);
    } catch (err) {
        console.error(err);
    }
  };

  useEffect(() => {
    if (!user || !book?._id) return;
    checkPermission();
  }, [user, book]);


  if (loading) return <Loading />;
  if (!book) return <div className="max-w-7xl mx-auto my-20"><NoData /></div>;
  
  const isOwner =
    !!user &&
    !!user._id &&
    !!book?.librarianId?._id &&
    user._id === book.librarianId._id;
    
  const isUnavailable = !book?.isAvailable;

  const handleTransaction = async () => {
    if (isUnavailable) return;

    if (!user) {
      router.push(`/signin?redirect=/books/${book._id}`);
      return;
    }

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },

          body: JSON.stringify({
            bookId: book._id,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full min-h-screen font-sans antialiased">
      
      {/* --- Top Layout: Split Banner and Details --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[50vh]">
        
        {/* Left Side: Deep Blue Styled Cover Slider Panel */}
        <div className="bg-[#ef0161] relative flex flex-col justify-center items-center py-12 px-6 overflow-hidden">
          
          {/* Faux Decorative Book Array Center Deck */}
          <div className="flex items-center justify-center gap-4 w-full max-w-lg opacity-90">
            {/* Left Blurred Out-of-Focus Cards */}
            <div className="hidden sm:block w-20 h-32 opacity-30 transform -rotate-6 filter blur-[1px] relative">
              <Image src={book.coverImage} alt="" fill className="object-cover rounded-sm shadow-md" />
            </div>
            <div className="hidden sm:block w-28 h-44 opacity-50 transform -rotate-3 filter blur-[0.5px] relative">
              <Image src={book.coverImage} alt="" fill className="object-cover rounded-sm shadow-md" />
            </div>

            {/* Active Highlighted Main Book Cover */}
            <div className="relative w-48 h-72 md:w-56 md:h-84 shadow-2xl rounded-md overflow-hidden transform scale-105 border-2 border-white/20 transition-transform duration-300">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Right Blurred Out-of-Focus Cards */}
            <div className="hidden sm:block w-28 h-44 opacity-50 transform rotate-3 filter blur-[0.5px] relative">
              <Image src={book.coverImage} alt="" fill className="object-cover rounded-sm shadow-md" />
            </div>
            <div className="hidden sm:block w-20 h-32 opacity-30 transform rotate-6 filter blur-[1px] relative">
              <Image src={book.coverImage} alt="" fill className="object-cover rounded-xl shadow-md" />
            </div>
          </div>
        </div>

        {/* Right Side: Clean Book Spec Info Grid Layout */}
        <div className="bg-[#ef0161]/2 py-12 px-5 lg:px-16 flex flex-col justify-center max-w-3xl">
          
          {/* Main Title Headers */}
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-wide">
              {book.title}
            </h1>
            {/* Blue Ribbon Accent Divider Design Line */}
            <div className="flex items-center gap-1 mt-4">
              <div className="w-3 h-3 bg-[#ef0161] rotate-45" />
              <div className="w-3 h-3 bg-[#ef0161] rotate-45 -ml-1.5" />
              <div className="h-[2px] bg-[#ef0161] w-48 ml-1" />
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 tracking-wide uppercase">
                  <div className="w-2.5 h-2.5 bg-[#ef0161] rotate-45" /> Author
                </div>

                <div className="mt-3 flex items-center gap-3 pl-4">
                  <div className="relative w-12 h-12 rounded-lg border-2 border-[#ef0161] overflow-hidden bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold text-xs">
                      {book.author?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{book.author}</h4>
                    <p className="text-xs text-gray-400 font-medium">Librarian: {book.librarianId?.name || 'Staff'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Paragraph Container */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 tracking-wide uppercase">
                <div className="w-2.5 h-2.5 bg-[#ef0161] rotate-45" /> Description
              </div>
              <p className="mt-2 text-sm md:text-base leading-7 text-gray-500 font-light pl-4 align-justify">
                {book.description || 'No summary overview details provided for this volume entry context.'}
              </p>
            </div>

            {/* Ratings Summary Deck */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 tracking-wide uppercase">
                <div className="w-2.5 h-2.5 bg-[#ef0161] rotate-45" /> Rating
              </div>
              <div className="mt-2.5 flex items-center gap-1 text-gray-300 pl-4">
                <Rating ratings={ratings} />
              </div>
            </div>

            {/* Action Operations Controller Drawer */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              {!isOwner && (
                <Button
                  onClick={handleTransaction}
                  disabled={isUnavailable}
                  className={`h-9.5 rounded-xl px-8 text-sm font-semibold text-white transition shadow-sm ${
                    isUnavailable
                      ? "cursor-not-allowed bg-gray-300"
                      : "bg-[#ef0161] hover:bg-[#d90158]"
                  }`}
                >
                  {isUnavailable
                    ? "Unavailable"
                    : `Request Delivery (৳${book.deliveryFee})`}
                </Button>
              )}

              {isOwner && (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/books/edit/${book._id}`}
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <Button className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
                    <Trash2 size={16} /> Delete
                  </Button>
                  <Button className="flex items-center gap-2 rounded-xl bg-yellow-50 px-5 py-2.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 transition-colors">
                    <EyeOff size={16} /> Unpublish
                  </Button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {!isOwner &&
        user?.role === "reader" &&
        canReview &&
        !hasReviewed && (
          <ReviewForm
            bookId={book._id}
            comment={myComment}
            rating={myRating}
            onSuccess={() => {
              fetchReviews();
              fetchMyReview();
            }}
          />
      )}

      <div className={user?.role === 'reader' ? 'mt-20' : ''}>
        <ReviewList
          comments={comments}
          ratings={ratings}
        />
      </div>              
    </section>
  );
};

export default BookDetailPage;
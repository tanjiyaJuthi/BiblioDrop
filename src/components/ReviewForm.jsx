'use client';

import { Star } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ReviewForm = ({
    bookId,
    isEdit,
    comment: initialComment,
    rating: initialRating,
    onSuccess,
}) => {
  const router = useRouter  ();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (initialComment) {
      setComment(initialComment.commentText);
    }

    if (initialRating) {
      setRating(initialRating.rating);
    }
  }, [initialComment, initialRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert('Please select a rating');
      return;
    }

    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      const isUpdatingComment = !!initialComment;
      const isUpdatingRating = !!initialRating;

      const ratingReq = fetch(
        isUpdatingRating
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating/${initialRating._id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/rating`,
        {
            method: isUpdatingRating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData.token}`,
            },
            body: JSON.stringify({
                bookId,
                rating,
            }),
        }
      );

      const commentReq = fetch(
        isUpdatingComment
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${initialComment._id}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`,
        {
            method: isUpdatingComment ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({
            bookId,
            commentText: comment,
          }),
        }
      );

      const ratingRes = await ratingReq;
      const commentRes = await commentReq;

      await Promise.all([ratingRes.json(), commentRes.json()]);

      setRating(0);
      setComment("");

      if (isEdit) {
        router.back();
      } else {
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-20 ">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[4px] text-gray-400">
            Reader Feedback
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            Write Your Review
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-600">
              Rating
            </label>

            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setRating(star)
                    }
                    className="transition hover:scale-110"
                  >
                    <Star
                      size={30}
                      fill={
                        star <= rating
                          ? 'currentColor'
                          : 'none'
                      }
                      className={
                        star <= rating
                          ? 'text-[#ef0161]'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-600">
              Comment
            </label>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder="Tell other readers what you thought about this book..."
              className="w-full rounded-xl border border-[#ef0161]/5 bg-[#ef0161]/1 p-5 outline-none transition focus:border-[#ef0161] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#ef0161] px-5 h-9.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? isEdit
                  ? "Updating..."
                  : "Submitting..."
              : isEdit
                  ? "Update Review"
                  : "Publish Review"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
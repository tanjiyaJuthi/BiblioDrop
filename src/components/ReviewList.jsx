'use client';

import { Star } from 'lucide-react';
import NoData from './NoData';

const ReviewList = ({
  comments = [],
  ratings = [],
}) => {
  const getUserRating = (userId) => {
    return ratings.find(
      (r) => r.userId?._id === userId
    )?.rating;
  };

  return (
    <section className="py-20 bg-[#ef0161]/2">
      <div className="mx-auto max-w-7xl px-5 lg:px-0 space-y-6">
        <h3 className="text-3xl font-semibold">
          Reader Reviews
        </h3>

        {comments.length > 0 ? (
          comments.map((comment) => {
            const userId =
              comment.userId?._id;

            const rating =
              getUserRating(userId);

            return (
              <div
                key={comment._id}
                className="rounded-xl border border-slate-100 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">
                      {comment.userId?.name ||
                        'Reader'}
                    </h4>

                    <p className="text-xs text-slate-400">
                      Reader
                    </p>
                  </div>

                  {rating && (
                    <div className="flex gap-1 text-[#ef0161]">
                      {[...Array(5)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={
                              i < rating
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        )
                      )}
                    </div>
                  )}
                </div>

                <p className="mt-4 text-slate-600">
                  {comment.commentText}
                </p>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
            <NoData />
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewList;
'use client';

import { Star } from 'lucide-react';

const Rating = ({ ratings = [] }) => {
  const totalRatings = ratings.length;

  const average =
    totalRatings > 0
      ? (
          ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / totalRatings
        ).toFixed(1)
      : '0.0';

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={
              i < Math.round(average)
                ? 'currentColor'
                : 'none'
            }
            className="text-[#ef0161]"
          />
        ))}
      </div>

      <span className="font-semibold text-gray-800">
        {average}
      </span>

      <span className="text-sm text-gray-500">
        ({totalRatings} ratings)
      </span>
    </div>
  );
};

export default Rating;
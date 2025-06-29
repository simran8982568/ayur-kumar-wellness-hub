
import React, { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  timeAgo: string;
  verified: boolean;
}

const CustomerReviews: React.FC = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('most-recent');

  const reviews: Review[] = [
    {
      id: 1,
      username: 'praveen kumar',
      rating: 5,
      comment: 'This is not a promotional message. I have used this for the past two months and find it really energetic and strengthening in a gym.',
      timeAgo: '4 days ago',
      verified: true
    },
    {
      id: 2,
      username: 'Prakash Kambla',
      rating: 1,
      comment: 'Not delivered. Even not delivered',
      timeAgo: '5 days ago',
      verified: true
    },
    {
      id: 3,
      username: 'Dabhi Jagdish',
      rating: 4,
      comment: 'Best item. Best item but taste problem',
      timeAgo: '1 week ago',
      verified: true
    },
    {
      id: 4,
      username: 'Totan Majumder',
      rating: 5,
      comment: 'Very good product ✨. Very good product ✨❤️',
      timeAgo: '3 weeks ago',
      verified: true
    },
    {
      id: 5,
      username: 'manoj kaushal',
      rating: 3,
      comment: 'Effective product',
      timeAgo: '1 week ago',
      verified: true
    },
    {
      id: 6,
      username: 'Dhanraj vadnal',
      rating: 5,
      comment: 'Nice. Nice',
      timeAgo: '3 weeks ago',
      verified: true
    }
  ];

  const totalReviews = 1791;
  const averageRating = 4.1;
  
  const ratingBreakdown = [
    { stars: 5, percentage: 56, count: 995 },
    { stars: 4, percentage: 40, count: 709 },
    { stars: 3, percentage: 2, count: 34 },
    { stars: 2, percentage: 1, count: 16 },
    { stars: 1, percentage: 2, count: 37 }
  ];

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleWriteReview = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Open review modal (simplified for demo)
      alert('Review modal would open here');
    } else {
      navigate('/auth/verify-number');
    }
  };

  const handleAskExperts = () => {
    navigate('/consultations');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Customer Reviews
        </h2>
        <div className="flex gap-3">
          <Button
            onClick={handleWriteReview}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
          >
            Write a Review
          </Button>
          <Button
            onClick={handleAskExperts}
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 py-2"
          >
            Ask Our Experts
          </Button>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Overall Rating */}
        <div>
          <div className="flex items-center mb-4">
            {renderStars(Math.floor(averageRating), 'md')}
            <span className="ml-2 text-2xl font-bold text-black dark:text-white">
              {averageRating}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Based on {totalReviews.toLocaleString()} reviews
          </p>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.stars}</span>
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 w-12">
                  {item.percentage}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-16">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Filters */}
        <div className="flex flex-col justify-start">
          <div className="flex items-center justify-between mb-4">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button className="px-4 py-2 text-black dark:text-white border-b-2 border-black dark:border-white font-medium">
                Reviews ({totalReviews})
              </button>
              <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                Questions (266)
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-lg text-sm border border-gray-300 dark:border-gray-600"
            >
              <option value="most-recent">Most Recent</option>
              <option value="top-rated">Top Rated</option>
              <option value="lowest-rated">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            {/* User Info */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-black dark:text-white">
                  {review.username}
                </h4>
                {review.verified && (
                  <span className="bg-black text-white text-xs px-2 py-1 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                {renderStars(review.rating)}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {review.timeAgo}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
        >
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;

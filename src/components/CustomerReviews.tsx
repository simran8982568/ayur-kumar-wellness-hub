
import React, { useState } from 'react';
import { Star, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  timeAgo: string;
  verified: boolean;
}

const CustomerReviews: React.FC = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('most-recent');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    reviewText: ''
  });

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

  // Filter reviews based on selected filter
  const filteredReviews = React.useMemo(() => {
    let filtered = [...reviews];
    switch (sortBy) {
      case 'top-rated':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'lowest-rated':
        return filtered.sort((a, b) => a.rating - b.rating);
      case 'most-recent':
      default:
        return filtered;
    }
  }, [sortBy]);

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
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleWriteReview = () => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!reviewForm.name || !reviewForm.email || !reviewForm.title || !reviewForm.reviewText) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock save review data
    console.log('Review submitted:', reviewForm);
    
    toast({
      title: "Success",
      description: "Review submitted successfully!",
    });

    // Reset form and close modal
    setReviewForm({
      name: '',
      email: '',
      rating: 5,
      title: '',
      reviewText: ''
    });
    setShowReviewModal(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1C1C2D]">
          Customer Reviews
        </h2>
        <div className="flex gap-3">
          <Button
            onClick={handleWriteReview}
            className="bg-[#111111] hover:bg-[#111111]/90 text-white rounded-lg px-4 py-2"
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Overall Rating */}
        <div>
          <div className="flex items-center mb-4">
            {renderStars(Math.floor(averageRating), 'md')}
            <span className="ml-2 text-2xl font-bold text-[#1C1C2D]">
              {averageRating}
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Based on {totalReviews.toLocaleString()} reviews
          </p>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{item.stars}</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {item.percentage}%
                </span>
                <span className="text-sm text-gray-500 w-16">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Filters */}
        <div className="flex flex-col justify-start">
          <div className="flex items-center justify-between mb-4">
            <div className="flex border-b border-gray-200">
              <button className="px-4 py-2 text-[#1C1C2D] border-b-2 border-[#1C1C2D] font-medium">
                Reviews ({totalReviews})
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-100 text-[#1C1C2D] rounded-lg text-sm border border-gray-300"
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
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            {/* User Info */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-[#1C1C2D]">
                  {review.username}
                </h4>
                {review.verified && (
                  <span className="bg-[#111111] text-white text-xs px-2 py-1 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                {renderStars(review.rating)}
                <span className="text-xs text-gray-500">
                  {review.timeAgo}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button
          className="bg-[#111111] hover:bg-[#111111]/90 text-white rounded-lg"
        >
          Load More Reviews
        </Button>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1C1C2D]">Write a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1C2D] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#1C1C2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C2D] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#1C1C2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C2D] mb-1">
                  Rating *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewForm.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C2D] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#1C1C2D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C2D] mb-1">
                  Review Text *
                </label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({...reviewForm, reviewText: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[#1C1C2D]"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#1C1C2D]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#111111] hover:bg-[#111111]/90 text-white"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;

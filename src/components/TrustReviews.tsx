
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TrustReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Bahut pareshaan tha main... 3 month course kiya, kabhi accha laabh mila mujhe... sabse best doctor.",
      location: "Delhi"
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 5,
      comment: "Dr. Kumar ke treatment se meri problem completely solve ho gayi. Very professional service.",
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Amit Singh",
      rating: 4,
      comment: "Excellent products and consultation. Results dekh kar main khush hun. Highly recommended!",
      location: "Bangalore"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Real People, Real Stories
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            See what our patients say about their experience with Dr. Kumar Laboratories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="minimalist-card p-6 relative">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-gray-300" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-900 mb-4 italic leading-relaxed text-sm">
                "{review.comment}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center">
                  <span className="text-brand-primary font-semibold text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm tracking-tight">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500"></div>
              <span className="text-sm uppercase tracking-wide">1000+ Happy Patients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500"></div>
              <span className="text-sm uppercase tracking-wide">15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500"></div>
              <span className="text-sm uppercase tracking-wide">MBBS Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustReviews;

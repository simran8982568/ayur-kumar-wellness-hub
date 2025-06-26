
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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Real People, Real Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our patients say about their experience with Dr. Kumar Laboratories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="healthcare-card p-6 relative">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-brand-primary/30" />
              
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
              <p className="text-foreground mb-4 italic leading-relaxed">
                "{review.comment}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-brand-primary font-semibold text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">1000+ Happy Patients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">MBBS Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustReviews;

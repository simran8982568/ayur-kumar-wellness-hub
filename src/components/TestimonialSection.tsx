
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      story: "After trying Dr. Kumar's immunity booster for 3 months, I haven't fallen sick even once during the monsoon season. My energy levels are incredible!",
      rating: 5,
      videoThumbnail: "/api/placeholder/300/200",
      beforeAfter: { before: "Frequent cold & fatigue", after: "Strong immunity & energy" }
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Ahmedabad, Gujarat",
      story: "The men's vitality pack completely transformed my life. My confidence is back and my wife is amazed by the positive changes in just 2 months.",
      rating: 5,
      videoThumbnail: "/api/placeholder/300/200",
      beforeAfter: { before: "Low energy & stress", after: "Vitality & confidence" }
    },
    {
      id: 3,
      name: "Anjali Verma",
      location: "Delhi",
      story: "Dr. Kumar's digestive care combo helped me overcome years of acidity issues. Now I can enjoy my favorite foods without any discomfort!",
      rating: 5,
      videoThumbnail: "/api/placeholder/300/200",
      beforeAfter: { before: "Chronic acidity", after: "Perfect digestion" }
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-ayurvedic-green-50 via-ayurvedic-beige-50 to-ayurvedic-gold-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ayurvedic-green-800 mb-4">
            Real People, Real Stories
          </h2>
          <p className="text-ayurvedic-green-600 text-lg max-w-2xl mx-auto">
            Discover how thousands of customers have transformed their health with our authentic Ayurvedic solutions
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                    {/* Video Section */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                        <img 
                          src={testimonial.videoThumbnail} 
                          alt={`${testimonial.name} testimonial`}
                          className="w-full h-64 lg:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Button 
                            size="lg"
                            className="bg-white/90 hover:bg-white text-ayurvedic-green-700 rounded-full p-4 shadow-lg"
                          >
                            <Play className="w-8 h-8 ml-1" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Before/After Badge */}
                      <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-ayurvedic-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-xs text-red-600 font-medium mb-1">BEFORE</p>
                            <p className="text-sm text-gray-600">{testimonial.beforeAfter.before}</p>
                          </div>
                          <div>
                            <p className="text-xs text-ayurvedic-green-600 font-medium mb-1">AFTER</p>
                            <p className="text-sm text-ayurvedic-green-700 font-medium">{testimonial.beforeAfter.after}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-ayurvedic-gold-400 text-ayurvedic-gold-400" />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl lg:text-2xl text-ayurvedic-green-700 leading-relaxed">
                        "{testimonial.story}"
                      </blockquote>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-ayurvedic-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-ayurvedic-green-800">
                            {testimonial.name}
                          </h4>
                          <p className="text-ayurvedic-green-600">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      
                      <Button className="ayurvedic-button">
                        Start Your Journey
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-ayurvedic-green-700" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-ayurvedic-green-700" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-ayurvedic-green-600 w-8' 
                    : 'bg-ayurvedic-green-300 hover:bg-ayurvedic-green-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Ayurvedic Gold Inside",
      subtitle: "Pure Traditional Wellness",
      offer: "SAVE ₹688",
      description: "Discover the power of ancient Ayurveda with our premium herbal formulations",
      cta: "Shop Now",
      image: "/api/placeholder/600/400",
      bgGradient: "from-ayurvedic-gold-200 via-ayurvedic-beige-100 to-ayurvedic-green-100"
    },
    {
      id: 2,
      title: "Immunity Booster Combo",
      subtitle: "Strengthen Your Natural Defense",
      offer: "30% OFF",
      description: "Boost your immunity with our scientifically backed Ayurvedic supplements",
      cta: "Buy Now",
      image: "/api/placeholder/600/400",
      bgGradient: "from-ayurvedic-green-200 via-ayurvedic-beige-100 to-ayurvedic-herbal-100"
    },
    {
      id: 3,
      title: "Men's Vitality Pack",
      subtitle: "Complete Wellness Solution",
      offer: "FREE CONSULTATION",
      description: "Enhance your vitality with our specialized men's health formulations",
      cta: "Consult Now",
      image: "/api/placeholder/600/400",
      bgGradient: "from-ayurvedic-herbal-200 via-ayurvedic-green-100 to-ayurvedic-gold-100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl mx-4 lg:mx-8 mt-4">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${slide.bgGradient} relative overflow-hidden`}>
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-ayurvedic-green-300/30 rounded-full blur-2xl"></div>
            
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                {/* Content */}
                <div className="space-y-6 animate-fade-in">
                  <div className="inline-block bg-ayurvedic-gold-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {slide.offer}
                  </div>
                  
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-ayurvedic-green-800 leading-tight mb-2">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-ayurvedic-green-600 font-medium mb-4">
                      {slide.subtitle}
                    </h2>
                    <p className="text-ayurvedic-green-700 text-lg max-w-md">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button className="ayurvedic-button text-lg px-8 py-3">
                      {slide.cta}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-2 border-ayurvedic-green-500 text-ayurvedic-green-700 hover:bg-ayurvedic-green-50 px-8 py-3 rounded-full font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="hidden lg:block relative">
                  <div className="absolute inset-0 bg-white/30 rounded-3xl blur-lg"></div>
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="relative z-10 w-full h-80 object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-ayurvedic-green-700" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-ayurvedic-green-700" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-ayurvedic-green-600 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

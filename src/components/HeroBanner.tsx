
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
      bgColor: "bg-white"
    },
    {
      id: 2,
      title: "Immunity Booster Combo",
      subtitle: "Strengthen Your Natural Defense",
      offer: "30% OFF",
      description: "Boost your immunity with our scientifically backed Ayurvedic supplements",
      cta: "Buy Now",
      image: "/api/placeholder/600/400",
      bgColor: "bg-gray-50"
    },
    {
      id: 3,
      title: "Men's Vitality Pack",
      subtitle: "Complete Wellness Solution",
      offer: "FREE CONSULTATION",
      description: "Enhance your vitality with our specialized men's health formulations",
      cta: "Consult Now",
      image: "/api/placeholder/600/400",
      bgColor: "bg-white"
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
    <div className="relative h-[500px] md:h-[600px] overflow-hidden mx-4 lg:mx-8 mt-4 border border-gray-200">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`h-full ${slide.bgColor} relative overflow-hidden`}>
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                {/* Content */}
                <div className="space-y-6 animate-fade-in">
                  <div className="inline-block bg-black text-white px-4 py-2 text-sm font-medium uppercase tracking-wide">
                    {slide.offer}
                  </div>
                  
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-2 tracking-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 font-medium mb-4 tracking-tight">
                      {slide.subtitle}
                    </h2>
                    <p className="text-gray-700 text-base max-w-md">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button className="minimalist-button-primary text-base px-8 py-3">
                      {slide.cta}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 font-medium uppercase tracking-wide"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="hidden lg:block relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-80 object-cover border border-gray-200"
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 hover:bg-gray-50 p-3"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 hover:bg-gray-50 p-3"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gray-900 w-8' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

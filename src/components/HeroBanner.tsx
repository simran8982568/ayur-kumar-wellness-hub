
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Ayurvedic Gold Inside",
      subtitle: "Pure Traditional Wellness",
      offer: "SAVE ₹688",
      description: "Discover the power of ancient Ayurveda with our premium herbal formulations",
      cta: "Shop Now",
      productSlug: "ayurvedic-gold-capsules",
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
      productSlug: "immunity-booster-combo",
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
      productSlug: "mens-vitality-pack",
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

  const handleSlideClick = (slide: typeof slides[0]) => {
    if (slide.cta === "Consult Now") {
      navigate('/consultation-booking');
    } else {
      navigate(`/product/${slide.productSlug}`);
    }
  };

  const handleCtaClick = (slide: typeof slides[0]) => {
    if (slide.cta === "Consult Now") {
      navigate('/consultation-booking');
    } else {
      navigate(`/product/${slide.productSlug}`);
    }
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden mx-4 lg:mx-8 mt-4 border border-gray-200 dark:border-gray-700">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out cursor-pointer ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
          onClick={() => handleSlideClick(slide)}
        >
          <div className={`h-full ${slide.bgColor} dark:bg-gray-800 relative overflow-hidden`}>
            <div className="container mx-auto px-6 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                {/* Content */}
                <div className="space-y-6 animate-fade-in">
                  <div className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium uppercase tracking-wide rounded-md">
                    {slide.offer}
                  </div>
                  
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-4 tracking-tight">
                      {slide.subtitle}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-400 text-base max-w-md">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCtaClick(slide);
                      }}
                      className="bg-[#111111] dark:bg-gray-700 hover:bg-[#302e2e] dark:hover:bg-blue-700 text-white text-base px-6 py-2 rounded-full font-medium uppercase tracking-wide transition-all duration-300 hover:bg-primary/80"
                    >
                      {slide.cta}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/about-us');
                      }}
                      className="border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black px-6 py-2 font-medium uppercase tracking-wide rounded-full transition-all duration-300"
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
                    className="w-full h-80 object-cover border border-gray-200 dark:border-gray-700 rounded-lg"
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
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`h-3 transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-[#111111] dark:bg-blue-600 w-8' 
                : 'bg-gray-400 hover:bg-gray-600 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

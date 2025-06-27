
import React from 'react';

const ConcernBlocks: React.FC = () => {
  const concerns = [
    { id: 1, name: "Men's Health", icon: "👨‍⚕️", color: "text-gray-900" },
    { id: 2, name: "Women's Wellness", icon: "🌸", color: "text-gray-900" },
    { id: 3, name: "Immunity", icon: "🛡️", color: "text-gray-900" },
    { id: 4, name: "Digestion", icon: "🌿", color: "text-gray-900" },
    { id: 5, name: "Stress & Sleep", icon: "😴", color: "text-gray-900" },
    { id: 6, name: "Joint Care", icon: "🦴", color: "text-gray-900" },
    { id: 7, name: "Skin & Hair", icon: "✨", color: "text-gray-900" },
    { id: 8, name: "Weight Management", icon: "⚖️", color: "text-gray-900" }
  ];

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Shop by Health Concerns
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Find the perfect Ayurvedic solution for your specific health needs
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {concerns.map((concern) => (
            <button
              key={concern.id}
              className="group flex items-center space-x-3 px-6 py-4 border border-gray-200 bg-white hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {concern.icon}
              </span>
              <span className="font-medium text-gray-900 group-hover:text-gray-900 text-sm uppercase tracking-wide">
                {concern.name}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Concern */}
        <div className="mt-16 bg-gray-50 border border-gray-200 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              🔥 Trending Now: Immunity Boosters
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
              Strengthen your natural defenses with our scientifically formulated immunity supplements, 
              trusted by thousands of customers across India.
            </p>
            <button className="minimalist-button-primary px-8 py-3">
              Explore Immunity Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernBlocks;

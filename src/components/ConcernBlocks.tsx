
import React from 'react';

const ConcernBlocks: React.FC = () => {
  const concerns = [
    { id: 1, name: "Men's Health", icon: "👨‍⚕️", color: "bg-blue-100 text-blue-800" },
    { id: 2, name: "Women's Wellness", icon: "🌸", color: "bg-pink-100 text-pink-800" },
    { id: 3, name: "Immunity", icon: "🛡️", color: "bg-green-100 text-green-800" },
    { id: 4, name: "Digestion", icon: "🌿", color: "bg-emerald-100 text-emerald-800" },
    { id: 5, name: "Stress & Sleep", icon: "😴", color: "bg-purple-100 text-purple-800" },
    { id: 6, name: "Joint Care", icon: "🦴", color: "bg-orange-100 text-orange-800" },
    { id: 7, name: "Skin & Hair", icon: "✨", color: "bg-yellow-100 text-yellow-800" },
    { id: 8, name: "Weight Management", icon: "⚖️", color: "bg-indigo-100 text-indigo-800" }
  ];

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-ayurvedic-green-800 mb-4">
            Shop by Health Concerns
          </h2>
          <p className="text-ayurvedic-green-600 text-lg max-w-2xl mx-auto">
            Find the perfect Ayurvedic solution for your specific health needs
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {concerns.map((concern) => (
            <button
              key={concern.id}
              className="concern-pill group flex items-center space-x-3 px-6 py-4 hover:shadow-lg"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {concern.icon}
              </span>
              <span className="font-medium text-ayurvedic-green-700 group-hover:text-ayurvedic-green-800">
                {concern.name}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Concern */}
        <div className="mt-12 bg-gradient-to-r from-ayurvedic-green-50 to-ayurvedic-beige-50 rounded-3xl p-8 border border-ayurvedic-green-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-ayurvedic-green-800 mb-4">
              🔥 Trending Now: Immunity Boosters
            </h3>
            <p className="text-ayurvedic-green-600 mb-6 max-w-2xl mx-auto">
              Strengthen your natural defenses with our scientifically formulated immunity supplements, 
              trusted by thousands of customers across India.
            </p>
            <button className="ayurvedic-button">
              Explore Immunity Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernBlocks;

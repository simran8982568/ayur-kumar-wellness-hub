
import React from 'react';
import { Link } from 'react-router-dom';
import { healthConcerns } from '@/data/healthConcerns';

const HealthConcernsGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Shop by Health Concerns
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our specialized collections designed for your specific wellness needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {healthConcerns.map((concern) => (
            <Link
              key={concern.id}
              to={concern.slug === 'consultations' ? '/consultations' : `/category/${concern.slug}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{concern.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                    {concern.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {concern.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <button className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    {concern.slug === 'consultations' ? 'Book Now' : 'Explore'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthConcernsGrid;

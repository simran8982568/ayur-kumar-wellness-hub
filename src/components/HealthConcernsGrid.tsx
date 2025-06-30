import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { healthConcerns } from '@/data/healthConcerns';

const HealthConcernsGrid: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleConcernClick = (concern: HealthConcern) => {
    navigate(`/category/${concern.slug}`);
  };

  const displayedConcerns = showAll ? healthConcerns : healthConcerns.slice(0, 4);

  return (
    <section className="py-12 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C2D] mb-4">
            What's Your Health Concern?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our specialized treatments designed to address your specific health needs with Ayurvedic solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {displayedConcerns.map((concern) => (
            <div
              key={concern.id}
              onClick={() => handleConcernClick(concern)}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#E5002B]/10 rounded-full group-hover:bg-[#E5002B]/20 transition-colors">
                  <span className="text-2xl">{concern.icon}</span>
                </div>
                <h3 className="font-semibold text-[#1C1C2D] text-sm mb-2 group-hover:text-[#E5002B] transition-colors">
                  {concern.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {concern.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!showAll && healthConcerns.length > 4 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="border-2 border-[#E5002B] text-[#E5002B] hover:bg-[#E5002B] hover:text-white rounded-full px-6 py-2 font-medium transition-all duration-300"
            >
              View All Health Concerns
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthConcernsGrid;

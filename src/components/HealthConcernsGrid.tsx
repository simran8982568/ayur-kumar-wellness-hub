
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronUp, EyeOff } from 'lucide-react';
import { healthConcerns, HealthConcern } from '@/data/healthConcerns';
import { Button } from '@/components/ui/button';

const HealthConcernsGrid: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();

  const handleConcernClick = (concern: HealthConcern) => {
    navigate(`/category/${concern.slug}`);
  };

  // Filter out hormonal imbalance
  const filteredConcerns = healthConcerns.filter(concern => concern.slug !== 'hormonal-imbalance');
  const displayedConcerns = showAll ? filteredConcerns : filteredConcerns.slice(0, 4);

  if (isHidden) {
    return null;
  }

  return (
    <section className="py-12 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C2D] flex-1">
              What's Your Health Concern?
            </h2>
            {/* Hide Concerns button - mobile only */}
            <Button
              onClick={() => setIsHidden(true)}
              variant="ghost"
              className="sm:hidden text-[#111111] hover:bg-gray-100 p-2"
              aria-label="Hide concerns section"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our specialized treatments designed to address your specific health needs with Ayurvedic solutions.
          </p>
        </div>

        {/* Responsive grid: 1 col on xs, 2 on sm, 3 on md, 4 on lg+ */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
          {displayedConcerns.map((concern) => (
            <div
              key={concern.id}
              onClick={() => handleConcernClick(concern)}
              className="w-full rounded-xl shadow p-2 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
            >
              <div className="text-center">
                <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 flex items-center justify-center bg-[#111111]/10 rounded-full group-hover:bg-[#111111]/20 transition-colors">
                  <span className="text-lg md:text-2xl">{concern.icon}</span>
                </div>
                <h3 className="font-semibold text-[#1C1C2D] text-xs md:text-sm mb-1 md:mb-2 group-hover:text-[#111111] transition-colors">
                  {concern.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {concern.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!showAll && filteredConcerns.length > 4 && (
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-[#111111] text-white hover:bg-[#302e2e] rounded-full px-6 py-2 font-medium transition-all duration-300"
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

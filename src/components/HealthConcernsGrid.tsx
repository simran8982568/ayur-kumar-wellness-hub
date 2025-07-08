import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronUp, EyeOff } from "lucide-react";
import { healthConcerns, HealthConcern } from "@/data/healthConcerns";
import { Button } from "@/components/ui/button";

const HealthConcernsGrid: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();

  const handleConcernClick = (concern: HealthConcern) => {
    // Navigate to the specific subcategory page based on the concern slug
    navigate(`/category/${concern.slug}`);
  };

  // Show all concerns (2) and center them for attractive view
  const displayedConcerns = healthConcerns;

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
            Choose from our specialized treatments designed to address your
            specific health needs with Ayurvedic solutions.
          </p>
        </div>

        {/* Centered grid for 2 concerns, attractive view */}
        <div className="flex justify-center gap-6 w-full max-w-2xl mx-auto">
          {displayedConcerns.map((concern) => (
            <div
              key={concern.id}
              onClick={() => handleConcernClick(concern)}
              className="w-full max-w-[220px] rounded-xl shadow p-3 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#111111]/10 rounded-full group-hover:bg-[#111111]/20 transition-colors">
                  <span className="text-2xl">{concern.icon}</span>
                </div>
                <h3 className="font-semibold text-[#1C1C2D] text-sm mb-2 group-hover:text-[#111111] transition-colors">
                  {concern.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {concern.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthConcernsGrid;

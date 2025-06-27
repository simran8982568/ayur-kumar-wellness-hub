
import React from 'react';
import { Shield, Award, Users, Leaf } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Trusted by Doctors',
      description: 'Clinically recommended formulations'
    },
    {
      icon: Award,
      title: 'Affordable Care',
      description: 'Premium quality at accessible prices'
    },
    {
      icon: Users,
      title: 'Nature Meets Science',
      description: 'Traditional wisdom, modern research'
    },
    {
      icon: Leaf,
      title: 'Effective Formulations',
      description: 'Proven results, natural ingredients'
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4 tracking-tight">
            The Future of Personal Care Is Here
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                <badge.icon className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;


import React from 'react';
import { Link } from 'react-router-dom';

const HealthConcerns: React.FC = () => {
  const concerns = [
    { icon: '👨‍⚕️', title: "Men's Health", href: '/mens-health', description: 'Vitality & Performance' },
    { icon: '🌸', title: "Women's Wellness", href: '/womens-health', description: 'Hormonal Balance' },
    { icon: '🛡️', title: 'Immunity', href: '/immunity', description: 'Natural Defense' },
    { icon: '🌿', title: 'Digestion', href: '/digestion', description: 'Gut Health' },
    { icon: '😴', title: 'Stress & Sleep', href: '/stress-sleep', description: 'Mental Wellness' },
    { icon: '🦴', title: 'Joint Care', href: '/joint-care', description: 'Bone Health' },
    { icon: '✨', title: 'Skin & Hair', href: '/skin-hair', description: 'Beauty Care' },
    { icon: '⚖️', title: 'Weight Management', href: '/weight', description: 'Healthy Balance' }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Shop by Health Concerns
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            Find the perfect Ayurvedic solution for your specific health needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {concerns.map((concern) => (
            <Link
              key={concern.title}
              to={concern.href}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-brand-primary transition-all duration-300 group"
            >
              <div className="text-4xl mb-3">{concern.icon}</div>
              <h3 className="font-semibold text-black dark:text-white mb-1 group-hover:text-brand-primary transition-colors">
                {concern.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {concern.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthConcerns;

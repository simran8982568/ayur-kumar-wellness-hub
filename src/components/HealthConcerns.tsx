
import React from 'react';
import { Link } from 'react-router-dom';

const HealthConcerns: React.FC = () => {
  const concerns = [
    { icon: '👨‍⚕️', title: "Men's Sexual Health", href: '/category/mens-sexual-health', description: 'Vitality & Performance' },
    { icon: '🌸', title: "Women's Sexual Health", href: '/category/womens-sexual-health', description: 'Hormonal Balance' },
    { icon: '🔥', title: 'Erectile Dysfunction', href: '/category/erectile-dysfunction', description: 'Natural Solutions' },
    { icon: '⚡', title: 'Premature Ejaculation', href: '/category/premature-ejaculation', description: 'Performance Support' },
    { icon: '⚖️', title: 'Hormonal Imbalance', href: '/category/hormonal-imbalance', description: 'Natural Balance' },
    { icon: '👶', title: 'Infertility Support', href: '/category/infertility-support', description: 'Fertility Enhancement' },
    { icon: '🌿', title: 'General Wellness', href: '/category/general-wellness', description: 'Overall Health' },
    { icon: '💊', title: 'All Products', href: '/shop-all', description: 'Complete Range' }
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

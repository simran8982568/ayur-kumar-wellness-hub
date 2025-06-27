
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Sample blog data - in real app, this would be fetched based on slug
  const blogPost = {
    title: "The Complete Guide to Ayurvedic Immunity Building",
    bannerImage: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    author: "Dr. Kumar Laboratories Editorial Team",
    publishDate: "December 15, 2024",
    readTime: "8 min read",
    content: `
      <h2>Introduction to Ayurvedic Immunity</h2>
      <p>In today's fast-paced world, building and maintaining a strong immune system has become more important than ever. Ayurveda, the ancient Indian system of medicine, offers time-tested wisdom for naturally enhancing our body's defense mechanisms.</p>
      
      <h2>Understanding Immunity Through Ayurveda</h2>
      <p>According to Ayurvedic principles, immunity or 'Ojas' is considered the essence of all bodily tissues. It represents the body's vital energy and its ability to resist disease. When Ojas is strong, we experience vibrant health, mental clarity, and emotional stability.</p>
      
      <h2>Key Ayurvedic Herbs for Immunity</h2>
      <p>Several powerful herbs have been used in Ayurveda for centuries to boost immunity:</p>
      <ul>
        <li><strong>Ashwagandha:</strong> Known as the "king of herbs," it helps reduce stress and boost overall vitality.</li>
        <li><strong>Tulsi:</strong> Sacred basil that purifies the respiratory system and enhances immunity.</li>
        <li><strong>Amla:</strong> Rich in Vitamin C and antioxidants, it strengthens the immune system.</li>
        <li><strong>Turmeric:</strong> Contains curcumin, a powerful anti-inflammatory compound.</li>
      </ul>
      
      <h2>Lifestyle Practices for Better Immunity</h2>
      <p>Beyond herbs, Ayurveda emphasizes the importance of daily routines (Dinacharya) and seasonal adjustments (Ritucharya) to maintain optimal health:</p>
      <ul>
        <li>Wake up early and maintain regular sleep patterns</li>
        <li>Practice meditation and yoga regularly</li>
        <li>Eat according to your constitution (Prakriti)</li>
        <li>Stay hydrated with warm water throughout the day</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building immunity through Ayurveda is not just about taking herbs or supplements. It's about adopting a holistic lifestyle that supports your body's natural healing abilities. By incorporating these ancient principles into modern life, we can achieve lasting health and vitality.</p>
    `
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6 text-brand-primary hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Banner Image */}
          <div className="mb-8">
            <img 
              src={blogPost.bannerImage} 
              alt={blogPost.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6">
              <span>By {blogPost.author}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.publishDate}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.readTime}</span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Share:</span>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white p-2 hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="bg-blue-400 text-white p-2 hover:bg-blue-500 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="bg-blue-800 text-white p-2 hover:bg-blue-900 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="bg-gray-600 text-white p-2 hover:bg-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              lineHeight: '1.8',
            }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Want to learn more about Ayurvedic wellness? Explore our range of natural products.
              </p>
              <Button 
                onClick={() => navigate('/shop-all')}
                className="bg-brand-primary hover:bg-brand-secondary text-white"
              >
                Shop Ayurvedic Products
              </Button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;

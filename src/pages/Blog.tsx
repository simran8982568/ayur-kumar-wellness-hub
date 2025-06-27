
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = [
    { id: 'all', name: 'All', color: '#723421' },
    { id: 'immunity', name: '#immunity', color: '#c74a1b' },
    { id: 'weightloss', name: '#weightloss', color: '#723421' },
    { id: 'ayurveda', name: '#ayurveda', color: '#c74a1b' },
    { id: 'fitness', name: '#fitness', color: '#723421' },
    { id: 'guthealth', name: '#guthealth', color: '#c74a1b' },
    { id: 'herbs', name: '#herbs', color: '#723421' }
  ];

  const featuredBlog = {
    id: 1,
    title: "The Complete Guide to Ayurvedic Immunity Building",
    summary: "Discover ancient wisdom combined with modern science to build lasting immunity through natural herbs and lifestyle practices.",
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    tag: "immunity",
    readTime: "8 min read"
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Ayurvedic Herbs for Natural Weight Management",
      excerpt: "Learn about powerful herbs that support healthy weight loss naturally without side effects.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "weightloss",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Understanding Gut Health Through Ayurveda",
      excerpt: "Explore how Ayurvedic principles can transform your digestive health and overall wellness.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "guthealth",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Modern Fitness Meets Ancient Ayurveda",
      excerpt: "Combine contemporary fitness routines with Ayurvedic practices for optimal health results.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "fitness",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "The Power of Adaptogenic Herbs in Daily Life",
      excerpt: "Discover how adaptogenic herbs can help you manage stress and boost energy naturally.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "herbs",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Ayurvedic Skincare: Beauty from Within",
      excerpt: "Learn how Ayurvedic principles can give you naturally glowing skin through internal wellness.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "ayurveda",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "Building Immunity During Seasonal Changes",
      excerpt: "Strengthen your immune system naturally during weather transitions with Ayurvedic wisdom.",
      image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
      tag: "immunity",
      readTime: "5 min read"
    }
  ];

  const filteredPosts = selectedTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tag === selectedTag);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Health & Wellness Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest insights in Ayurveda, wellness, and natural health from our expert team
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                selectedTag === tag.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Featured Blog */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-brand-primary text-white px-3 py-1 text-sm font-medium">
                    #{featuredBlog.tag}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{featuredBlog.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">{featuredBlog.title}</h3>
                <p className="text-gray-600 mb-6">{featuredBlog.summary}</p>
                <Button 
                  onClick={() => navigate(`/blog/ayurvedic-immunity-guide`)}
                  className="bg-brand-primary hover:bg-brand-secondary text-white"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs font-medium">
                      #{post.tag}
                    </span>
                    <span className="text-gray-500 text-xs ml-3">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-black">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/blog/post-${post.id}`)}
                    className="text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="text-center">
          <Button 
            variant="outline"
            className="text-brand-primary border-brand-primary hover:bg-brand-primary hover:text-white"
          >
            View More Articles
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

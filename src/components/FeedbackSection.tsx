
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const FeedbackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const categories = [
    'Product Quality Issue',
    'Great Product Experience',
    'Delivery Delay',
    'New Product Request',
    'Website Navigation Issue'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !feedback || !email || !name) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit feedback",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    try {
      console.log('Submitting feedback:', {
        category: selectedCategory,
        feedback,
        email,
        name,
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      setSelectedCategory('');
      setFeedback('');
      setEmail('');
      setName('');
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback. We'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-16 px-4 lg:px-8 bg-gradient-to-br from-ayurvedic-beige-50 to-ayurvedic-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-ayurvedic-green-100 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-ayurvedic-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ayurvedic-green-800 mb-4">
            We Value Your Feedback
          </h2>
          <p className="text-ayurvedic-green-600 text-lg max-w-2xl mx-auto">
            Help us serve you better by sharing your experience, concerns, or suggestions
          </p>
        </div>

        <div className="ayurvedic-card max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ayurvedic-green-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-ayurvedic-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ayurvedic-green-300 focus:border-transparent bg-white"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ayurvedic-green-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-ayurvedic-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ayurvedic-green-300 focus:border-transparent bg-white"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurvedic-green-700 mb-3">
                Feedback Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                      selectedCategory === category
                        ? 'border-ayurvedic-green-500 bg-ayurvedic-green-50 text-ayurvedic-green-700'
                        : 'border-ayurvedic-green-200 bg-white text-ayurvedic-green-600 hover:border-ayurvedic-green-300 hover:bg-ayurvedic-green-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ayurvedic-green-700 mb-2">
                Your Message *
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-ayurvedic-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ayurvedic-green-300 focus:border-transparent bg-white resize-none"
                placeholder="Please share your detailed feedback, experience, or suggestions..."
              />
            </div>

            <Button 
              type="submit" 
              className="w-full ayurvedic-button flex items-center justify-center space-x-2 text-lg py-4"
            >
              <Send className="w-5 h-5" />
              <span>Submit Feedback</span>
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 text-ayurvedic-green-600">
          <p className="mb-2">Need immediate assistance?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="tel:08128268794" className="hover:text-ayurvedic-green-700 font-medium">
              📞 08128268794
            </a>
            <a href="mailto:support@drkumar.com" className="hover:text-ayurvedic-green-700 font-medium">
              📧 support@drkumar.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;

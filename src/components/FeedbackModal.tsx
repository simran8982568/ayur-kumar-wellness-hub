
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    type: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage (mock backend)
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const newFeedback = {
      id: Date.now(),
      ...formData,
      progress: 'Pending',
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };
    
    feedbacks.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    toast({
      title: "Thank you! Your feedback has been submitted.",
      description: "We'll review your feedback and get back to you soon.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      type: '',
      subject: '',
      message: ''
    });

    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">Customer Feedback</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type of Feedback *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
            >
              <option value="">Select feedback type</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
              <option value="Suggestion">Suggestion</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject *
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="Brief title of your feedback"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Detailed Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
              placeholder="Please provide detailed feedback..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;

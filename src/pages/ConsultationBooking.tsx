
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ConsultationBooking: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    mobileNumber: '',
    emailAddress: '',
    healthConcern: '',
    concernDescription: '',
    preferredDate: '',
    preferredTime: '',
    preferredDoctor: ''
  });

  const healthConcerns = [
    'Erectile Dysfunction',
    'Premature Ejaculation',
    'Low Libido',
    'Infertility',
    'Hormonal Imbalance',
    'Penis Enlargement',
    'Women\'s Health',
    'Other'
  ];

  const doctors = [
    'Dr. Kumar (Ayurvedic Specialist)',
    'Dr. Priya (Women\'s Health)',
    'Dr. Singh (Unani Medicine)',
    'Any Available Doctor'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.age || !formData.gender || !formData.mobileNumber) {
      toast({
        title: "Please fill required fields",
        description: "Full name, age, gender, and mobile number are required.",
        variant: "destructive",
      });
      return;
    }

    // Save consultation request (in real app, this would go to backend)
    localStorage.setItem('consultationRequest', JSON.stringify(formData));
    
    toast({
      title: "Request Submitted!",
      description: "Thank you! We'll contact you shortly to finalize your consultation.",
    });

    // Clear form
    setFormData({
      fullName: '',
      age: '',
      gender: '',
      mobileNumber: '',
      emailAddress: '',
      healthConcern: '',
      concernDescription: '',
      preferredDate: '',
      preferredTime: '',
      preferredDoctor: ''
    });
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      age: '',
      gender: '',
      mobileNumber: '',
      emailAddress: '',
      healthConcern: '',
      concernDescription: '',
      preferredDate: '',
      preferredTime: '',
      preferredDoctor: ''
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
              Book Your Online Consultation
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Fill in your details and our Ayurvedic or Unani doctor will confirm a suitable appointment time based on availability. Private, personalized & secure.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
              <div className="text-6xl">🌿</div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Health Concern */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Health Concern
                </label>
                <select
                  name="healthConcern"
                  value={formData.healthConcern}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                >
                  <option value="">Select Health Concern</option>
                  {healthConcerns.map((concern) => (
                    <option key={concern} value={concern}>{concern}</option>
                  ))}
                </select>
              </div>

              {/* Describe Concern */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Describe Your Concern (Optional)
                </label>
                <textarea
                  name="concernDescription"
                  value={formData.concernDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                  placeholder="Please describe your health concern in detail..."
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Preferred Time (Optional)
                </label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                />
              </div>

              {/* Preferred Doctor */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Preferred Doctor (Optional)
                </label>
                <select
                  name="preferredDoctor"
                  value={formData.preferredDoctor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                >
                  <option value="">Select Preferred Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4  ">
                <Button
                  type="submit"
                  className="flex-1 bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                >
                  Request Appointment
                </Button>
                <Button
                  type="button"
                  onClick={handleClearForm}
                  variant="outline"
                  className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg transition-colors duration-200"
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultationBooking;

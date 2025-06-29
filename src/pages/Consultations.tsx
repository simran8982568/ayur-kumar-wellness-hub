
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
  availability: string[];
}

const Consultations: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Ayurvedic Sexologist',
      experience: '15+ years',
      rating: 4.8,
      image: '/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png',
      bio: 'Specialized in male sexual health, erectile dysfunction, and premature ejaculation treatments using traditional Ayurvedic methods.',
      availability: ['10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM']
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialization: 'Women\'s Wellness Expert',
      experience: '12+ years',
      rating: 4.9,
      image: '/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png',
      bio: 'Expert in women\'s reproductive health, hormonal balance, and fertility treatments through natural Ayurvedic remedies.',
      availability: ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
    },
    {
      id: 3,
      name: 'Dr. Amjad Ali',
      specialization: 'Unani Medicine Specialist',
      experience: '18+ years',
      rating: 4.7,
      image: '/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png',
      bio: 'Traditional Unani medicine practitioner focusing on sexual wellness, vitality enhancement, and natural healing methods.',
      availability: ['9:00 AM', '12:00 PM', '3:00 PM', '7:00 PM']
    }
  ];

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (selectedDoctor && selectedTime) {
      alert(`Appointment booked with ${selectedDoctor.name} at ${selectedTime}`);
      setShowBookingModal(false);
      setSelectedDoctor(null);
      setSelectedTime('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Online Consultations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Book virtual appointments with our experienced Ayurvedic and Unani specialists. 
            Get personalized treatment plans from the comfort of your home.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {doctor.name}
                </h3>
                <p className="text-[#c74a1b] dark:text-blue-400 font-medium mb-2">
                  {doctor.specialization}
                </p>
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">• {doctor.experience}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 text-center">
                {doctor.bio}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Available Times
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availability.map((time) => (
                    <div key={time} className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-center">
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => handleBookAppointment(doctor)}
                className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Book Appointment
              </Button>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
            Why Choose Our Online Consultations?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#c74a1b] dark:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Book appointments at your convenience with our flexible time slots
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#c74a1b] dark:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">From Home</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Consult with specialists from the comfort and privacy of your home
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#c74a1b] dark:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">Expert Care</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Personalized treatment plans from experienced Ayurvedic specialists
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
              Book Appointment with {selectedDoctor.name}
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedDoctor.availability.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 text-sm rounded-md border transition-colors ${
                      selectedTime === time
                        ? 'bg-[#c74a1b] dark:bg-blue-600 text-white border-[#c74a1b] dark:border-blue-600'
                        : 'bg-white dark:bg-gray-700 text-black dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowBookingModal(false)}
                variant="outline"
                className="flex-1 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmBooking}
                disabled={!selectedTime}
                className="flex-1 bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-md"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Consultations;

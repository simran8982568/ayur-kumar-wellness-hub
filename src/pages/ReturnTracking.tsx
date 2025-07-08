import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Package, RefreshCw, ArrowLeft } from 'lucide-react';

interface Order {
  id: number;
  date: string;
  items: number;
  total: number;
  status: string;
  productName: string;
  productImage: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  returnStatus?: 'none' | 'requested' | 'approved' | 'picked-up' | 'refunded';
  returnRequestDate?: string;
  returnTrackingId?: string;
}

const ReturnTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">Unable to find the order details for return tracking.</p>
            <Button onClick={() => navigate('/account')} className="bg-[#111111] hover:bg-[#111111]/90 text-white">
              Go to My Orders
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getReturnStatusInfo = (status: string) => {
    switch (status) {
      case 'requested':
        return {
          title: 'Return Requested',
          description: 'Your return request has been submitted and is under review.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <Clock className="w-6 h-6" />
        };
      case 'approved':
        return {
          title: 'Return Approved',
          description: 'Your return request has been approved. Pickup will be scheduled soon.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: <CheckCircle className="w-6 h-6" />
        };
      case 'picked-up':
        return {
          title: 'Product Picked Up',
          description: 'Your product has been picked up and is being processed for refund.',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          icon: <Package className="w-6 h-6" />
        };
      case 'refunded':
        return {
          title: 'Refund Processed',
          description: 'Your refund has been processed and will reflect in your account within 5-7 business days.',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: <RefreshCw className="w-6 h-6" />
        };
      default:
        return {
          title: 'Unknown Status',
          description: 'Unable to determine return status.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: <Clock className="w-6 h-6" />
        };
    }
  };

  const returnSteps = [
    { id: 'requested', title: 'Return Requested', completed: true },
    { id: 'approved', title: 'Return Approved', completed: order.returnStatus === 'approved' || order.returnStatus === 'picked-up' || order.returnStatus === 'refunded' },
    { id: 'picked-up', title: 'Product Picked Up', completed: order.returnStatus === 'picked-up' || order.returnStatus === 'refunded' },
    { id: 'refunded', title: 'Refund Processed', completed: order.returnStatus === 'refunded' }
  ];

  const currentStatusInfo = getReturnStatusInfo(order.returnStatus || 'requested');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate('/account')}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#1C1C2D]">Return Tracking</h1>
              <p className="text-gray-600">Track the status of your return request</p>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <img 
                src={order.productImage} 
                alt={order.productName}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{order.productName}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-medium">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return Tracking ID</p>
                    <p className="font-medium">{order.returnTrackingId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return Request Date</p>
                    <p className="font-medium">{order.returnRequestDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className={`${currentStatusInfo.bgColor} border border-gray-200 rounded-lg p-6 mb-8`}>
            <div className="flex items-center space-x-4">
              <div className={`${currentStatusInfo.color}`}>
                {currentStatusInfo.icon}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${currentStatusInfo.color}`}>
                  {currentStatusInfo.title}
                </h3>
                <p className="text-gray-700 mt-1">{currentStatusInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Return Progress</h3>
            <div className="space-y-4">
              {returnSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      step.completed ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {step.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Expected Timeline */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Return Processing</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Return approval: 24-48 hours</li>
                  <li>• Pickup scheduling: 3-5 business days</li>
                  <li>• Quality verification: 2-3 business days</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Refund Processing</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Refund initiation: 1-2 business days</li>
                  <li>• Bank processing: 3-5 business days</li>
                  <li>• Total time: 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-[#111111] text-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help with Your Return?</h3>
            <p className="text-gray-300 mb-4">
              Our customer support team is here to assist you with any questions about your return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:08128268794" 
                className="bg-white text-[#111111] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                📞 Call: 08128268794
              </a>
              <a 
                href="mailto:returns@drkumar.com" 
                className="bg-white text-[#111111] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                📧 Email: returns@drkumar.com
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnTracking;

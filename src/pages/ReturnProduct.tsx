import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Phone, Mail, X } from "lucide-react";

const ReturnProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const order = location.state?.order;

  const [returnData, setReturnData] = useState({
    reason: "",
    description: "",
    refundMethod: "original",
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [returnRequestId, setReturnRequestId] = useState<string>("");

  const returnReasons = [
    "Product damaged/defective",
    "Wrong product delivered",
    "Product not as described",
    "Changed my mind",
    "Product expired",
    "Quality issues",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("bank.")) {
      const bankField = name.split(".")[1];
      setReturnData((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setReturnData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!returnData.reason || !returnData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!returnData.refundMethod) {
      toast({
        title: "Refund Method Required",
        description: "Please select a refund method.",
        variant: "destructive",
      });
      return;
    }

    if (
      returnData.refundMethod === "bank" &&
      (!returnData.bankDetails.accountNumber ||
        !returnData.bankDetails.accountHolderName)
    ) {
      toast({
        title: "Bank Details Required",
        description: "Please provide complete bank details for refund.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate return request ID
      const requestId = `RTN${Date.now()}`;
      setReturnRequestId(requestId);

      // Save return request (in real app, this would be an API call)
      const returnRequest = {
        id: requestId,
        orderId: order?.id,
        productName: order?.productName,
        returnDate: new Date().toISOString().split("T")[0],
        status: "requested",
        ...returnData,
      };

      const existingReturns = JSON.parse(
        localStorage.getItem("returnRequests") || "[]"
      );
      existingReturns.push(returnRequest);
      localStorage.setItem("returnRequests", JSON.stringify(existingReturns));

      // Update order status in localStorage to show return was requested
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = existingOrders.map((ord: any) =>
        ord.id === order?.id
          ? {
              ...ord,
              returnStatus: "requested",
              returnRequestDate: new Date().toISOString().split("T")[0],
              returnTrackingId: requestId,
            }
          : ord
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setShowConfirmation(true);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your return request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The order information is not available.
            </p>
            <Button onClick={() => navigate("/account")}>
              Go to My Account
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Return Request Confirmation Modal
  const ReturnConfirmationModal = () => {
    if (!showConfirmation) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2">
        <div className="bg-white rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden shadow-2xl flex flex-col scale-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 sm:p-4 text-white text-center">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
            <h2 className="text-base sm:text-lg font-bold mb-1">
              Return Request Sent!
            </h2>
            <p className="text-green-100 text-xs sm:text-sm">
              We've received your return request
            </p>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 space-y-3 overflow-y-auto">
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-3">
                <p className="text-xs text-gray-600 mb-1">Return Request ID</p>
                <p className="text-sm font-bold text-[#1C1C2D]">
                  {returnRequestId}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 text-xs">
                    Processing Time
                  </p>
                  <p className="text-xs text-gray-600">2-3 business days</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 text-xs">
                    Contact Support
                  </p>
                  <p className="text-xs text-gray-600">+91 8128268794</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="font-medium text-gray-900 text-xs">
                    Email Support
                  </p>
                  <p className="text-xs text-gray-600">support@drkumar.com</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-2 sm:p-3 mt-2">
              <h4 className="font-semibold text-blue-900 mb-1 text-xs">
                What Happens Next?
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• We'll review your return request within 24-48 hours</li>
                <li>
                  • You'll receive an email confirmation with pickup details
                </li>
                <li>• Track your return status in "My Orders" section</li>
                <li>• Refund will be processed after product inspection</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-1 sm:p-2 bg-gray-50 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => {
                setShowConfirmation(false);
                navigate("/");
              }}
              variant="outline"
              className="flex-1 border-[#1C1C2D] text-[#1C1C2D] hover:bg-[#1C1C2D] hover:text-white text-[10px] py-0.5 sm:py-1 min-h-0 h-6 sm:h-7 rounded"
              style={{ fontSize: "0.7rem" }}
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate(`/return-status/${returnRequestId}`)}
              variant="secondary"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-[10px] py-0.5 sm:py-1 min-h-0 h-6 sm:h-7 rounded"
              style={{ fontSize: "0.7rem" }}
            >
              Track Return Status
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ReturnConfirmationModal />
      <div className="min-h-screen bg-white">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={() => navigate("/account")}
                variant="outline"
                size="sm"
                className="mb-4"
              >
                ← Back to Account
              </Button>
              <h1 className="text-3xl font-bold text-[#1C1C2D]">
                Return Product
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {order.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Order ID: #{order.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        Order Date: {order.date}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Form */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Return *
                      </label>
                      <select
                        name="reason"
                        value={returnData.reason}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                      >
                        <option value="">Select a reason</option>
                        {returnReasons.map((reason) => (
                          <option key={reason} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={returnData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Please provide detailed information about the issue..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Refund Method *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="refundMethod"
                            value="original"
                            checked={returnData.refundMethod === "original"}
                            onChange={handleInputChange}
                            className="mt-1 mr-3 text-[#111111] focus:ring-[#111111]"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              Refund to original payment method
                            </div>
                            <div className="text-sm text-gray-600">
                              Refund will be processed to the same payment
                              method used for purchase
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="refundMethod"
                            value="bank"
                            checked={returnData.refundMethod === "bank"}
                            onChange={handleInputChange}
                            className="mt-1 mr-3 text-[#111111] focus:ring-[#111111]"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              Bank transfer
                            </div>
                            <div className="text-sm text-gray-600">
                              Refund will be transferred to your bank account
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {returnData.refundMethod === "bank" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">
                          Bank Details
                        </h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Holder Name *
                          </label>
                          <input
                            type="text"
                            name="bank.accountHolderName"
                            value={returnData.bankDetails.accountHolderName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Number *
                          </label>
                          <input
                            type="text"
                            name="bank.accountNumber"
                            value={returnData.bankDetails.accountNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#111111] hover:bg-[#111111]/90 text-white"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Submit Return Request"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/account")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReturnProduct;

// TODO: To permanently show the "Track Return Status" button in the order detail page/component after a return request is submitted, add a button like:
// <Button onClick={() => navigate(`/return-status/${order.returnTrackingId}`)} variant="secondary">Track Return Status</Button>
// Place this in the order detail view where return status is shown.

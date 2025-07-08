import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database, UserCheck, Cookie } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1C1C2D] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy is our priority. Learn how we protect and use your
            information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 2024
          </p>
        </div>

        {/* Privacy Commitment */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-blue-900">
              Our Privacy Commitment
            </h2>
          </div>
          <p className="text-blue-800">
            At Dr. Kumar Laboratories, we are committed to protecting your
            privacy and ensuring the security of your personal information. This
            policy explains how we collect, use, and safeguard your data when
            you use our services.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Secure Storage
            </h3>
            <p className="text-green-700 text-sm">
              Your data is encrypted and stored securely
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <UserCheck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Your Control
            </h3>
            <p className="text-purple-700 text-sm">
              You control your data and privacy settings
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <Eye className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              Transparency
            </h3>
            <p className="text-orange-700 text-sm">
              Clear information about data usage
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1: Information We Collect */}
          <section className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <Database className="w-6 h-6 mr-3" />
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-700">
              <h4 className="font-semibold text-gray-900">
                Personal Information
              </h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Date of birth and gender (for health consultations)</li>
                <li>
                  Payment information (processed securely by payment providers)
                </li>
                <li>
                  Health information you voluntarily provide during
                  consultations
                </li>
              </ul>

              <h4 className="font-semibold text-gray-900">
                Automatically Collected Information
              </h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Website usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Note:</strong> We only collect information that is
                  necessary to provide our services and improve your experience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <h4 className="font-semibold text-gray-900">Service Provision</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Conduct health consultations and provide guidance</li>
                <li>Send order confirmations and shipping updates</li>
              </ul>

              <h4 className="font-semibold text-gray-900">Communication</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send important service announcements</li>
                <li>
                  Provide health tips and wellness information (with consent)
                </li>
                <li>Respond to your questions and feedback</li>
                <li>Send promotional offers (you can opt-out anytime)</li>
              </ul>

              <h4 className="font-semibold text-gray-900">
                Improvement and Analytics
              </h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analyze website usage to improve our services</li>
                <li>Personalize your shopping experience</li>
                <li>Develop new products and features</li>
                <li>Ensure website security and prevent fraud</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Information Sharing */}
          <section className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-medium">
                  <strong>
                    We do not sell, trade, or rent your personal information to
                    third parties.
                  </strong>
                </p>
              </div>

              <h4 className="font-semibold text-gray-900">
                Limited Sharing Scenarios
              </h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Service Providers:</strong> Trusted partners who help
                  us operate our business (shipping, payment processing)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of merger,
                  acquisition, or sale of our business
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly agree
                  to share information
                </li>
              </ul>

              <p>
                All third-party service providers are contractually bound to
                protect your information and use it only for specified purposes.
              </p>
            </div>
          </section>

          {/* Section 4: Cookies and Tracking */}
          <section className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <Cookie className="w-6 h-6 mr-3" />
              4. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar technologies to enhance your browsing experience and provide personalized content.
              </p>

              <h4 className="font-semibold text-gray-900">Types of Cookies We Use</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">
                  <strong>Cookie Control:</strong> You can manage cookie preferences through your browser settings or our cookie consent banner.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security */}
          <section className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-3" />
              5. Data Security and Protection
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h4 className="font-semibold text-gray-900">Security Measures</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security audits and monitoring</li>
                <li>Employee training on data protection</li>
              </ul>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  <strong>Your Role:</strong> Please use strong passwords and keep your account credentials secure. Report any suspicious activity immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Your Rights */}
          <section className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <UserCheck className="w-6 h-6 mr-3" />
              6. Your Privacy Rights
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>You have the following rights regarding your personal information:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-2">Access & Portability</h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Request a copy of your data</li>
                    <li>• Download your information</li>
                    <li>• Know what data we have about you</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Correction & Updates</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Update incorrect information</li>
                    <li>• Modify your preferences</li>
                    <li>• Complete incomplete data</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-red-900 mb-2">Deletion & Restriction</h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Request data deletion</li>
                    <li>• Restrict data processing</li>
                    <li>• Object to certain uses</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-900 mb-2">Communication Control</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Opt-out of marketing emails</li>
                    <li>• Manage notification preferences</li>
                    <li>• Control communication frequency</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm">
                To exercise these rights, please contact us at privacy@drkumar.com or use the contact information provided below.
              </p>
            </div>
          </section>

          {/* Section 7: Data Retention */}
          <section className="border-l-4 border-gray-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">7. Data Retention</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations.
              </p>

              <h4 className="font-semibold text-gray-900">Retention Periods</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Information:</strong> Until account deletion or 3 years of inactivity</li>
                <li><strong>Order History:</strong> 7 years for tax and legal compliance</li>
                <li><strong>Health Consultations:</strong> 5 years as per healthcare regulations</li>
                <li><strong>Marketing Data:</strong> Until you opt-out or 2 years of inactivity</li>
                <li><strong>Website Analytics:</strong> 26 months maximum</li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

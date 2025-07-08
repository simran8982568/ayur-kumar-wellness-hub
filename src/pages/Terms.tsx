
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Shield, AlertTriangle, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1C1C2D] mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Please read these terms carefully before using our services</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-[#1C1C2D] mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a href="#acceptance" className="text-blue-600 hover:underline">1. Acceptance</a>
            <a href="#services" className="text-blue-600 hover:underline">2. Services</a>
            <a href="#user-accounts" className="text-blue-600 hover:underline">3. User Accounts</a>
            <a href="#orders" className="text-blue-600 hover:underline">4. Orders & Payment</a>
            <a href="#prohibited" className="text-blue-600 hover:underline">5. Prohibited Uses</a>
            <a href="#liability" className="text-blue-600 hover:underline">6. Liability</a>
            <a href="#privacy" className="text-blue-600 hover:underline">7. Privacy</a>
            <a href="#changes" className="text-blue-600 hover:underline">8. Changes</a>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-3" />
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing and using the Dr. Kumar Laboratories website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service constitute a legally binding agreement between you and Dr. Kumar Laboratories regarding your use of our website, products, and services.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  <AlertTriangle className="w-5 h-5 inline mr-2" />
                  By continuing to use our services, you acknowledge that you have read, understood, and agree to these terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Description of Services */}
          <section id="services" className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">2. Description of Services</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Dr. Kumar Laboratories provides Ayurvedic wellness products, health consultations, and related services through our digital platform. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sale of Ayurvedic medicines and wellness products</li>
                <li>Health consultations and guidance (not medical prescriptions)</li>
                <li>Educational content about Ayurvedic practices</li>
                <li>Customer support and order management</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> Our consultations are for guidance purposes only and do not constitute medical advice or prescriptions. Always consult qualified healthcare professionals for medical conditions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: User Accounts */}
          <section id="user-accounts" className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">3. User Accounts and Registration</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                To access certain features of our service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
              </p>
            </div>
          </section>

          {/* Section 4: Orders and Payment */}
          <section id="orders" className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">4. Orders and Payment Terms</h2>
            <div className="space-y-4 text-gray-700">
              <h4 className="font-semibold text-gray-900">Order Processing</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Orders are processed within 1-3 business days</li>
                <li>We reserve the right to refuse or cancel orders at our discretion</li>
                <li>Product availability is subject to stock levels</li>
                <li>Prices are subject to change without notice</li>
              </ul>

              <h4 className="font-semibold text-gray-900">Payment Terms</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment must be made in full before order processing</li>
                <li>We accept various payment methods as displayed on our website</li>
                <li>All transactions are processed securely</li>
                <li>Refunds are processed according to our return policy</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Prohibited Uses */}
          <section id="prohibited" className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              5. Prohibited Uses
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>You may not use our service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of our service</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">
                  Violation of these prohibited uses may result in immediate termination of your account and legal action.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section id="liability" className="border-l-4 border-gray-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-3" />
              6. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Dr. Kumar Laboratories shall not be held liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <h4 className="font-semibold text-gray-900">Product Disclaimers</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products are intended for wellness and general health support</li>
                <li>Results may vary from person to person</li>
                <li>Consult healthcare professionals before use if you have medical conditions</li>
                <li>Not intended to diagnose, treat, cure, or prevent any disease</li>
              </ul>
              <h4 className="font-semibold text-gray-900">Service Availability</h4>
              <p>
                We do not guarantee that our service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify or discontinue our service at any time.
              </p>
            </div>
          </section>

          {/* Section 7: Privacy and Data Protection */}
          <section id="privacy" className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              7. Privacy and Data Protection
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We collect only necessary information for service provision</li>
                <li>Your data is stored securely and not shared with unauthorized parties</li>
                <li>You have rights regarding your personal data</li>
                <li>We comply with applicable data protection laws</li>
              </ul>
              <p>
                By using our service, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 8: Changes to Terms */}
          <section id="changes" className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-4">8. Changes to Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right to update or change our Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page.
              </p>
              <p>
                You are advised to review these Terms of Service periodically for any changes. Changes to these Terms of Service are effective when they are posted on this page.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  <strong>Your continued use of our service after any modifications indicates your acceptance of the new terms.</strong>
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;

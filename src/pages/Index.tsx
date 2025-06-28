
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ProductSection from "@/components/ProductSection";
import TestimonialSection from "@/components/TestimonialSection";
import TrustBadges from "@/components/TrustBadges";
import DoctorProfile from "@/components/DoctorProfile";
import HealthConcerns from "@/components/HealthConcerns";
import ConcernBlocks from "@/components/ConcernBlocks";
import FeedbackSection from "@/components/FeedbackSection";
import TrustReviews from "@/components/TrustReviews";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <TrustBadges />
        <ProductSection />
        <HealthConcerns />
        <ConcernBlocks />
        <TestimonialSection />
        <TrustReviews />
        <DoctorProfile />
        <FAQSection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

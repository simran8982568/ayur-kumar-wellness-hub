
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

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    price: 599,
    originalPrice: 799,
    rating: 4.5,
    reviews: 125,
    image: "/placeholder.svg",
    badge: "Best Seller",
    inStock: true,
    description: "Premium Ashwagandha for stress relief and energy"
  },
  {
    id: 2,
    name: "Immunity Booster",
    price: 449,
    originalPrice: 549,
    rating: 4.3,
    reviews: 89,
    image: "/placeholder.svg",
    inStock: true,
    description: "Natural immunity support with herbs"
  },
  {
    id: 3,
    name: "Digestive Care",
    price: 399,
    rating: 4.4,
    reviews: 67,
    image: "/placeholder.svg",
    inStock: true,
    description: "Ayurvedic solution for digestive health"
  },
  {
    id: 4,
    name: "Joint Care Formula",
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg",
    badge: "New",
    inStock: true,
    description: "Complete joint health support"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <TrustBadges />
        <ProductSection 
          title="Featured Products"
          subtitle="Discover our bestselling Ayurvedic solutions"
          products={sampleProducts}
        />
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

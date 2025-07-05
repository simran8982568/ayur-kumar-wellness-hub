
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description?: string;
  slug?: string;
  category: string;
  subcategory?: string;
  longDescription?: string;
  keyBenefits?: string[];
  usage?: string;
}

export const mensHealthProducts: Product[] = [
  {
    id: 1,
    name: "Dr. Kumar's Power Stride Juice",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 245,
    image: "/api/placeholder/300/300",
    badge: "Bestseller",
    inStock: true,
    description: "An advanced juice blend for men & women who want to perform better, feel stronger, and stay energized – day and night.",
    longDescription: "Power Stride Juice is a powerful Ayurvedic formula enriched with ancient herbs and modern science to help you unlock your body's full potential. Whether it's your workout, your work day, or your personal performance – this juice keeps you going. Crafted by experts, this energizing tonic supports stamina, muscle strength, blood circulation, and recovery in a natural way.",
    keyBenefits: [
      "Increases stamina and muscle strength",
      "Boosts blood circulation", 
      "Supports athletic and personal performance",
      "No sugar, no artificial colors"
    ],
    usage: "20ml twice daily with lukewarm water.",
    category: "mens-sexual-health",
    subcategory: "performance-endurance",
    slug: "dr-kumar-power-stride-juice"
  },
  {
    id: 2,
    name: "Dr. Kumar's Power Stride Capsules",
    price: 749,
    originalPrice: 999,
    rating: 4.7,
    reviews: 189,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Strength packed in capsule form – a blend of nature's best stamina-boosting herbs to help you stay active, focused, and energized.",
    longDescription: "For those who live life on-the-go, Dr. Kumar's Power Stride Capsules are the perfect travel-friendly supplement to improve your strength, stamina, and performance. Each capsule delivers a potent herbal formula that supports better energy, improved muscle recovery, and enhanced performance — naturally.",
    keyBenefits: [
      "Improves stamina & endurance",
      "Faster recovery after activity",
      "Herbal formula, no side effects",
      "Convenient daily dosage"
    ],
    usage: "1 capsule twice a day after meals",
    category: "mens-sexual-health",
    subcategory: "performance-endurance",
    slug: "dr-kumar-power-stride-capsules"
  },
  {
    id: 3,
    name: "Dr. Kumar Power Stride Tablets (Effervescent)",
    price: 649,
    rating: 4.6,
    reviews: 156,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Instant performance drink with L-Arginine, botanical herbs, and Zinc – just drop in water and boost your energy!",
    longDescription: "Experience strength and stamina with the fizz! These fast-dissolving effervescent tablets combine L-Arginine, Zinc, and a herbal blend to improve blood flow, stamina, and physical performance. Perfect for gym-goers, active professionals, or anyone who wants to feel their best – naturally and instantly.",
    keyBenefits: [
      "Boosts nitric oxide levels for better circulation",
      "Improves strength, stamina, and endurance",
      "Delicious green lemon flavor",
      "No sugar, vegan friendly"
    ],
    usage: "Drop 1 tablet in a glass of water. Let it dissolve and drink immediately. Use daily or before workout/activity.",
    category: "mens-sexual-health",
    subcategory: "performance-endurance",
    slug: "dr-kumar-power-stride-effervescent"
  },
  {
    id: 4,
    name: "Dr. Kumar L Sachets (Large)",
    price: 799,
    originalPrice: 1099,
    rating: 4.5,
    reviews: 203,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Recharge your day with Dr. Kumar's L Sachets – a herbal tonic crafted for natural strength, vitality, and internal power.",
    longDescription: "Tired of fatigue and low energy? These convenient sachets are packed with a doctor-formulated blend of potent herbs that naturally help boost stamina, improve blood flow, and support daily strength – without any side effects. Whether you're in the gym, in a busy office life, or just need a daily dose of power – this is your go-to support formula.",
    keyBenefits: [
      "Improves strength and daily stamina",
      "Natural energy without caffeine",
      "Herbal blend with no added chemicals",
      "Easy-to-carry sachet form"
    ],
    usage: "Take 1 sachet daily with water or warm milk, preferably after meals.",
    category: "mens-sexual-health",
    subcategory: "strength-wellness-sachets",
    slug: "dr-kumar-l-sachets-large"
  }
];

export const allProducts: Product[] = [...mensHealthProducts];

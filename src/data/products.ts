
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
}

export const mensHealthProducts: Product[] = [
  {
    id: 1,
    name: "Men's Vitality Booster",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 245,
    image: "/api/placeholder/300/300",
    badge: "Bestseller",
    inStock: true,
    description: "Natural energy and stamina enhancer",
    category: "mens-health"
  },
  {
    id: 2,
    name: "Testosterone Support Capsules",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 189,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Hormonal balance and strength",
    category: "mens-health"
  },
  {
    id: 3,
    name: "Male Fertility Enhancer",
    price: 749,
    rating: 4.6,
    reviews: 156,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Comprehensive reproductive health",
    category: "mens-health"
  },
  {
    id: 4,
    name: "Stress Relief for Men",
    price: 449,
    originalPrice: 599,
    rating: 4.5,
    reviews: 203,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Natural stress management",
    category: "mens-health"
  }
];

export const womensHealthProducts: Product[] = [
  {
    id: 5,
    name: "Women's Wellness Complex",
    price: 649,
    originalPrice: 849,
    rating: 4.9,
    reviews: 312,
    image: "/api/placeholder/300/300",
    badge: "Popular",
    inStock: true,
    description: "Complete feminine health support",
    category: "womens-health"
  },
  {
    id: 6,
    name: "Hormonal Balance Tablets",
    price: 549,
    rating: 4.7,
    reviews: 267,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Natural hormone regulation",
    category: "womens-health"
  },
  {
    id: 7,
    name: "Iron & Calcium Supplement",
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviews: 198,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Essential nutrients for women",
    category: "womens-health"
  },
  {
    id: 8,
    name: "Pregnancy Care Capsules",
    price: 799,
    rating: 4.9,
    reviews: 145,
    image: "/api/placeholder/300/300",
    badge: "Trusted",
    inStock: true,
    description: "Safe prenatal nutrition",
    category: "womens-health"
  },
  {
    id: 9,
    name: "PCOS Relief Formula",
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    reviews: 234,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Natural PCOS management",
    category: "womens-health"
  },
  {
    id: 10,
    name: "Menopause Support",
    price: 799,
    rating: 4.5,
    reviews: 176,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Comfort during menopause",
    category: "womens-health"
  }
];

export const comboProducts: Product[] = [
  {
    id: 11,
    name: "Complete Health Combo",
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviews: 89,
    image: "/api/placeholder/300/300",
    badge: "Best Value",
    inStock: true,
    description: "3-month complete wellness pack",
    category: "combos"
  },
  {
    id: 12,
    name: "Immunity Power Pack",
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 134,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Boost your natural immunity",
    category: "combos"
  },
  {
    id: 13,
    name: "Digestive Health Duo",
    price: 749,
    originalPrice: 999,
    rating: 4.6,
    reviews: 76,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Complete digestive care",
    category: "combos"
  },
  {
    id: 14,
    name: "Energy & Focus Bundle",
    price: 999,
    originalPrice: 1399,
    rating: 4.5,
    reviews: 98,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Mental and physical energy",
    category: "combos"
  },
  {
    id: 15,
    name: "Family Wellness Package",
    price: 1599,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 156,
    image: "/api/placeholder/300/300",
    badge: "Popular",
    inStock: true,
    description: "Health solutions for the whole family",
    category: "combos"
  },
  {
    id: 16,
    name: "Couple's Health Combo",
    price: 1199,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 112,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Wellness for couples",
    category: "combos"
  }
];

export const essentialProducts: Product[] = [
  {
    id: 17,
    name: "Daily Multivitamin",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 456,
    image: "/api/placeholder/300/300",
    badge: "Essential",
    inStock: true,
    description: "Complete daily nutrition",
    category: "essentials"
  },
  {
    id: 18,
    name: "Herbal Immunity Tea",
    price: 199,
    rating: 4.6,
    reviews: 289,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Natural immunity booster",
    category: "essentials"
  },
  {
    id: 19,
    name: "Digestive Enzymes",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 167,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Better digestion naturally",
    category: "essentials"
  },
  {
    id: 20,
    name: "Sleep Support Tablets",
    price: 349,
    rating: 4.5,
    reviews: 234,
    image: "/api/placeholder/300/300",
    badge: "Popular",
    inStock: true,
    description: "Natural sleep enhancement",
    category: "essentials"
  },
  {
    id: 21,
    name: "Omega-3 Fish Oil",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 345,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Heart and brain health",
    category: "essentials"
  },
  {
    id: 22,
    name: "Vitamin D3 Capsules",
    price: 249,
    rating: 4.6,
    reviews: 278,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Bone health and immunity",
    category: "essentials"
  }
];

export const newArrivals: Product[] = [
  ...mensHealthProducts.filter(p => p.badge === "New"),
  ...womensHealthProducts.filter(p => p.badge === "New"),
  ...comboProducts.filter(p => p.badge === "New"),
  ...essentialProducts.filter(p => p.badge === "New")
];

export const allProducts: Product[] = [
  ...mensHealthProducts,
  ...womensHealthProducts,
  ...comboProducts,
  ...essentialProducts
];

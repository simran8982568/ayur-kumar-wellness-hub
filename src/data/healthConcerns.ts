export interface HealthConcern {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
}

export const healthConcerns: HealthConcern[] = [
  {
    id: "hc1",
    title: "Men's Sexual Health",
    slug: "mens-sexual-health",
    icon: "💪",
    description: "Boost vitality and performance naturally",
  },
  {
    id: "hc2",
    title: "Women's Sexual Health",
    slug: "womens-sexual-health",
    icon: "🌸",
    description: "Hormonal balance and feminine wellness",
  },
  {
    id: "hc3",
    title: "Erectile Dysfunction",
    slug: "erectile-dysfunction",
    icon: "🎯",
    description: "Natural ED solutions and treatments",
  },
  {
    id: "hc4",
    title: "Nightfall & Premature Ejaculation",
    slug: "nightfall-pe",
    icon: "🌙",
    description: "Control and confidence enhancement",
  },
  {
    id: "hc5",
    title: "Infertility Support",
    slug: "infertility-support",
    icon: "👶",
    description: "Reproductive health for couples",
  },
  {
    id: "hc6",
    title: "Hormonal Imbalance",
    slug: "hormonal-imbalance",
    icon: "⚖️",
    description: "Natural hormone regulation",
  },
  {
    id: "hc7",
    title: "Loss of Libido",
    slug: "libido-boosters",
    icon: "❤️",
    description: "Reignite passion and desire",
  },
  {
    id: "hc8",
    title: "Penis Enlargement",
    slug: "penis-enlargement",
    icon: "📏",
    description: "Natural enhancement solutions",
  },
  {
    id: "hc9",
    title: "Sexual Wellness Combos",
    slug: "combos-kits",
    icon: "🎁",
    description: "Complete wellness packages",
  },
  {
    id: "hc10",
    title: "Unani & Homeopathic Care",
    slug: "unani-homeopathy",
    icon: "🌿",
    description: "Traditional alternative medicine",
  },
];

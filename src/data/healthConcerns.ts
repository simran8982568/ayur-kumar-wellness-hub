
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
    title: "Performance & Endurance Boosters",
    slug: "performance-endurance",
    icon: "🏃‍♂️",
    description: "Advanced formulas for peak performance and endurance",
  },
  {
    id: "hc2",
    title: "Strength & Wellness Support (Sachet Format)",
    slug: "strength-wellness-sachets",
    icon: "💪",
    description: "Convenient sachets for daily strength and wellness",
  },
];


export interface HealthConcern {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
}

export const healthConcerns: HealthConcern[] = [
  { 
    id: 'hc1', 
    title: 'Immunity Boosters', 
    slug: 'immunity',
    icon: '🛡️',
    description: 'Natural Defense'
  },
  { 
    id: 'hc2', 
    title: 'Liver Health', 
    slug: 'liver',
    icon: '🫁',
    description: 'Detox & Cleanse'
  },
  { 
    id: 'hc3', 
    title: "Men's Wellness", 
    slug: 'mens-health',
    icon: '👨‍⚕️',
    description: 'Vitality & Performance'
  },
  { 
    id: 'hc4', 
    title: "Women's Wellness", 
    slug: 'womens-health',
    icon: '🌸',
    description: 'Hormonal Balance'
  },
  { 
    id: 'hc5', 
    title: 'Digestion', 
    slug: 'digestion',
    icon: '🌿',
    description: 'Gut Health'
  },
  { 
    id: 'hc6', 
    title: 'Stress & Sleep', 
    slug: 'stress-sleep',
    icon: '😴',
    description: 'Mental Wellness'
  },
  { 
    id: 'hc7', 
    title: 'Skin & Hair', 
    slug: 'skin-hair',
    icon: '✨',
    description: 'Beauty Care'
  },
  { 
    id: 'hc8', 
    title: 'Weight Management', 
    slug: 'weight',
    icon: '⚖️',
    description: 'Healthy Balance'
  }
];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  dataAiHint?: string;
  specs: string[];
  description: string;
  featured?: boolean;
  condition?: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Pixel Pro 8',
    price: 899,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'smartphone google',
    specs: ['12GB RAM', '256GB Storage', 'Tensor G3 Chip', '6.7" OLED Display', '50MP Main Camera'],
    description: 'The latest flagship phone with AI-powered features and an amazing camera system. Experience the best of Google in a sleek design.',
    featured: true,
    condition: 'New',
  },
  {
    id: '2',
    name: 'Galaxy Ultra S23',
    price: 1099,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'samsung phone',
    specs: ['12GB RAM', '512GB Storage', 'Snapdragon 8 Gen 2', '6.8" AMOLED 2X Display', '200MP Main Camera'],
    description: 'Unleash your creativity with the Galaxy Ultra S23. Pro-grade camera, powerful performance, and a stunning display.',
    featured: true,
    condition: 'New',
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'apple iphone',
    specs: ['8GB RAM', '256GB Storage', 'A17 Bionic Chip', '6.1" Super Retina XDR', '48MP Main Camera'],
    description: 'Experience the power and elegance of the iPhone 15 Pro. Featuring a new Action button, advanced camera system, and durable titanium design.',
    featured: true,
    condition: 'New',
  },
  {
    id: '4',
    name: 'OnePlus 11',
    price: 699,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'oneplus mobile',
    specs: ['16GB RAM', '256GB Storage', 'Snapdragon 8 Gen 2', '6.7" Fluid AMOLED', '50MP Hasselblad Camera'],
    description: 'The OnePlus 11 combines smooth performance with a premium camera experience. Fast charging and a vibrant display make it a joy to use.',
    condition: 'New',
  },
  {
    id: '5',
    name: 'Pixel 7a',
    price: 449,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'google pixel',
    specs: ['8GB RAM', '128GB Storage', 'Tensor G2 Chip', '6.1" OLED Display', '64MP Main Camera'],
    description: 'Get the best of Google at an affordable price. The Pixel 7a offers a great camera, helpful AI features, and all-day battery life.',
    featured: true,
    condition: 'Used - Like New',
  },
  {
    id: '6',
    name: 'Galaxy A54',
    price: 379,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'samsung galaxy',
    specs: ['8GB RAM', '128GB Storage', 'Exynos 1380', '6.4" Super AMOLED', '50MP Main Camera'],
    description: 'A great all-around mid-range phone with a beautiful display, capable camera, and long-lasting battery. Perfect for everyday use.',
    condition: 'Used - Good',
  },
  {
    id: '7',
    name: 'iPhone 13 Mini',
    price: 599,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'iphone mini',
    specs: ['4GB RAM', '128GB Storage', 'A15 Bionic Chip', '5.4" Super Retina XDR', '12MP Dual Camera'],
    description: 'Compact power. The iPhone 13 Mini packs incredible performance and an advanced dual-camera system into a pocket-friendly design.',
    condition: 'Used - Good',
  },
  {
    id: '8',
    name: 'Redmi Note 12 Pro',
    price: 299,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'xiaomi redmi',
    specs: ['8GB RAM', '256GB Storage', 'Dimensity 1080', '6.67" AMOLED Display', '50MP Main Camera'],
    description: 'Experience flagship-level features without breaking the bank. The Redmi Note 12 Pro offers a stunning display, powerful camera, and fast charging.',
    condition: 'Used - Fair',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

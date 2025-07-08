export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
  dataAiHint?: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah L.',
    avatar: '/female.jpg',
    dataAiHint: 'happy woman',
    rating: 5,
    quote: "The exchange process was unbelievably simple and fast. I got a great value for my old phone and the new one arrived in perfect condition. Highly recommend MobiSwap!"
  },
  {
    id: '2',
    name: 'David R.',
    avatar: '/male.jpg',
    dataAiHint: 'smiling man',
    rating: 5,
    quote: "I was hesitant to buy a used phone online, but MobiSwap exceeded my expectations. The 'Used - Like New' condition was accurate and the phone works flawlessly."
  },
  {
    id: '3',
    name: 'Jessica M.',
    avatar: '/female.jpg',
    dataAiHint: 'satisfied customer',
    rating: 4,
    quote: "Great selection and competitive prices. Customer support was very helpful in answering my questions before I made a purchase. The delivery was quick too."
  }
];

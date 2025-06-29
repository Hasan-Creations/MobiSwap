"use client";

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Review } from '@/data/reviews';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full w-full"
    >
      <Card className="group text-center glassmorphic rounded-2xl h-full flex flex-col shadow-lg">
        <CardContent className="p-8 flex flex-col items-center justify-center flex-grow">
          <div className="relative h-20 w-20 mb-4">
            <Image
              src={review.avatar}
              alt={review.name}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-accent/50"
              data-ai-hint={review.dataAiHint || "customer avatar"}
            />
          </div>
          <h3 className="font-bold font-headline text-lg text-foreground mb-2">{review.name}</h3>
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-5 w-5',
                  i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            "{review.quote}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

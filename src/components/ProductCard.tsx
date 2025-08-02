
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col overflow-hidden glassmorphic rounded-2xl h-full"
    >
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div className="w-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={400}
                className="object-contain w-full aspect-[4/3]"
                data-ai-hint={product.dataAiHint || "mobile phone"}
              />
            </motion.div>
          </div>
        </Link>
        {product.condition && (
          <Badge variant={product.condition === 'New' ? 'default' : 'secondary'} className="absolute top-3 right-3 shadow-lg">{product.condition}</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-base font-headline mb-1 leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-lg font-semibold text-primary mb-2">
          PKR {product.price.toLocaleString()}
        </CardDescription>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-grow">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
          <Link href={`/products/${product.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </motion.div>
  );
}

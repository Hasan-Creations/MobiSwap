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
      whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--accent) / 0.1)" }}
      className="group flex flex-col overflow-hidden glassmorphic rounded-2xl h-full"
    >
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div className="aspect-[4/3] w-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint={product.dataAiHint || "mobile phone"}
              />
            </motion.div>
          </div>
        </Link>
        {product.condition && (
          <Badge variant={product.condition === 'New' ? 'default' : 'secondary'} className="absolute top-3 right-3 shadow-lg">{product.condition}</Badge>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl font-headline mb-1 leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-2xl font-semibold text-primary mb-3">
          ${product.price.toFixed(2)}
        </CardDescription>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
          <Link href={`/products/${product.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </motion.div>
  );
}

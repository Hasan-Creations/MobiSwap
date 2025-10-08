"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingCart, Repeat, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const MotionCard = motion(Card);

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const { toast } = useToast();
  const id = typeof params.id === 'string' ? params.id : '';
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => router.push('/products')}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 hover:bg-primary/10 hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <MotionCard 
            className="overflow-hidden backdrop-blur-xl bg-background/40 border border-primary/20 shadow-2xl rounded-3xl sticky top-8"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                data-ai-hint={product.dataAiHint || "mobile phone detail"}
                priority
              />
              {product.condition && (
                <Badge 
                  variant={product.condition === 'New' ? 'default' : 'secondary'} 
                  className="absolute top-6 right-6 text-sm px-4 py-2 shadow-lg font-semibold"
                >
                  {product.condition}
                </Badge>
              )}
            </div>
          </MotionCard>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div 
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title & Price Section */}
          <div className="space-y-4 mb-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl lg:text-5xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff] leading-tight">
                {product.name}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-primary">
                PKR {product.price.toLocaleString()}
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </motion.div>

          {/* Specifications Card */}
          <motion.div variants={itemVariants} className="mb-8">
            <MotionCard 
              className="backdrop-blur-xl bg-background/40 border border-primary/20 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#ff9100] to-[#e62c6d] rounded-full"></span>
                  Key Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{spec}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </MotionCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <motion.div 
              whileHover={{ y: -3, scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="w-full h-14 bg-gradient-to-r from-[#ff9100] to-[#e62c6d] hover:opacity-90 text-white shadow-xl shadow-primary/30 text-lg font-semibold" 
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3, scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-semibold"
              >
                <Link href={`/exchange?model=${encodeURIComponent(product.name)}`}>
                  <Repeat className="mr-2 h-5 w-5" /> Exchange
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/50"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">✓</div>
              <p className="text-xs text-muted-foreground">Authentic Products</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">✓</div>
              <p className="text-xs text-muted-foreground">Quality Assured</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">✓</div>
              <p className="text-xs text-muted-foreground">Secure Payment</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
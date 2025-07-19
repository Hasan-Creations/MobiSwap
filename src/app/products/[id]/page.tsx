
"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ShoppingCart, Repeat, MessageSquare } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="outline" onClick={() => router.back()} className="mb-6 hover:bg-primary/10 hover:text-primary">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </motion.div>

      <MotionCard 
        className="overflow-hidden glassmorphic rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <motion.div 
            className="relative aspect-[4/3] md:aspect-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.dataAiHint || "mobile phone detail"}
              priority
            />
             {product.condition && (
              <Badge variant={product.condition === 'New' ? 'default' : 'secondary'} className="absolute top-4 left-4 text-sm px-3 py-1 shadow-lg">
                {product.condition}
              </Badge>
            )}
          </motion.div>

          <motion.div 
            className="p-6 md:p-10 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <CardHeader className="p-0 mb-4">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl lg:text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]">{product.name}</CardTitle>
              </motion.div>
            </CardHeader>

            <CardContent className="p-0 flex-grow">
              <motion.p variants={itemVariants} className="text-4xl font-semibold text-accent mb-6">PKR {product.price.toLocaleString()}</motion.p>
              
              <motion.p variants={itemVariants} className="text-foreground/80 leading-relaxed mb-6">{product.description}</motion.p>
              
              <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-3 font-headline">Key Specifications:</motion.h3>
              <motion.ul variants={itemVariants} className="list-disc list-inside space-y-1.5 text-foreground/90 mb-8">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </motion.ul>
            </CardContent>

            <Separator className="my-6 bg-white/10" />

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                   <motion.div className="w-full" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                      <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent className="glassmorphic">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Contact to Purchase</AlertDialogTitle>
                    <AlertDialogDescription>
                      To purchase the {product.name}, please contact us via WhatsApp or email.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:flex-col items-center gap-3">
                    <Button asChild className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
                      <a href={`https://wa.me/923292599756?text=I'm interested in buying the ${product.name}`} target="_blank" rel="noopener noreferrer">
                         <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                    <Button asChild className="w-full sm:w-auto" variant="outline">
                      <a href={`mailto:hasanayub106@gmail.com?subject=Inquiry about ${product.name}`}>
                         Email Us
                      </a>
                    </Button>
                    <AlertDialogCancel className="w-full sm:w-auto mt-2 sm:mt-0">Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <motion.div className="w-full" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary/10">
                  <Link href={`/exchange?model=${encodeURIComponent(product.name)}`}>
                    <Repeat className="mr-2 h-5 w-5" /> Request Exchange
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </MotionCard>
    </div>
  );
}

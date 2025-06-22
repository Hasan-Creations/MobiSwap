"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { IconTextCard } from '@/components/IconTextCard';
import { Truck, ShieldCheck, Repeat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  const heroItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, transformOrigin: 'top center' },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },      
    },
  };

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-24 md:py-40 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-headline mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            variants={heroItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find Your Next Mobile.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto"
            variants={heroItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover the latest smartphones, trade-in your old device, and get the best deals, all in one place.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={heroItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/products">Shop All Phones <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/exchange">Exchange Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Mobiles Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Mobiles
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProducts.map((product) => (
             <motion.div 
                key={product.id}
                variants={itemVariants}
              >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" asChild className="border-accent text-accent hover:bg-accent/10 shadow-md transition-transform transform hover:scale-105">
              <Link href="/products">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        className="py-16 glassmorphic rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-primary">Why Choose MobiSwap?</h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <IconTextCard
                icon={Truck}
                title="Fast Delivery"
                description="Get your new phone delivered to your doorstep quickly and efficiently."
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <IconTextCard
                icon={ShieldCheck}
                title="Secure Payments"
                description="Shop with confidence using our secure and encrypted payment gateway."
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <IconTextCard
                icon={Repeat}
                title="Easy Exchange"
                description="Trade-in your old phone for a new one with our hassle-free exchange process."
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* How it works / CTA section */}
      <motion.section 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">Ready to Upgrade?</h2>
        <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
          Whether you're buying, selling, or exchanging, MobiSwap makes it simple. Explore our collection or start your exchange today.
        </p>
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
              <Link href="/products">Explore Phones <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
      </motion.section>
    </div>
  );
}


"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { IconTextCard } from '@/components/IconTextCard';
import { Truck, ShieldCheck, Repeat, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { reviews } from '@/data/reviews';
import { ReviewCard } from '@/components/ReviewCard';
import { Brands } from '@/components/Brands';
import { PhoneFinder } from '@/components/PhoneFinder';

const HomePage = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, transformOrigin: 'top center' },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="space-y-12 md:space-y-20 -mt-12">
      {/* Hero Section */}
      <section className='pt-8'>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left mb-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]">
              Find Your Next Mobile.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto md:mx-0">
              Discover the latest smartphones, trade-in your old device, and get the best deals, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
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
            </div>
          </motion.div>
          <motion.div
            className="relative pt-12 aspect-[4/3] md:aspect-square"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.2 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/images/bg.webp"
              alt="A collection of modern smartphones"
              width={900}
              height={1000}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      <Brands />

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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
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
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-primary">Why Choose MobiSwap?</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false }}
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
            viewport={{ once: false }}
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
            viewport={{ once: false }}
          >
            <IconTextCard
              icon={Repeat}
              title="Easy Exchange"
              description="Trade-in your old phone for a new one with our hassle-free exchange process."
            />
          </motion.div>
        </div>
      </motion.section>

      {/* AI Phone Finder Section */}
      <PhoneFinder />

      {/* Customer Reviews Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-primary">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false }}
              className="flex cursor-pointer" 
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How it works / CTA section */}
      <motion.section
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
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
};

export default HomePage;

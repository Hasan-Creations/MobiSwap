"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { IconTextCard } from '@/components/IconTextCard';
import { Truck, ShieldCheck, Repeat, ArrowRight, Sparkles } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { reviews } from '@/data/reviews';
import { ReviewCard } from '@/components/ReviewCard';
import { Brands } from '@/components/Brands';
import { PhoneFinder } from '@/components/PhoneFinder';

const HomePage = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

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
      <section className='relative pt-8 pb-16 overflow-hidden w-screen left-1/2 right-1/2 -mx-[50vw]'>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#ff9100]/20 to-[#e62c6d]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-[#b25aff]/20 to-[#e62c6d]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-[#ff9100]/10 to-[#b25aff]/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff9100]/10 to-[#e62c6d]/10 border border-primary/20 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered Phone Finder</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff] animate-gradient">
                  Find Your
                </span>
                <br />
                <span className="text-foreground">Next Mobile</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Discover the latest smartphones, trade-in your old device, and get the best deals—all powered by AI.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-[#ff9100] to-[#e62c6d] hover:opacity-90 text-white shadow-2xl shadow-primary/50 transition-all duration-300 h-14 px-8 text-lg font-semibold"
                  >
                    <Link href="/products">
                      Shop All Phones
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 h-14 px-8 text-lg font-semibold"
                  >
                    <Link href="/exchange">Exchange Now</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] to-[#e62c6d]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    1000+
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
                </div>
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e62c6d] to-[#b25aff]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    50+
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-1">Phone Models</p>
                </div>
                <div className="text-center lg:text-left">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b25aff] to-[#ff9100]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                  >
                    24/7
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-1">Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Phone Display */}
            <motion.div
              className="relative flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-1/4 -left-8 w-16 h-16 border-2 border-primary/30 rounded-2xl"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-8 w-20 h-20 border-2 border-accent/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Main Phone Image Container with Hover Control */}
              <motion.div
                className="relative w-full max-w-lg"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover="hover"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff] rounded-full blur-3xl opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Phone Image */}
                <motion.div
                  className="relative z-10 cursor-pointer"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ perspective: "1000px" }}
                >
                  <Image
                    src="/images/bg.webp"
                    alt="Modern smartphones collection"
                    width={900}
                    height={1000}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Floating Card 1 - Left */}
                <motion.div
                  className="absolute top-20 -left-12 backdrop-blur-xl bg-background/60 border border-primary/20 rounded-2xl p-4 shadow-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: -30 }}
                  transition={{ delay: 0.00001, duration: 0.8 }}
                  variants={{
                    hover: {
                      x: -80,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff9100] to-[#e62c6d] flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Smart Match</p>
                      <p className="text-sm font-bold">98% Accurate</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 - Right */}
                <motion.div
                  className="absolute bottom-32 -right-12 backdrop-blur-xl bg-background/60 border border-accent/20 rounded-2xl p-4 shadow-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.00001, duration: 0.8 }}
                  variants={{
                    hover: {
                      x: 37,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e62c6d] to-[#b25aff] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Secure</p>
                      <p className="text-sm font-bold">100% Safe</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
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
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8"
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
              className="flex"
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
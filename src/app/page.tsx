import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { IconTextCard } from '@/components/IconTextCard';
import { Truck, ShieldCheck, Repeat, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-50">
           {/* You can add a subtle background pattern or image here if desired */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary">
            Find Your Next <span className="text-accent">Mobile</span>.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Discover the latest smartphones, trade-in your old device, and get the best deals, all in one place.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link href="/products">Shop All Phones <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link href="/exchange">Exchange Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Mobiles Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline text-primary">Featured Mobiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="border-accent text-accent hover:bg-accent/10 shadow-md">
            <Link href="/products">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-secondary/30 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-primary">Why Choose MobiSwap?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IconTextCard
              icon={Truck}
              title="Fast Delivery"
              description="Get your new phone delivered to your doorstep quickly and efficiently."
            />
            <IconTextCard
              icon={ShieldCheck}
              title="Secure Payments"
              description="Shop with confidence using our secure and encrypted payment gateway."
            />
            <IconTextCard
              icon={Repeat}
              title="Easy Exchange"
              description="Trade-in your old phone for a new one with our hassle-free exchange process."
            />
          </div>
        </div>
      </section>
      
      {/* How it works / CTA section */}
      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">Ready to Upgrade?</h2>
        <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
          Whether you're buying, selling, or exchanging, MobiSwap makes it simple. Explore our collection or start your exchange today.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 transform hover:scale-105">
          <Link href="/products">Explore Phones <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
}

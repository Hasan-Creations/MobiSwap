"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from 'framer-motion';

import { recommendPhones } from '@/ai/flows/recommend-phones-flow';
import { products, getProductById } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Wand2, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  query: z.string().min(10, {
    message: "Please describe what you're looking for in a bit more detail.",
  }),
});

export function PhoneFinder() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendedProducts([]); // Clear previous results

    try {
      const result = await recommendPhones({ query: values.query });
      if (result.recommendations.length > 0) {
        const foundProducts = result.recommendations
          .map(id => getProductById(id))
          .filter((p): p is (typeof products)[0] => p !== undefined);
        setRecommendedProducts(foundProducts);
      } else {
        toast({
          title: "No specific match found",
          description: "We couldn't find a perfect match. Here are some of our featured phones instead!",
          variant: "default",
        });
        // Show featured products as a fallback
        setRecommendedProducts(products.filter(p => p.featured).slice(0, 3));
      }
    } catch (error) {
      console.error("Error recommending phones:", error);
      toast({
        title: "An error occurred",
        description: "We couldn't get recommendations at this time. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 glassmorphic rounded-2xl">
      <div className="container mx-auto px-4">
        <CardHeader className="text-center p-0 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block p-3 bg-primary/20 rounded-full mb-2 mx-auto"
            >
                <Wand2 className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold font-headline text-primary"
            >
                AI-Powered Phone Finder
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
                Describe your perfect phone and let our AI do the rest.
            </motion.p>
        </CardHeader>
        
        <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 items-start">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                            placeholder="e.g., A phone under 150,000 PKR with a great camera" 
                                            {...field} 
                                            className="pl-10 h-12 text-base"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="pl-2" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full sm:w-auto h-12 bg-accent hover:bg-accent/90" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Wand2 className="mr-2 h-5 w-5" />
                        )}
                        Find My Phone
                    </Button>
                </form>
            </Form>
        </motion.div>

        <AnimatePresence>
          {recommendedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
                <h3 className="text-2xl font-bold text-center mb-8 font-headline text-primary">Our Recommendations For You</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {recommendedProducts.map((product, index) => (
                         <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

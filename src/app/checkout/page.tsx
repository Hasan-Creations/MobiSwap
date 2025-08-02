
"use client";

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock, ArrowRight, User, Mail, Home, MapPin } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

const checkoutSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'A detailed address is required'),
  city: z.string().min(3, 'City is required'),
  cardNumber: z.string().regex(/^(?:\d{4} ?){3}\d{4}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvc: z.string().regex(/^\d{3,4}$/, 'Invalid CVC'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const router = useRouter();
  const { toast } = useToast();
  const [_, setStoredOrders] = useLocalStorage<any[]>('mobiSwapOrders', []);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  if (cart.length === 0) {
    // Redirect if cart is empty
    if (typeof window !== 'undefined') {
        router.push('/products');
    }
    return null; 
  }

  const onSubmit = (data: CheckoutFormValues) => {
    const orderId = `MS-${Date.now()}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
      customer: {
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
      },
    };
    
    // In a real app, you would send this to a server.
    // For now, we save to localStorage.
    setStoredOrders((prevOrders) => [...prevOrders, newOrder]);
    
    toast({
      title: 'Order Placed!',
      description: `Your order #${orderId} has been successfully placed.`,
    });

    clearCart();
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold font-headline mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]">Checkout</h1>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Form Section */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle>Contact & Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Your full name" {...field} className="pl-9" /></div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="you@example.com" {...field} className="pl-9" /></div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <div className="relative"><Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="123 Main Street" {...field} className="pl-9" /></div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Karachi" {...field} className="pl-9" /></div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                   <CardDescription className="flex items-center gap-2"><Lock className="h-4 w-4"/> Your payment information is secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                                <div className="relative"><CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="0000 0000 0000 0000" {...field} className="pl-9" /></div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="cvc" render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="123" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Placing Order...' : `Pay PKR ${totalPrice.toLocaleString()}`}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glassmorphic sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md bg-white/5 aspect-square object-contain" />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p>PKR {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

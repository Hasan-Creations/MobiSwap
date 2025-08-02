
"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home } from 'lucide-react';
import { CartItem } from '@/context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [storedOrders] = useLocalStorage<Order[]>('mobiSwapOrders', []);

  const order = storedOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find the order details. It might have been cleared from your browser's storage.</p>
        <Button onClick={() => router.push('/')}>
          <Home className="mr-2 h-4 w-4" /> Go to Homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <Card className="max-w-3xl mx-auto glassmorphic">
          <CardHeader className="text-center items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bold font-headline">Thank You For Your Order!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">Your order has been placed successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-md text-center">
              <p className="text-muted-foreground">Order ID</p>
              <p className="font-mono text-xl font-semibold text-primary">{order.id}</p>
            </div>
            
            <div className="space-y-4">
               <h3 className="font-semibold text-lg">Order Summary</h3>
               {order.items.map(item => (
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
            
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Shipping to</h3>
                    <div className="text-muted-foreground">
                        <p>{order.customer.name}</p>
                        <p>{order.customer.address}</p>
                        <p>{order.customer.city}</p>
                    </div>
                </div>
                <div>
                     <h3 className="font-semibold text-lg mb-2">Order Total</h3>
                     <p className="font-bold text-2xl text-primary">PKR {order.total.toLocaleString()}</p>
                </div>
            </div>
            
            <Separator />

             <div className="text-center space-y-2">
                <p className="text-muted-foreground">A confirmation email has been sent to {order.customer.email}.</p>
                <p className="text-muted-foreground">Estimated delivery: 3-5 business days.</p>
             </div>


            <div className="text-center pt-4">
              <Button asChild>
                <Link href="/products">
                  <Home className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function OrderConfirmationLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="items-center text-center">
          <Skeleton className="h-16 w-16 rounded-full mb-4" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-12 w-1/2 mx-auto" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<OrderConfirmationLoading/>}>
            <OrderConfirmationContent />
        </Suspense>
    )
}


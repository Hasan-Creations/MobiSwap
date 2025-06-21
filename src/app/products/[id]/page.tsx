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

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.dataAiHint || "mobile phone detail"}
              priority
            />
             {product.condition && (
              <Badge variant={product.condition === 'New' ? 'default' : 'secondary'} className="absolute top-4 left-4 text-sm px-3 py-1">
                {product.condition}
              </Badge>
            )}
          </div>

          <div className="p-6 md:p-10 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl lg:text-4xl font-bold font-headline text-primary">{product.name}</CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex-grow">
              <p className="text-3xl font-semibold text-accent mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-foreground/80 leading-relaxed mb-6">{product.description}</p>
              
              <h3 className="text-xl font-semibold mb-3 font-headline">Key Specifications:</h3>
              <ul className="list-disc list-inside space-y-1.5 text-foreground/90 mb-8">
                {product.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </CardContent>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Contact to Purchase</AlertDialogTitle>
                    <AlertDialogDescription>
                      To purchase the {product.name}, please contact us via WhatsApp or email.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:flex-col items-center gap-3">
                    <Button asChild className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
                      <a href={`https://wa.me/1234567890?text=I'm interested in buying the ${product.name}`} target="_blank" rel="noopener noreferrer">
                         <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                    <Button asChild className="w-full sm:w-auto" variant="outline">
                      <a href={`mailto:sales@mobiswap.com?subject=Inquiry about ${product.name}`}>
                         Email Us
                      </a>
                    </Button>
                    <AlertDialogCancel className="w-full sm:w-auto mt-2 sm:mt-0">Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button size="lg" variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary/10">
                <Link href={`/exchange?model=${encodeURIComponent(product.name)}`}>
                  <Repeat className="mr-2 h-5 w-5" /> Request Exchange
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

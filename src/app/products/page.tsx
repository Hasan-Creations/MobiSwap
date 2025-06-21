"use client";

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products as allProducts, Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Search, ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'name-asc'
  const [conditionFilter, setConditionFilter] = useState('all'); // 'all', 'New', 'Used - Like New', etc.

  const conditions = ['all', 'New', 'Used - Like New', 'Used - Good', 'Used - Fair'];


  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (conditionFilter !== 'all') {
      filtered = filtered.filter(product => product.condition === conditionFilter);
    }
    
    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Basic featured sort: featured items first, then by name
        filtered.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, sortOrder, conditionFilter]);

  return (
    <div className="space-y-10">
      <section className="bg-primary/10 p-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-center mb-2 font-headline text-primary">Our Mobile Collection</h1>
        <p className="text-center text-lg text-foreground/80 mb-8">Find the perfect phone that fits your needs and budget.</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search phones..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search mobile phones"
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-auto" aria-label="Sort products by">
              <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-asc">Sort by: Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Sort by: Price (High to Low)</SelectItem>
              <SelectItem value="name-asc">Sort by: Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
           <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-full md:w-auto" aria-label="Filter by condition">
               <SelectValue placeholder="Filter by Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map(cond => (
                <SelectItem key={cond} value={cond}>{cond === 'all' ? 'All Conditions' : cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Phones Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
           <Button onClick={() => { setSearchTerm(''); setSortOrder('featured'); setConditionFilter('all');}} className="mt-4">Clear Filters</Button>
        </div>
      )}
    </div>
  );
}

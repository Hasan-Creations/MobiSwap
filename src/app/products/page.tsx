"use client";

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products as allProducts, Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Search, ListFilter, ArrowDown, XCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const INITIAL_LOAD_COUNT = 12;
const LOAD_MORE_COUNT = 8;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'name-asc'
  const [conditionFilter, setConditionFilter] = useState('all'); // 'all', 'New', 'Used - Like New', etc.
  const [companyFilter, setCompanyFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  const conditions = ['all', 'New', 'Used - Like New', 'Used - Good', 'Used - Fair'];
  const companies = ['all', ...Array.from(new Set(allProducts.map(p => p.company))).sort()];


  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (conditionFilter !== 'all') {
      filtered = filtered.filter(product => product.condition === conditionFilter);
    }
    
    if (companyFilter !== 'all') {
      filtered = filtered.filter(product => product.company === companyFilter);
    }

    const sorted = [...filtered];

    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        sorted.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
        break;
    }

    return sorted;
  }, [searchTerm, sortOrder, conditionFilter, companyFilter]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSortOrder('featured');
    setConditionFilter('all');
    setCompanyFilter('all');
    setVisibleCount(INITIAL_LOAD_COUNT);
  }
  
  const hasActiveFilters = searchTerm || sortOrder !== 'featured' || conditionFilter !== 'all' || companyFilter !== 'all';


  const visibleProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, visibleCount);
  }, [filteredAndSortedProducts, visibleCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.34, 1.56, 0.64, 1]
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
    <div className="space-y-10">
      <motion.section 
        className="glassmorphic p-6 sm:p-8 rounded-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2 font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Our Mobile Collection</h1>
        <p className="text-center text-lg text-foreground/80 mb-8">Find the perfect phone that fits your needs and budget.</p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search phones..."
              className="pl-10 w-full bg-background/80"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(INITIAL_LOAD_COUNT);
              }}
              aria-label="Search mobile phones"
            />
          </div>
          <Select value={sortOrder} onValueChange={(value) => { setSortOrder(value); setVisibleCount(INITIAL_LOAD_COUNT); }}>
            <SelectTrigger className="w-full md:w-auto bg-background/80" aria-label="Sort products by">
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
           <Select value={conditionFilter} onValueChange={(value) => { setConditionFilter(value); setVisibleCount(INITIAL_LOAD_COUNT); }}>
            <SelectTrigger className="w-full md:w-auto bg-background/80" aria-label="Filter by condition">
               <SelectValue placeholder="Filter by Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map(cond => (
                <SelectItem key={cond} value={cond}>{cond === 'all' ? 'All Conditions' : cond}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={companyFilter} onValueChange={(value) => { setCompanyFilter(value); setVisibleCount(INITIAL_LOAD_COUNT); }}>
            <SelectTrigger className="w-full md:w-auto bg-background/80" aria-label="Filter by company">
               <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(company => (
                <SelectItem key={company} value={company}>{company === 'all' ? 'All Companies' : company}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
         {hasActiveFilters && (
          <div className="text-center mt-4">
            <Button onClick={clearFilters} variant="ghost" className="text-accent hover:text-accent">
              <XCircle className="mr-2 h-4 w-4"/>
              Clear Filters
            </Button>
          </div>
        )}
      </motion.section>

      {visibleProducts.length > 0 ? (
        <>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            key={sortOrder + conditionFilter + companyFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {visibleProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          {visibleCount < filteredAndSortedProducts.length && (
            <div className="text-center mt-12">
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setVisibleCount(prev => prev + LOAD_MORE_COUNT)}
                  className="border-primary text-primary hover:bg-primary/10 transition-transform transform hover:scale-105"
                >
                  <ArrowDown className="mr-2 h-5 w-5" />
                  Load More Phones
                </Button>
              </motion.div>
            </div>
          )}
        </>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Phones Found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
           <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
        </motion.div>
      )}
    </div>
  );
}

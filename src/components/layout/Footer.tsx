"use client";

import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm text-foreground py-12 mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <Link href="/" className="flex items-center gap-2 mb-4 text-primary hover:text-primary/80 transition-colors">
            <Smartphone className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">MobiSwap</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your trusted partner for buying, selling, and exchanging mobile phones. Quality devices, unbeatable prices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-primary transition-all inline-block hover:translate-x-1">All Mobiles</Link></li>
            <li><Link href="/exchange" className="hover:text-primary transition-all inline-block hover:translate-x-1">Exchange Your Phone</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-all inline-block hover:translate-x-1">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-all inline-block hover:translate-x-1">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary transition-all inline-block hover:translate-x-1">Privacy Policy</Link></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">123 Tech Street, Silicon Valley, CA 94000</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <a href="tel:+1234567890" className="hover:text-primary transition-colors text-muted-foreground">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <a href="mailto:info@mobiswap.com" className="hover:text-primary transition-colors text-muted-foreground">info@mobiswap.com</a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-transform transform hover:scale-125 hover:-translate-y-1"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-transform transform hover:scale-125 hover:-translate-y-1"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-transform transform hover:scale-125 hover:-translate-y-1"><Instagram size={20} /></a>
          </div>
        </motion.div>
      </div>
      <div className="text-center mt-10 pt-8 border-t border-white/10 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MobiSwap. All rights reserved.</p>
      </div>
    </footer>
  );
}

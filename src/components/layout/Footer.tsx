import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4 text-primary hover:text-primary/80 transition-colors">
            <Smartphone className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">MobiSwap</span>
          </Link>
          <p className="text-sm">
            Your trusted partner for buying, selling, and exchanging mobile phones. Quality devices, unbeatable prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-primary transition-colors">All Mobiles</Link></li>
            <li><Link href="/exchange" className="hover:text-primary transition-colors">Exchange Your Phone</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>123 Tech Street, Silicon Valley, CA 94000</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:info@mobiswap.com" className="hover:text-primary transition-colors">info@mobiswap.com</a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="#" aria-label="Facebook" className="text-primary hover:text-primary/70 transition-colors"><Facebook size={24} /></a>
            <a href="#" aria-label="Twitter" className="text-primary hover:text-primary/70 transition-colors"><Twitter size={24} /></a>
            <a href="#" aria-label="Instagram" className="text-primary hover:text-primary/70 transition-colors"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 pt-8 border-t border-border text-sm">
        <p>&copy; {new Date().getFullYear()} MobiSwap. All rights reserved.</p>
      </div>
    </footer>
  );
}

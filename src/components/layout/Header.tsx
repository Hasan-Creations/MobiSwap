"use client";

import Link from 'next/link';
import { Smartphone, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/exchange', label: 'Exchange' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const ThemeToggleButton = ({ className, size = "icon" }: { className?: string, size?: "icon" | "default" }) => {
    if (!mounted) {
      // Render a placeholder or null during server-side rendering and initial client-side hydration
      if (size === "icon") {
        return <div className="h-10 w-10" />; // Placeholder for icon button
      }
      return <div className="h-10 w-full" />; // Placeholder for full-width button
    }
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={cn("rounded-full", className)}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  };
  
  const MobileMenuThemeToggle = () => {
    if (!mounted) return null;
    return (
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-lg"
          onClick={() => {
            toggleTheme();
            setIsMobileMenuOpen(false);
          }}
        >
          {theme === 'dark' ? (
            <Sun className="mr-2 h-5 w-5" />
          ) : (
            <Moon className="mr-2 h-5 w-5" />
          )}
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
    );
  }


  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Smartphone className="h-8 w-8" />
          <span className="text-2xl font-bold font-headline">MobiSwap</span>
        </Link>

        {/* Desktop Nav and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <nav className="flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild
                className={cn(
                  "text-foreground hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Trigger and inline Theme Toggle */}
        <div className="md:hidden flex items-center space-x-1">
          <ThemeToggleButton size="icon" className="h-9 w-9" /> {/* Smaller toggle for mobile header bar */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card p-6">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  <Smartphone className="h-7 w-7" />
                  <span className="text-xl font-bold font-headline">MobiSwap</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                     <Link 
                        href={item.href} 
                        className={cn(
                          "block py-2 px-3 rounded-md text-lg hover:bg-accent hover:text-accent-foreground transition-colors",
                          pathname === item.href ? "bg-accent text-accent-foreground font-semibold" : "text-foreground"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                       {item.label}
                     </Link>
                  </SheetClose>
                ))}
              </nav>
              <MobileMenuThemeToggle />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

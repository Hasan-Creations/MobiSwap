"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppIconSVG = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.423 5.576A10.016 10.016 0 0 0 12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.77.462 3.438 1.28 4.907L2 22l5.333-1.32a9.953 9.953 0 0 0 4.668 1.154h.001c5.523 0 10-4.477 10-10a9.987 9.987 0 0 0-3.578-7.258ZM12.001 20.133a8.12 8.12 0 0 1-4.14-.988l-.297-.175-3.085.765.779-3.018-.194-.31a8.136 8.136 0 0 1-1.25-4.407c0-4.41 3.588-8 8.001-8s8.001 3.59 8.001 8-3.588 8-8.001 8Zm4.46-5.405c-.244-.122-1.448-.713-1.673-.793-.225-.08-.388-.122-.552.122-.164.244-.633.793-.776.957-.143.164-.287.183-.531.061-.244-.122-1.025-.377-1.953-1.205-.722-.645-1.208-1.439-1.351-1.683-.143-.244-.015-.378.107-.499.107-.107.244-.287.366-.429.122-.143.164-.244.244-.407.081-.164.041-.307-.02-.429-.061-.122-.552-1.319-.755-1.806-.196-.487-.4-.419-.552-.426h-.287c-.164 0-.429.061-.653.307-.225.244-.859.835-.859 2.031s.88 2.355 1.002 2.519c.122.164 1.714 2.593 4.152 3.651.583.256 1.04.407 1.403.52 1.026.326 1.587.286 2.071.163.532-.143.859-.611.981-1.205.122-.594.122-1.096.081-1.205-.04-.122-.164-.183-.408-.306Z"
        />
    </svg>
);

export function FloatingActionButtons() {
    const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsScrollToTopVisible(true);
        } else {
            setIsScrollToTopVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    
    // The height of the "Scroll to Top" button (h-12 = 48px) plus a 16px gap.
    const whatsAppShift = -64; 

    return (
        // This container creates a positioning context and has a fixed height
        // to contain both buttons, preventing layout shifts from interfering with animations.
        <div className="fixed bottom-6 right-6 z-50 h-32 w-12">
            <motion.div
                className="absolute bottom-0 right-0"
                animate={{ y: isScrollToTopVisible ? whatsAppShift : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                 <a
                    href="https://wa.me/+923292599756?text=Hello!%20I'm%20interested%20in%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="rounded-full bg-green-500 text-white p-3 shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center h-12 w-12"
                >
                    <WhatsAppIconSVG />
                </a>
            </motion.div>

            <AnimatePresence>
                {isScrollToTopVisible && (
                    <motion.div
                        className="absolute bottom-0 right-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Button
                            onClick={scrollToTop}
                            size="icon"
                            variant="default"
                            className="rounded-full h-12 w-12 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                            aria-label="Go to top"
                        >
                            <ArrowUp className="h-6 w-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

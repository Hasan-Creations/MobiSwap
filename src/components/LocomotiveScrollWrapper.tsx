// components/LocomotiveScrollWrapper.tsx

"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
// IMPORTANT: You might need to adjust this path depending on your Next.js project structure
import 'locomotive-scroll/dist/locomotive-scroll.css'; 

interface ScrollWrapperProps {
  children: ReactNode;
}

const LocomotiveScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    // Basic check for browser environment
    if (typeof window === 'undefined' || !scrollRef.current) {
      return;
    }
    
    let scroll: LocomotiveScroll | null = null; 

    try {
      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.05, 
      });

      console.log('Locomotive Scroll initialized successfully.');
      
    } catch (error) {
      console.error('Error initializing Locomotive Scroll:', error);
    }

    return () => {
      if (scroll) {
        // Essential cleanup
        scroll.destroy(); 
      }
    };
  }, []);

  return (
    // The inner container where the scroll logic is applied
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default LocomotiveScrollWrapper;
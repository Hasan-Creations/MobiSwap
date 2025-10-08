// components/SmoothScrollLoader.tsx

'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// The ACTUAL Locomotive Scroll wrapper (LocomotiveScrollWrapper.tsx) 
// is dynamically imported here, with ssr: false.
const LocomotiveScrollWrapper = dynamic(
  () => import('./LocomotiveScrollWrapper'), // Ensure this path is correct
  { 
    ssr: false,
    // Optional: Add a loading component if you want something to show while JS loads
    // loading: () => <div className="loading-spinner">Loading...</div>
  }
);

interface SmoothScrollLoaderProps {
  children: ReactNode;
}

// This client component simply renders the dynamically loaded component
const SmoothScrollLoader: React.FC<SmoothScrollLoaderProps> = ({ children }) => {
  return (
    <LocomotiveScrollWrapper>
      {children}
    </LocomotiveScrollWrapper>
  );
};

export default SmoothScrollLoader;
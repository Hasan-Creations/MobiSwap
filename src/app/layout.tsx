import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "next-themes";
import { FloatingActionButtons } from '@/components/FloatingActionButtons';

export const metadata: Metadata = {
  title: 'MobiSwap - Buy, Sell, Exchange Mobile Phones',
  description: 'MobiSwap is your one-stop shop for buying new and pre-owned mobile phones, or exchanging your old device for a new one. Clean, professional, and mobile-friendly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="!scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-background" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff9100]/20 via-[#e62c6d]/10 to-background/0" />
          </div>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 z-10">
            {children}
          </main>
          <Footer />
          <FloatingActionButtons />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

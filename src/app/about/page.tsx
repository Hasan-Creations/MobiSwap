
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Target, Heart, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionCard = motion(Card);

const IconText = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <motion.div 
        className="text-center p-6 glassmorphic rounded-2xl h-full"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className="flex justify-center mb-4">
            <div className="p-4 bg-accent/20 rounded-full">
                <Icon className="h-8 w-8 text-accent" />
            </div>
        </div>
        <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </motion.div>
);

export default function AboutPage() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-20">
            {/* Hero Section */}
            <motion.section 
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    variants={itemVariants} 
                    className="inline-block p-4 bg-primary/20 rounded-full mb-4"
                >
                    <Building className="h-16 w-16 text-primary" />
                </motion.div>
                <motion.h1 
                    variants={itemVariants} 
                    className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]"
                >
                    About MobiSwap
                </motion.h1>
                <motion.p 
                    variants={itemVariants} 
                    className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto"
                >
                    Simplifying the way you buy, sell, and exchange mobile phones with a commitment to trust, quality, and innovation.
                </motion.p>
            </motion.section>

            {/* Our Mission Section */}
            <motion.section 
                className="grid md:grid-cols-2 gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <Image
                        src="/about.png"
                        alt="Diverse group of people using mobile phones"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-2xl object-cover"
                        data-ai-hint="team collaboration"
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-3">
                        <Target className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        In a world of endless choices and confusing jargon, finding the right mobile phone can be overwhelming. MobiSwap was born from a simple idea: to create a trustworthy, transparent, and user-friendly marketplace for everyone.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Our mission is to empower customers by providing clear information, fair value for their old devices, and a curated selection of quality phones. We leverage AI to make recommendations smarter and the entire process simpler, so you can spend less time searching and more time enjoying your new device.
                    </p>
                </motion.div>
            </motion.section>

            {/* Our Values Section */}
            <motion.section
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.2 }}
                 variants={containerVariants}
            >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12 font-headline">Our Core Values</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants}><IconText icon={Heart} title="Customer Trust" description="Your peace of mind is our top priority. We ensure every transaction is secure and every product is as described." /></motion.div>
                    <motion.div variants={itemVariants}><IconText icon={Lightbulb} title="Innovation" description="We use the latest technology, including AI, to create a smarter, more intuitive shopping experience." /></motion.div>
                    <motion.div variants={itemVariants}><IconText icon={Users} title="Community Focus" description="We are more than a marketplace; we're a community dedicated to helping people connect and upgrade with confidence." /></motion.div>
                </div>
            </motion.section>

            {/* Meet the Founder Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
            >
                 <h2 className="text-3xl font-bold text-center mb-12 font-headline">Meet the Founder</h2>
                 <MotionCard 
                    className="max-w-md mx-auto text-center glassmorphic"
                    whileHover={{ y: -5 }}
                >
                    <CardHeader className="items-center">
                        <Image
                            src="https://placehold.co/128x128.png"
                            alt="Founder's profile picture"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-primary/50 shadow-lg"
                            data-ai-hint="male portrait"
                        />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl font-headline">Hasan Ayub</CardTitle>
                        <p className="text-primary font-semibold mb-4">Creator of MobiSwap</p>
                        <p className="text-muted-foreground">
                            As a passionate technologist and problem-solver, I created MobiSwap to address the frustrations I saw in the mobile phone market. My goal is to build a platform that people can rely on for years to come.
                        </p>
                    </CardContent>
                 </MotionCard>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                className="text-center py-16"
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.3 }}
                 variants={itemVariants}
            >
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">Join the MobiSwap Community</h2>
                <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
                Ready to find your next phone? Explore our curated collection and experience the difference.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                    <Link href="/products">Explore Phones <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                </motion.div>
            </motion.section>
        </div>
    );
}

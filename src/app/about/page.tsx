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
        className="text-center p-6 glassmorphic border border-primary/20 rounded-2xl h-full"
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

    const finalSectionCards = {
        leftColumn: [
            {
                type: 'founder',
                name: 'Hasan Ayub',
                role: 'Creator of MobiSwap',
                image: '/images/user.png',
                description: 'As a passionate technologist...'
            },
            {
                type: 'cofounder',
                name: 'Azhaan Iqbal',
                role: 'Co-Creator of MobiSwap',
                image: '/images/user.png',
                description: 'Dedicated to building innovative solutions...'
            }
        ]
        ,
        rightColumn: [
            { type: 'stats' },
            { type: 'cta' }
        ]
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
                        src="/images/au.png"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <motion.div variants={itemVariants}><IconText icon={Heart} title="Customer Trust" description="Your peace of mind is our top priority. We ensure every transaction is secure and every product is as described." /></motion.div>
                    <motion.div variants={itemVariants}><IconText icon={Lightbulb} title="Innovation" description="We use the latest technology, including AI, to create a smarter, more intuitive shopping experience." /></motion.div>
                    <motion.div variants={itemVariants}><IconText icon={Users} title="Community Focus" description="We are more than a marketplace; we're a community dedicated to helping people connect and upgrade with confidence." /></motion.div>
                </div>
            </motion.section>

            {/* Final Section - Asymmetric Layout */}
            <motion.section
                className="grid grid-cols-1 md:grid-cols-[minmax(0,40%)_minmax(0,60%)] gap-8 md:items-stretch box-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
            >

                {/* Left Column - Founder & Co-Founder */}
                <div className="flex flex-col gap-8 h-full">
                    {finalSectionCards.leftColumn.map((card, index) => (
                        <motion.div
                            key={card.type}
                            className="flex-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: false }}
                        >
                            <MotionCard
                                className="w-full text-center rounded-2xl backdrop-blur-xl bg-background/40 border border-primary/20 shadow-xl flex flex-col h-full"
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <CardHeader className="items-center pt-8">
                                    <Image
                                        src={card.image}  // <-- dynamic now
                                        alt={`${card.name} profile picture`}
                                        width={128}
                                        height={128}
                                        className="rounded-full border-4 border-primary/50 shadow-lg"
                                    />
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow p-6">
                                    <CardTitle className="text-2xl font-headline">{card.name}</CardTitle>
                                    <p className="text-primary font-semibold mb-4">{card.role}</p>
                                    <p className="text-muted-foreground text-sm flex-grow">
                                        {card.description}
                                    </p>
                                </CardContent>
                            </MotionCard>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column - Stats & CTA */}
                <div className="flex flex-col gap-8 h-full">
                    {finalSectionCards.rightColumn.map((card, index) => (
                        <motion.div
                            key={card.type}
                            className="flex-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (index + 2) * 0.15 }}
                            viewport={{ once: false }}
                        >
                            {card.type === 'stats' && (
                                <motion.div
                                    className="relative flex flex-col justify-center p-12 rounded-3xl overflow-hidden h-full"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255,145,0,0.1) 0%, rgba(230,44,109,0.1) 50%, rgba(178,90,255,0.1) 100%)'
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                                    <div className="relative z-10">
                                        <motion.h2
                                            className="text-5xl md:text-6xl font-headline font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            OUR JOURNEY
                                        </motion.h2>
                                        <div className="space-y-6">
                                            {[
                                                { value: '2024', label: 'Year Founded' },
                                                { value: '1,000+', label: 'Happy Customers' },
                                                { value: '1,200+', label: 'Devices Handled' },
                                                { value: '5+', label: 'Team Members' }
                                            ].map((stat, idx) => (
                                                <motion.div
                                                    key={stat.label}
                                                    className="flex items-center gap-4 group"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    whileHover={{ x: 10 }}
                                                >
                                                    <motion.span
                                                        className="text-3xl text-primary font-bold"
                                                        whileHover={{ rotate: 180, scale: 1.2 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        ♦
                                                    </motion.span>
                                                    <div className="flex-1">
                                                        <span className="text-2xl md:text-3xl font-bold font-headline text-foreground group-hover:text-primary transition-colors duration-300">
                                                            {stat.value}
                                                        </span>
                                                        <span className="text-xl md:text-2xl text-muted-foreground ml-3">
                                                            — {stat.label}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {card.type === 'cta' && (
                                <MotionCard
                                    className="w-full rounded-2xl backdrop-blur-xl bg-background/40 border border-primary/20 shadow-xl flex flex-col items-center justify-center text-center p-8 h-full"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <CardHeader className="p-0 items-center">
                                        <div className="p-4 bg-primary/20 rounded-full mb-4">
                                            <Users className="h-10 w-10 text-primary" />
                                        </div>
                                        <CardTitle className="text-2xl font-headline text-primary">
                                            Join the Community
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-4 flex-grow flex flex-col justify-center">
                                        <p className="text-muted-foreground mb-6 text-sm">
                                            Ready to find your next phone? Explore our curated collection and experience the MobiSwap difference.
                                        </p>
                                    </CardContent>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-auto">
                                        <Button
                                            size="lg"
                                            asChild
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <Link href="/products">
                                                Explore Phones <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </MotionCard>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

        </div>
    );
}
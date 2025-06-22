"use client";

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface IconTextCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function IconTextCard({ icon: Icon, title, description }: IconTextCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="group text-center shadow-lg transition-all duration-300 rounded-lg bg-transparent border-none">
        <CardHeader className="flex flex-col items-center pb-2">
          <motion.div 
            className="p-4 bg-accent/20 rounded-full mb-4 transition-all duration-300 group-hover:bg-accent/30"
            whileHover={{ rotate: 15, scale: 1.2 }}
          >
            <Icon className="h-10 w-10 text-accent transition-transform duration-300" />
          </motion.div>
          <CardTitle className="text-xl font-headline text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters.").max(100, "Subject must be at most 100 characters.").optional(),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const MotionCard = motion(Card);

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data); // In a real app, send this to a server/email service
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default",
    });
    form.reset();
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
          <Mail className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or need support.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <MotionCard 
          className="bg-background/60 backdrop-blur-lg border border-white/10 shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center">
              <MessageSquare className="mr-3 h-7 w-7 text-accent" /> Send Us a Message
            </CardTitle>
            <CardDescription>Fill out the form and we'll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                       <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Your full name" {...field} className="pl-9 bg-background/80" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                           <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input type="email" placeholder="you@example.com" {...field} className="pl-9 bg-background/80" />
                         </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="What is your message about?" {...field} className="bg-background/80"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more..."
                          className="resize-none h-32 bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                   <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg shadow-lg shadow-accent/20" disabled={form.formState.isSubmitting}>
                     <Send className="mr-2 h-5 w-5" /> {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                   </Button>
                 </motion.div>
              </form>
            </Form>
          </CardContent>
        </MotionCard>

        <motion.div 
          className="space-y-8"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Card className="bg-background/60 backdrop-blur-lg border border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center">
                <Smartphone className="mr-3 h-7 w-7 text-accent" /> Business Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p className="text-muted-foreground">Suite # 202-203, Main Shahra-e-Faisal Karachi</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Phone Support</h4>
                  <a href="tel:03292599756" className="text-muted-foreground hover:text-primary transition-colors">03292599756</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Email Support</h4>
                  <a target="blank" href="mailto:hasanayub106@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">hasanayub106@gmail.com</a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="rounded-lg overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="/images/cu.jpg"
              alt="Contact us illustration"
              width={600}
              height={304}
              className="w-full h-[304px] object-cover"
              data-ai-hint="customer support team"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

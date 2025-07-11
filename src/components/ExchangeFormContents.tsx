
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, Smartphone, User, Mail, Phone, Wand2, Loader2, Sparkles } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { estimateDeviceValue, EstimateValueOutput } from "@/ai/flows/estimate-value-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const exchangeFormSchema = z.object({
  currentMobileModel: z.string().min(2, "Mobile model must be at least 2 characters.").max(50, "Mobile model must be at most 50 characters."),
  condition: z.enum(["Like New", "Good", "Fair", "Needs Repair"], {
    required_error: "Please select the condition of your mobile.",
  }),
  imei: z.string().optional(),
  storage: z.string().optional(),
  issues: z.string().max(300, "Description of issues must be at most 300 characters.").optional(),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "An image of your phone is required.",
    }),
  name: z.string().min(3, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
});

type ExchangeFormValues = z.infer<typeof exchangeFormSchema>;

const defaultValues: Partial<ExchangeFormValues> = {
  currentMobileModel: "",
  issues: "",
  name: "",
  phone: "",
  email: "",
};

const MotionCard = motion(Card);

export function ExchangeFormContents() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const modelFromQuery = searchParams.get('model');

  const form = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues,
  });

  const [isExchangeSubmitting, setIsExchangeSubmitting] = useState(false);
  const [isSellSubmitting, setIsSellSubmitting] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimateValueOutput | null>(null);

  useEffect(() => {
    if (modelFromQuery) {
      form.setValue('currentMobileModel', modelFromQuery);
    }
  }, [modelFromQuery, form]);

  const handleGetEstimate = async () => {
    const { currentMobileModel, condition, storage, issues } = form.getValues();
    if (!currentMobileModel || !condition) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone model and condition to get an estimate.",
        variant: "destructive",
      });
      return;
    }
    
    setIsEstimating(true);
    setEstimationResult(null);
    try {
      const result = await estimateDeviceValue({
        model: currentMobileModel,
        condition,
        storage,
        issues,
      });
      setEstimationResult(result);
    } catch (error) {
      console.error("Error estimating value:", error);
      toast({
        title: "Estimation Failed",
        description: "We couldn't generate an estimate at this time. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEstimating(false);
    }
  };

  const onExchangeSubmit = async (data: ExchangeFormValues) => {
    setIsExchangeSubmitting(true);
    console.log("Exchange Data:", data); 
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Exchange Request Submitted!",
      description: "We've received your exchange request. Our team will contact you shortly.",
      variant: "default",
    });
    form.reset();
    setEstimationResult(null);
    setIsExchangeSubmitting(false);
  };

  const onSellSubmit = async (data: ExchangeFormValues) => {
    setIsSellSubmitting(true);
    console.log("Sell Data:", data); 
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Sell Request Submitted!",
      description: "We've received your Sell request. Our team will contact you shortly.",
      variant: "default",
    });
    form.reset();
    setEstimationResult(null);
    setIsSellSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <MotionCard
        className="max-w-3xl mx-auto bg-background/60 backdrop-blur-lg border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CardHeader className="text-center">
          <div className="inline-block p-3 bg-primary/20 rounded-full mb-2 mx-auto">
            <Smartphone className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#ff9100] via-[#e62c6d] to-[#b25aff]">Exchange Or Sell Your Phone</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Fill out the form below to get an estimate for your old device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <fieldset className="space-y-6 border border-white/10 p-4 rounded-md relative">
                <legend className="text-lg font-semibold px-1 font-headline text-primary">Your Current Device</legend>
                <FormField
                  control={form.control}
                  name="currentMobileModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Mobile Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., iPhone 12 Pro Max" {...field} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/80">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Good">Good (Minor wear)</SelectItem>
                          <SelectItem value="Fair">Fair (Visible scratches/dents)</SelectItem>
                          <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Capacity (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 128GB, 256GB" {...field} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="issues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any Issues? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any known issues, e.g., cracked screen, battery problems."
                          className="resize-none bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="outline" onClick={handleGetEstimate} disabled={isEstimating} className="w-full border-accent text-accent hover:bg-accent/10">
                  {isEstimating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                  {isEstimating ? "Estimating..." : "Get AI Estimate"}
                </Button>

                <AnimatePresence>
                  {estimationResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Alert className="bg-accent/10 border-accent/20">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <AlertTitle className="text-accent font-bold">AI Valuation Result</AlertTitle>
                        <AlertDescription className="text-foreground">
                          <p className="font-semibold text-lg">
                            Estimated Value: PKR {estimationResult.estimatedValueLow.toLocaleString()} - {estimationResult.estimatedValueHigh.toLocaleString()}
                          </p>
                          <p className="text-sm mt-1">{estimationResult.explanation}</p>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </fieldset>

              <fieldset className="space-y-6 border border-white/10 p-4 rounded-md">
                <legend className="text-lg font-semibold px-1 font-headline text-primary">Upload & Contact Info</legend>
                 <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <UploadCloud className="h-5 w-5 text-muted-foreground" />
                          <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} className="border-dashed bg-background/80" />
                        </div>
                      </FormControl>
                      <FormDescription>An image is required to assess the condition.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className="pl-9 bg-background/80" />
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
              </fieldset>

              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onExchangeSubmit)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg shadow-lg shadow-primary/20"
                    disabled={isExchangeSubmitting || isSellSubmitting}
                  >
                    {isExchangeSubmitting ? "Submitting Exchange..." : "Submit Exchange Request"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSellSubmit)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg shadow-lg shadow-accent/20"
                    disabled={isSellSubmitting || isExchangeSubmitting}
                  >
                    {isSellSubmitting ? "Submitting Sell..." : "Submit Sell Request"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </Form>
        </CardContent>
      </MotionCard>
    </div>
  );
}

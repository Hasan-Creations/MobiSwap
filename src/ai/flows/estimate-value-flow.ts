'use server';
/**
 * @fileOverview An AI flow to estimate the value of a used mobile phone.
 *
 * - estimateDeviceValue - A function that provides a valuation for a mobile device.
 * - EstimateValueInput - The input type for the estimateDeviceValue function.
 * - EstimateValueOutput - The return type for the estimateDeviceValue function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the input schema for the flow
const EstimateValueInputSchema = z.object({
  model: z.string().describe('The model of the phone, e.g., "iPhone 13 Mini".'),
  condition: z.string().describe('The condition of the phone, e.g., "Good", "Like New".'),
  storage: z.string().optional().describe('The storage capacity, e.g., "128GB".'),
  issues: z.string().optional().describe('A description of any known issues or damage.'),
});
export type EstimateValueInput = z.infer<typeof EstimateValueInputSchema>;

// Define the output schema for the flow
const EstimateValueOutputSchema = z.object({
  estimatedValueLow: z.number().describe('The lower end of the estimated value range in PKR.'),
  estimatedValueHigh: z.number().describe('The higher end of the estimated value range in PKR.'),
  explanation: z.string().describe('A brief explanation of the valuation, mentioning factors considered.'),
});
export type EstimateValueOutput = z.infer<typeof EstimateValueOutputSchema>;


// The main exported function that the UI will call
export async function estimateDeviceValue(input: EstimateValueInput): Promise<EstimateValueOutput> {
  return estimateValueFlow(input);
}


const valuationPrompt = ai.definePrompt({
  name: 'estimateValuePrompt',
  input: { schema: EstimateValueInputSchema },
  output: { schema: EstimateValueOutputSchema },
  prompt: `You are an expert mobile phone valuator for MobiSwap in Pakistan. Your task is to provide a fair market value estimate in Pakistani Rupees (PKR) for a used device based on the details provided.

Consider the following factors:
- The phone's model and its typical market depreciation.
- The condition of the device. 'Like New' holds the most value, while 'Needs Repair' significantly lowers it.
- Any specific issues described, such as a cracked screen, battery problems, or other damage. These will lower the value.
- Storage capacity can slightly influence the price.

Provide a realistic low and high-end estimate for the device's value. Also, provide a short, one-sentence explanation for your valuation, mentioning the key factors that influenced the price.

Device Details:
- Model: {{{model}}}
- Condition: {{{condition}}}
- Storage: {{{storage}}}
- Described Issues: {{{issues}}}

Generate the valuation and explanation.
`,
});


const estimateValueFlow = ai.defineFlow(
  {
    name: 'estimateValueFlow',
    inputSchema: EstimateValueInputSchema,
    outputSchema: EstimateValueOutputSchema,
  },
  async (input) => {
    const { output } = await valuationPrompt(input);
    
    if (!output) {
      throw new Error("Could not generate a valuation for the device.");
    }

    return output;
  }
);

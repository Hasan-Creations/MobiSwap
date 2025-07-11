'use server';
/**
 * @fileOverview An AI flow to recommend mobile phones based on user queries.
 *
 * - recommendPhones - A function that recommends phones.
 * - RecommendPhonesInput - The input type for the recommendPhones function.
 * - RecommendPhonesOutput - The return type for the recommendPhones function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { products } from '@/data/products';

// Define the input schema for the flow
const RecommendPhonesInputSchema = z.object({
  query: z.string().describe('The user\'s request for a phone recommendation in natural language.'),
});
export type RecommendPhonesInput = z.infer<typeof RecommendPhonesInputSchema>;

// Define the output schema for the flow
const RecommendPhonesOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of product IDs that best match the user\'s query. Should contain at most 3 IDs.'),
});
export type RecommendPhonesOutput = z.infer<typeof RecommendPhonesOutputSchema>;


// The main exported function that the UI will call
export async function recommendPhones(input: RecommendPhonesInput): Promise<RecommendPhonesOutput> {
  return recommendPhonesFlow(input);
}


const recommendationPrompt = ai.definePrompt({
  name: 'recommendPhonePrompt',
  input: { schema: z.object({ query: z.string(), productsJson: z.string() }) },
  output: { schema: RecommendPhonesOutputSchema },
  prompt: `You are an expert mobile phone salesman at MobiSwap in Pakistan.
A customer has a request. Your goal is to recommend up to 3 phones from the available list that best fit the customer's needs.
Analyze the user's query and compare it against the provided list of products.
Consider all aspects of the query: price (in PKR), features (like camera quality, battery life, durability), intended use (like gaming, hiking, photography), and brand preferences.
Return only an array of the product IDs for your top recommendations. Do not return more than 3 IDs.

Customer Query: {{{query}}}

Available Products (JSON format with prices in PKR):
{{{productsJson}}}
`,
});


const recommendPhonesFlow = ai.defineFlow(
  {
    name: 'recommendPhonesFlow',
    inputSchema: RecommendPhonesInputSchema,
    outputSchema: RecommendPhonesOutputSchema,
  },
  async (input) => {
    // Serialize the products array to pass it into the prompt.
    const productsJson = JSON.stringify(products);

    const { output } = await recommendationPrompt({
        query: input.query,
        productsJson: productsJson,
    });
    
    // The prompt might hallucinate or fail. If output is null, return empty recommendations.
    if (!output) {
      return { recommendations: [] };
    }

    return output;
  }
);

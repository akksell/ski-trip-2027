import { z } from 'astro/zod';

export const priceSchema = z.object({
    amount: z.number(),
    currency: z.literal('USD'),
});


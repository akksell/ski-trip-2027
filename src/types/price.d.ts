import { z } from 'astro/zod';
import { priceSchema } from '../schemas/price';

export type Price = z.infer<typeof priceSchema>;


import { z } from 'astro/zod';

export const durationSchema = z.object({
    days: z.number().gte(0).optional(),
    hours: z.number().gte(0).lt(24).optional(),
    minutes: z.number().gte(0).lt(60),
});

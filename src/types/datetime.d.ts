import { z } from 'astro/zod';
import { durationSchema } from '../schemas/datetime';

export type Duration = z.infer<typeof durationSchema>;

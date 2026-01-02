import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { mountainSchema } from './schemas/mountains';

const mountains = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/data/mountains' }),
    schema: mountainSchema,
});

export const collections = { mountains };

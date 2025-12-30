import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import z from 'astro/zod';

const priceSchema = z.object({
    amount: z.number(),
    currency: z.literal('USD'),
});

const durationSchema = z.object({
    days: z.number().gte(0).optional(),
    hours: z.number().gte(0).lt(24).optional(),
    minutes: z.number().gte(0).lt(60),
});

const mountains = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/data/mountains' }),
    schema: z.object({
        resortName: z.string(),
        resortStyle: z.union([z.literal('resort'), z.literal('local')]),
        city: z.string(),
        state: z.string(),
        seasonPassType: z.union([
            z.literal('epic'),
            z.literal('ikon'),
            z.literal('other'),
        ]),
        mountainMetadata: z.object({
            trailmapImagePath: z.string(),
            baseElevation: z.object({
                value: z.number(),
                unit: z.union([z.literal('ft'), z.literal('m')]),
            }),
            summitElevation: z.object({
                value: z.number(),
                unit: z.union([z.literal('ft'), z.literal('m')]),
            }),
            totalTrailCount: z.number(),
            trailCounts: z.object({
                green: z.number(),
                blue: z.number(),
                black: z.number(),
                dblack: z.number(),
            }),
            totalLiftCount: z.number(),
        }),
        featureRankings: z.object({
            apres: z.number().gte(0).lte(3),
            townVibe: z.number().gte(0).lte(3),
            costliness: z.number().gte(0).lte(3),
            isolation: z.number().gte(0).lte(3)
        }),
        prosCons: z.object({
            pros: z.array(z.string()),
            cons: z.array(z.string()),
        }),
        costBreakdown: z.object({
            // TODO
        }),
        exampleLodgingOptions: z.array(z.object({
            accommodationURL: z.string(),
            searchParameters: z.object({
                journey: z.object({
                    arrival: z.date(),
                    departure: z.date(),
                }),
                numberOfGuests: z.number().gt(0),
                numberOfRooms: z.number().gt(0).optional()
            }),
            screenshotPath: z.string(),
            recordedPrice: z.object({
                recordedOnDate: z.date(),
                price: priceSchema,
            }),
        })),
    }),
});

export const collections = { mountains };

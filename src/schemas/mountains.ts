import { z } from 'astro/zod';
import { priceSchema } from './price';

export const seasonPassSchema = z.union([
    z.literal('epic'),
    z.literal('ikon'),
    z.literal('other'),
]);

export const resortStyleSchema = z.union([z.literal('resort'), z.literal('local')]);

export const unitSchema = z.union([
    z.literal('ft'),
    z.literal('m'),
    z.literal('acres'),
    z.literal('in'),
]);

export const lodgingOptionSchema = z.object({
    id: z.string(),
    accommodationURL: z.string(),
    thumbnail: z.string(),
    searchParameters: z.object({
        journey: z.object({
            arrival: z.string().date(),
            departure: z.string().date(),
        }),
        numberOfGuests: z.number().gt(0),
        numberOfRooms: z.number().gt(0).optional(),
    }),
    numberOfBeds: z.number().gt(0),
    numberOfBaths: z.number().gt(0),
    maxNumberGuests: z.number().gt(0),
    screenshotPath: z.string(),
    recordedPrice: z.object({
        recordedOnDate: z.string().date(),
        price: priceSchema,
    }),
});

export const mountainSchema = z.object({
    resortName: z.string(),
    resortStyle: resortStyleSchema,
    city: z.string(),
    state: z.string(),
    seasonPassType: seasonPassSchema,
    mountainMetadata: z.object({
        trailmapImagePath: z.string(),
        trailmapFullPDFPath: z.string(),
        baseElevation: z.object({
            value: z.number(),
            unit: unitSchema,
        }),
        summitElevation: z.object({
            value: z.number(),
            unit: unitSchema,
        }),
        skiableTerrainSize: z.object({
            value: z.number(),
            unit: unitSchema,
        }),
        totalTrailCount: z.number(),
        trailCounts: z.object({
            green: z.number(),
            blue: z.number(),
            black: z.number(),
            dblack: z.number(),
        }),
        totalLiftCount: z.number(),
        annualSnowfall: z.object({
            value: z.number(),
            unit: unitSchema,
        }),
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
    exampleLodgingOptions: z.array(lodgingOptionSchema),
});

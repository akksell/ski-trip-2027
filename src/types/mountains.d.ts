import { z } from 'astro/zod';
import {
    seasonPassSchema,
    resortStyleSchema,
    unitSchema,
    lodgingOptionSchema,
    mountainSchema
} from '../schemas/mountains.ts';

export type SeasonPass = z.infer<typeof seasonPassSchema>;

export type ResortStyle = z.infer<typeof resortStyleSchema>;

export type Unit = z.infer<typeof unitSchema>;

export type LodgingOption = z.infer<typeof lodgingOptionSchema>;

export type Mountain = z.infer<typeof mountainSchema>;

export type MountainCollection = {
    collection: string;
    digest: string;
    filePath: string;
    id: string;
    data: Mountain;
};

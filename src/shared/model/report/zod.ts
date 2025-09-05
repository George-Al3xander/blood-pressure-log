import { z } from "zod";

export const reportSchema = z.object({
    userId: z.string(),
    date: z.coerce.date(),
    sys: z.number(),
    dia: z.number(),
    pulse: z.number(),
    rating: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
    ]),
    notes: z.string(),
});

export type TReport = z.infer<typeof reportSchema>;

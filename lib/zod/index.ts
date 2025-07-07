import * as z from "zod";

export const fileSchema = z.object({
    file: z.object({
        name: z.string(),
        size: z.number().int().positive(),
        type: z.string()
    }),
    expiry: z.object({
        label: z.string(),
        value: z.string(),
        hours: z.union([z.literal(2), z.literal(5), z.literal(24)])
    })
})

export const completeSchema = z.object({
    shareId: z.string(),
    originalName: z.string(),
    fileSize: z.number(),
    mimeType: z.string(),
    expiresAt: z.string().datetime()
})

// Security constants
export const ALLOWED_HOURS = [2, 5, 24] as const;

// Convert hours to seconds with validation
export function hoursToSeconds(hours: number): number {
    if (!ALLOWED_HOURS.includes(hours as any)) {
        console.warn(`Invalid hours: ${hours}. Defaulting to 2 hours.`);
        return 7200; // 2 hours default
    }
    
    return hours * 3600; // Convert hours to seconds
}

import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    budget: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
    // Honeypot field - should be empty
    _honey: z.string().max(0, { message: "Spam detected" }).optional().or(z.literal(''))
});

export type ContactFormData = z.infer<typeof contactSchema>;

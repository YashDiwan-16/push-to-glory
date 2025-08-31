import { z } from "zod";

export const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

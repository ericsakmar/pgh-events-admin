import { z } from "zod";

const urlSchema = z.url("Must be a valid URL").optional().or(z.literal(""));

export const eventFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  eventLink: urlSchema,
  posterLink: urlSchema,
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

import { z } from "zod";

const urlSchema = z.url("Must be a valid URL").optional().or(z.literal(""));

export const eventFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  eventLink: urlSchema,
  poster: z.optional(
    z
      .custom<FileList>()
      .transform((list) => (list.length > 0 ? list[0] : null))
      .pipe(
        z.file().max(4_000_000).mime(["image/png", "image/jpeg", "image/webp"])
      )
  ),
});

export const createEventSchema = eventFormSchema.omit({ poster: true }).extend({
  posterLink: urlSchema,
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type CreateEventValues = z.infer<typeof createEventSchema>;

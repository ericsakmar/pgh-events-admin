"use server";

import { eventFormSchema, EventFormValues } from "@/lib/validation/eventSchema";
import prisma from "@/lib/prisma";

export async function createEvent(values: EventFormValues) {
  try {
    const validatedData = eventFormSchema.parse(values);

    const eventData = {
      name: validatedData.name,
      email: validatedData.email,
      location: validatedData.location,
      date: new Date(validatedData.date),
      eventLink: validatedData.eventLink || null,
      posterLink: validatedData.posterLink || null,
      approved: false,
    };

    const newEvent = await prisma.event.create({
      data: eventData,
    });

    return {
      success: true,
      message: "Event created successfully!",
      event: newEvent,
    };
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      // Zod validation error: Return specific errors
      const fieldErrors = error.issues.reduce(
        (acc: Record<string, string[]>, issue) => {
          if (issue.path.length > 0) {
            const path = issue.path[0];
            acc[path] = acc[path]
              ? [...acc[path], issue.message]
              : [issue.message];
          }
          return acc;
        },
        {}
      );
      return {
        success: false,
        message: "Validation failed",
        errors: fieldErrors,
      };
    }
    console.error("Server Action Error:", error);
    return { success: false, message: "An unexpected error occurred." };
  } finally {
    await prisma.$disconnect();
  }
}

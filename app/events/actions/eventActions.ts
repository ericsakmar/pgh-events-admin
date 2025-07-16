"use server";

import {
  createEventSchema,
  CreateEventValues,
} from "@/lib/validation/eventSchema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { utapi } from "@/lib/uploadthing";

export async function createEvent(values: CreateEventValues) {
  try {
    const validatedData = createEventSchema.parse(values);

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
      message: "Thanks! Your event should appear on the site within 24 hours.",
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

export async function updateEventApproval(
  eventId: string,
  approvedStatus: boolean
) {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { approved: approvedStatus },
    });

    revalidatePath("/events");

    return {
      success: true,
      message: "Event approval status updated successfully!",
      event: updatedEvent,
    };
  } catch (error) {
    console.error(`Error updating event ${eventId} approval:`, error);
    return {
      success: false,
      message: "Failed to update event approval status.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("id");
  if (eventId === null || typeof eventId !== "string") {
    return;
  }

  try {
    // deletes the event
    const deleted = await prisma.event.delete({
      where: { id: eventId },
    });

    // deletes the poster
    if (deleted.posterLink) {
      const fileKey = getFileKeyFromUrl(deleted.posterLink);
      if (fileKey) {
        await utapi.deleteFiles(fileKey);
      }
    }

    revalidatePath("/events");
  } catch (error) {
    console.error(`Error deleting event ${eventId}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

function getFileKeyFromUrl(url: string) {
  try {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname; // Gets "/f/<FILE_KEY>"
    const parts = pathname.split("/");
    // The FILE_KEY will be the last element if the format is consistent
    return parts[parts.length - 1];
  } catch (error) {
    console.error("Invalid URL:", error);
    return null; // Or throw an error, depending on your error handling
  }
}

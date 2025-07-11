// components/EventForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormValues } from "@/lib/validation/eventSchema";
import { createEvent } from "../actions/eventActions"; // Import the Server Action
// import { toast } from "react-hot-toast"; // Optional: for nicer notifications

const EventForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      const result = await createEvent(data);

      if (result.success) {
        // toast.success(result.message);
        // Optionally reset the form or redirect
        // reset(); // React Hook Form's reset method
      } else {
        // toast.error(result.message || "Failed to create event");
        if (result.errors) {
          // Manually set Zod errors back to React Hook Form
          Object.keys(result.errors).forEach((key) => {
            setError(key as keyof EventFormValues, {
              type: "server",
              message: result.errors![key][0], // Display the first error message
            });
          });
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      // toast.error("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Input fields as defined previously */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          id="location"
          {...register("location")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register("date")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="eventLink"
          className="block text-sm font-medium text-gray-700"
        >
          Event Link (optional)
        </label>
        <input
          id="eventLink"
          type="url"
          {...register("eventLink")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.eventLink && (
          <p className="text-red-500 text-xs mt-1">
            {errors.eventLink.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="posterLink"
          className="block text-sm font-medium text-gray-700"
        >
          Poster Link (optional)
        </label>
        <input
          id="posterLink"
          type="url"
          {...register("posterLink")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.posterLink && (
          <p className="text-red-500 text-xs mt-1">
            {errors.posterLink.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? "Submitting..." : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;

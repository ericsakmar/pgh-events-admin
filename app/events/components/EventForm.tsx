"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema, EventFormValues } from "@/lib/validation/eventSchema";
import { createEvent } from "../actions/eventActions";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const onSubmit = async (data: EventFormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const result = await createEvent(data);

      if (result.success) {
        setSuccessMessage(result.message);
        reset();
      } else {
        setErrorMessage(result.message || "Failed to create event");
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
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      {successMessage ? (
        <p className="mt-1 w-full bg-success rounded-md px-2 py-1 font-bold">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-1 w-full rounded-md bg-error text-light px-2 py-1 font-bold">
          {errorMessage}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label htmlFor="email" className="block text-light">
            Your email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="name" className="block text-light">
            Event name
          </label>
          <input
            id="name"
            {...register("name")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="location" className="block text-light">
            Location
          </label>
          <input
            id="location"
            {...register("location")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="date" className="block text-light">
            Date and time
          </label>
          <input
            id="date"
            type="datetime-local"
            {...register("date")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="eventLink" className="block text-light">
            Event link (optional)
          </label>
          <input
            id="eventLink"
            type="url"
            {...register("eventLink")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
          />
          {errors.eventLink && (
            <p className="text-red-500 text-xs mt-1">
              {errors.eventLink.message}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="posterLink" className="block text-light">
            Poster link (optional)
          </label>
          <input
            id="posterLink"
            type="url"
            {...register("posterLink")}
            className="block w-full border border-very-dark bg-white text-very-dark font-dark rounded-md p-2"
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
          className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-(--text-shadow) text-sm rounded-md text-very-dark font-bold bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </>
  );
};

export default EventForm;

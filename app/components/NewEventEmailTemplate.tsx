import { Event } from "../generated/prisma";

interface Props {
  event: Event;
}

export function NewEmailEventTemplate({ event }: Props) {
  return (
    <div>
      <h1>New Event Submission</h1>

      <p>
        {event.name} at {event.location} on {event.date.toISOString()}.
      </p>
    </div>
  );
}

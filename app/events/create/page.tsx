import EventForm from "../components/EventForm";

export default async function Home() {
  return (
    <div>
      <h1>hello public page for adding events</h1>
      <EventForm />
    </div>
  );
}

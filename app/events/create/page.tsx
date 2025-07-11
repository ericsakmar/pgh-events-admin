import EventForm from "../components/EventForm";

export default async function Home() {
  return (
    <div className="max-w-lg mx-auto my-10">
      <h1 className=" font-header text-[2rem]/[2rem] border-b-5 border-very-dark mb-4 text-shadow-(--text-shadow)">
        <span className="text-accent">pgh.events</span> - add an event
      </h1>
      <EventForm />
    </div>
  );
}

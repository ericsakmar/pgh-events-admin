import prisma from "@/lib/prisma";
import ApprovalToggle from "./components/ApprovalToggle";
import DeleteButton from "./components/DeleteButton";

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="max-w-full mx-4 my-10">
      <h1 className=" font-header text-[2rem]/[2rem] border-b-5 border-very-dark mb-4 text-shadow-(--text-shadow)">
        <span className="text-accent">pgh.events</span> - events
      </h1>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Submitted by</th>
            <th className="text-left">Event name</th>
            <th className="text-left">Location</th>
            <th className="text-left">Date and time</th>
            <th className="text-left">Link</th>
            <th className="text-left">Poster</th>
            <th className="text-center">Approved?</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="hover:bg-very-dark">
              <td className="p-1">{e.email}</td>
              <td className="p-1">{e.name}</td>
              <td className="p-1">{e.location}</td>
              <td className="p-1">{e.date.toLocaleString()}</td>
              <td className="p-1">
                {e.eventLink ? (
                  <a
                    href={e.eventLink}
                    target="_blank"
                    className="text-accent underline"
                  >
                    link
                  </a>
                ) : null}
              </td>
              <td className="p-1">
                {e.posterLink ? (
                  <a
                    href={e.posterLink}
                    target="_blank"
                    className="text-accent underline"
                  >
                    poster
                  </a>
                ) : null}
              </td>
              <td className="text-center p-1">
                <ApprovalToggle id={e.id} approved={e.approved} />
              </td>
              <td className="p-1">
                <DeleteButton id={e.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

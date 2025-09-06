"use client";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  type?: "solo" | "team";
  teamSize?: number;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition bg-white">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p className="text-gray-600">{event.date}</p>
        {event.type && (
          <div className="mt-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.type === "solo" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
              {event.type === "solo" ? "Solo Event" : `Team Event (${event.teamSize} members)`}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

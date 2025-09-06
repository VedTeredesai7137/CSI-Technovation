"use client";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition bg-white">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p className="text-gray-600">{event.date}</p>
      </div>
    </Link>
  );
}

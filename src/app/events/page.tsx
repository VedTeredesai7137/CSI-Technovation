import EventCard from "@/components/EventCard";

const events = [
  { id: "music-fest", title: "Music Festival 2025", date: "Sept 20" },
  { id: "tech-conf", title: "Tech Conference", date: "Oct 10" },
  { id: "food-carnival", title: "Food Carnival", date: "Nov 5" },
];

export default function EventsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Events</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

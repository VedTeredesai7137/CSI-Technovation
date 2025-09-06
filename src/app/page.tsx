import EventCard from "@/components/EventCard";

// Define events based on the TECHNOVation events
const events = [
  { id: "No_Escape", title: "No Escape (S.E only)", date: "Coming Soon", type: "solo" as const },
  { id: "Pitch_A_Thon", title: "Pitch-A-Thon", date: "Coming Soon", type: "solo" as const },
  { id: "AdVision", title: "AdVision", date: "Coming Soon", type: "solo" as const },

  { id: "Beat_the_bot", title: "Beat the Bot", date: "Coming Soon", type: "team" as const, teamSize: 2 },
  { id: "Game_Of_Controls", title: "Game Of Controls", date: "Coming Soon", type: "team" as const, teamSize: 3 },
  { id: "Cyber_Quest", title: "Cyber Quest", date: "Coming Soon", type: "team" as const, teamSize: 3 },
  { id: "Mystery_Unmasked", title: "Mystery Unmasked", date: "Coming Soon", type: "team" as const, teamSize: 3 },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

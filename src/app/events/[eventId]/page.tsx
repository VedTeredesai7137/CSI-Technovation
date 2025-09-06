import EventClient from "./EventClient";

// Define event types and team sizes
export const EVENTS_CONFIG: Record<string, { type: "solo" | "team"; teamSize?: number }> = {
  // Solo events
  "No_Escape": { type: "solo" },
  "Pitch_A_Thon": { type: "solo" },
  "AdVision": { type: "solo" },
  
  // Team events
  "Beat_the_bot": { type: "team", teamSize: 2 },
  "Game_Of_Controls": { type: "team", teamSize: 3 },
  "Cyber_Quest": { type: "team", teamSize: 3 },
  "Mystery_Unmasked": { type: "team", teamSize: 3 },
};

interface Props {
  params: { eventId: string };
}

export default async function EventPage({ params }: Props) {
  const { eventId } = params;
  
  // Get event configuration
  const eventConfig = EVENTS_CONFIG[eventId] || { type: "solo" };
  
  // Fetch capacity data
  let capacityData = null;
  try {
    // Use relative URL for server component
    const res = await fetch(`/api/events/${eventId}/capacity`, { cache: 'no-store' });
    if (res.ok) {
      capacityData = await res.json();
    }
  } catch (error) {
    console.error('Error fetching capacity:', error);
  }
  
  return <EventClient eventId={eventId} eventConfig={eventConfig} initialCapacity={capacityData} />;
}

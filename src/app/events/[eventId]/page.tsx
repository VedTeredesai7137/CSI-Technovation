import EventClient from "./EventClient";
import { EVENTS_CONFIG } from "@/lib/events";

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function EventPage({ params }: Props) {
  const { eventId } = await params;
  
  // Get event configuration
  const eventConfig = EVENTS_CONFIG[eventId] || { type: "solo" };
  
  // Fetch capacity data
  let capacityData = null;
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events/${eventId}/capacity`, { cache: 'no-store' });
    if (res.ok) {
      capacityData = await res.json();
    }
  } catch (error) {
    console.error('Error fetching capacity:', error);
  }
  
  return <EventClient eventId={eventId} eventConfig={eventConfig} initialCapacity={capacityData} />;
}

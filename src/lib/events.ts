// src/lib/events.ts

// Define event types and team sizes
export type EventType = "solo" | "team";

export interface EventConfig {
  type: EventType;
  teamSize?: number; // Only for team events
}

// Define events configuration
export const EVENTS_CONFIG: Record<string, EventConfig> = {
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

// Define event capacity limits
export const EVENT_LIMITS: Record<string, number> = {
  "No_Escape": 2,
  "Pitch_A_Thon": 100,
  "AdVision": 100,
  "Beat_the_bot": 50,
  "Game_Of_Controls": 50,
  "Cyber_Quest": 50,
  "Mystery_Unmasked": 50,
};

// Helper to get event limit (fallback to env or default 100)
export function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 100);
}

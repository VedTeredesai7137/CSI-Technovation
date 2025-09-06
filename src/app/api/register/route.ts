// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appendRowToSheet, getRowCountForSheet } from "@/lib/sheets";

// Define event types and team sizes
type EventType = "solo" | "team";

interface EventConfig {
  type: EventType;
  teamSize?: number; // Only for team events
}

// Define events configuration
const EVENTS_CONFIG: Record<string, EventConfig> = {
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
const EVENT_LIMITS: Record<string, number> = {
  "No_Escape": 100,
  "Pitch_A_Thon": 100,
  "AdVision": 100,
  "Beat_the_bot": 50,
  "Game_Of_Controls": 50,
  "Cyber_Quest": 50,
  "Mystery_Unmasked": 50,
};

// Helper to get event limit (fallback to env or default 100)
function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 100);
}

// Type for solo event registration request
interface SoloRegistrationRequest {
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  rollNumber?: string;
}

// Type for team event registration request
interface TeamRegistrationRequest {
  eventId: string;
  teamId: string;
  memberName: string;
  rollNumber: string;
  email: string;
  phone?: string;
}

// Type guard to determine if request is for a team event
function isTeamRegistration(body: any): body is TeamRegistrationRequest {
  return body.teamId !== undefined && body.memberName !== undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId } = body;

    console.log(`Processing registration request for event: ${eventId}`);

    // Validate event ID
    if (!eventId || !EVENTS_CONFIG[eventId]) {
      console.log(`Registration rejected: Invalid event ID: ${eventId}`);
      return NextResponse.json(
        { ok: false, message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.error("Configuration error: Missing SHEETS_SPREADSHEET_ID");
      throw new Error("Missing SHEETS_SPREADSHEET_ID in environment variables.");
    }

    // Get event configuration
    const eventConfig = EVENTS_CONFIG[eventId];
    const isTeamEvent = eventConfig.type === "team";

    // Validate request based on event type
    if (isTeamEvent && !isTeamRegistration(body)) {
      console.log(`Registration rejected: Team event requires teamId and memberName`);
      return NextResponse.json(
        { ok: false, message: "Team event requires teamId and memberName" },
        { status: 400 }
      );
    }

    if (!isTeamEvent && !body.name) {
      console.log(`Registration rejected: Solo event requires name`);
      return NextResponse.json(
        { ok: false, message: "Solo event requires name" },
        { status: 400 }
      );
    }

    // Common validation for both types
    if (!body.email) {
      console.log(`Registration rejected: Missing email`);
      return NextResponse.json(
        { ok: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Get registration limit
    const limit = getLimitFor(eventId);
    console.log(`Event ${eventId} has a limit of ${limit} registrations`);

    // Count existing registrations for this event
    const currentCount = await getRowCountForSheet(spreadsheetId, eventId);
    console.log(`Current registration count for ${eventId}: ${currentCount}/${limit}`);

    if (currentCount >= limit) {
      console.log(`Registration rejected: Event ${eventId} is full (${currentCount}/${limit})`);
      return NextResponse.json(
        { 
          ok: false, 
          message: "Registrations full",
        },
        { status: 409 }
      );
    }

    // Prepare registration row
    const timestamp = new Date().toISOString();
    
    if (isTeamEvent) {
      // Team event registration
      const { teamId, memberName, rollNumber, email, phone } = body as TeamRegistrationRequest;
      await appendRowToSheet(
        spreadsheetId,
        eventId,
        [timestamp, teamId, memberName, rollNumber || "", email, phone || ""]
      );
      console.log(`Team registration successful for team ${teamId}, member ${memberName} to event ${eventId}`);
    } else {
      // Solo event registration
      const { name, email, phone, rollNumber } = body as SoloRegistrationRequest;
      await appendRowToSheet(
        spreadsheetId,
        eventId,
        [timestamp, name, email, phone || "", rollNumber || ""]
      );
      console.log(`Solo registration successful for ${name} (${email}) to event ${eventId}`);
    }

    return NextResponse.json(
      { 
        ok: true, 
        message: "Registered successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

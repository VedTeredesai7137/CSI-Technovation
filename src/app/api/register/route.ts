// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appendRowToSheet, getRowCountForSheet, getTeamCountForSheet } from "@/lib/sheets";
import { EVENTS_CONFIG, getLimitFor } from "@/lib/events";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTeamRegistration(body: any): body is TeamRegistrationRequest {
  return body && typeof body === 'object' && 'teamId' in body && 'memberName' in body;
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
    let currentCount;
    if (isTeamEvent) {
      currentCount = await getTeamCountForSheet(spreadsheetId, eventId);
      console.log(`Current team count for ${eventId}: ${currentCount}/${limit}`);
    } else {
      currentCount = await getRowCountForSheet(spreadsheetId, eventId);
      console.log(`Current registration count for ${eventId}: ${currentCount}/${limit}`);
    }

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

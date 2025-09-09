// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appendRowToSheet, getRowCountForSheet, getTeamCountForSheet, getSheetNameForEvent } from "@/lib/sheets";
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

    // Email is now optional, no validation needed

    // Get the correct sheet name for this event
    const sheetName = getSheetNameForEvent(eventId);
    console.log(`Event ${eventId} maps to sheet: ${sheetName}`);

    // Get registration limit
    const limit = getLimitFor(eventId);
    console.log(`Event ${eventId} has a limit of ${limit} registrations`);

    // Count existing registrations for this event
    let currentCount;
    if (isTeamEvent) {
      currentCount = await getTeamCountForSheet(spreadsheetId, sheetName);
      console.log(`Current team count for ${eventId}: ${currentCount}/${limit}`);
    } else {
      currentCount = await getRowCountForSheet(spreadsheetId, sheetName);
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
      // Team event registration - parse comma-separated values
      const { teamId, memberName, rollNumber, email, phone } = body as TeamRegistrationRequest;
      
      // Parse comma-separated values into arrays
      const memberNames = memberName.split(',').map(name => name.trim());
      const memberRollNumbers = (rollNumber || "").split(',').map(roll => roll.trim());
      const memberPhones = (phone || "").split(',').map(phone => phone.trim());
      
      // Ensure all arrays have the same length by padding with empty strings
      const maxLength = Math.max(memberNames.length, memberRollNumbers.length, memberPhones.length);
      
      // Register each team member separately
      for (let i = 0; i < maxLength; i++) {
        const currentMemberName = memberNames[i] || "";
        const currentRollNumber = memberRollNumbers[i] || "";
        const currentPhone = memberPhones[i] || "";
        
        await appendRowToSheet(
          spreadsheetId,
          sheetName,
          [timestamp, teamId, currentMemberName, currentRollNumber, email, currentPhone]
        );
      }
      
      console.log(`Team registration successful for team ${teamId} with ${maxLength} members to event ${eventId} (sheet: ${sheetName})`);
    } else {
      // Solo event registration
      const { name, email, phone, rollNumber } = body as SoloRegistrationRequest;
      await appendRowToSheet(
        spreadsheetId,
        sheetName,
        [timestamp, name, email, phone || "", rollNumber || ""]
      );
      console.log(`Solo registration successful for ${name} (${email}) to event ${eventId} (sheet: ${sheetName})`);
    }

    // Retrieve the WhatsApp link from the event config
    const whatsappLink = EVENTS_CONFIG[eventId].whatsappLink;

    // Return the WhatsApp link in the response
    return NextResponse.json(
      {
        ok: true,
        message: "Registered successfully!",
        whatsappLink: whatsappLink,
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

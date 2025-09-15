// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appendRowToSheet, getRowCountForSheet, getTeamCountForSheet, getSheetNameForEvent } from "@/lib/sheets";
import { EVENTS_CONFIG, getLimitFor, REGISTRATIONS_OPEN } from "@/lib/events";

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
  return body && typeof body === "object" && "teamId" in body && "memberName" in body;
}

export async function POST(req: NextRequest) {
  try {
    // 🔒 Check if registrations are open
    if (!REGISTRATIONS_OPEN) {
      return NextResponse.json(
        { ok: false, message: "Registrations are now closed for all events." },
        { status: 403 }
      );
    }

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

    const eventConfig = EVENTS_CONFIG[eventId];
    const isTeamEvent = eventConfig.type === "team";

    // Validate body according to event type
    if (isTeamEvent && !isTeamRegistration(body)) {
      console.log("Registration rejected: Team event requires teamId and memberName");
      return NextResponse.json(
        { ok: false, message: "Team event requires teamId and memberName" },
        { status: 400 }
      );
    }

    if (!isTeamEvent && !body.name) {
      console.log("Registration rejected: Solo event requires name");
      return NextResponse.json(
        { ok: false, message: "Solo event requires name" },
        { status: 400 }
      );
    }

    // Map eventId to sheet name
    const sheetName = getSheetNameForEvent(eventId);
    console.log(`Event ${eventId} maps to sheet: ${sheetName}`);

    // Registration limit logic
    const limit = getLimitFor(eventId);
    console.log(`Event ${eventId} has a limit of ${limit} registrations`);

    let currentCount;
    if (isTeamEvent) {
      currentCount = await getTeamCountForSheet(spreadsheetId, sheetName);
      console.log(`Current team count: ${currentCount}/${limit}`);
    } else {
      currentCount = await getRowCountForSheet(spreadsheetId, sheetName);
      console.log(`Current registration count: ${currentCount}/${limit}`);
    }

    if (currentCount >= limit) {
      console.log(`Registration rejected: Event full`);
      return NextResponse.json(
        { ok: false, message: "Registrations full" },
        { status: 409 }
      );
    }

    const timestamp = new Date().toISOString();

    if (isTeamEvent) {
      // Register multiple members for a team
      const { teamId, memberName, rollNumber, email, phone } = body as TeamRegistrationRequest;
      const memberNames = memberName.split(",").map((n) => n.trim());
      const memberRollNumbers = (rollNumber || "").split(",").map((r) => r.trim());
      const memberPhones = (phone || "").split(",").map((p) => p.trim());

      const maxLength = Math.max(memberNames.length, memberRollNumbers.length, memberPhones.length);

      for (let i = 0; i < maxLength; i++) {
        await appendRowToSheet(spreadsheetId, sheetName, [
          timestamp,
          teamId,
          memberNames[i] || "",
          memberRollNumbers[i] || "",
          email,
          memberPhones[i] || "",
        ]);
      }
      console.log(`Team ${teamId} registered successfully with ${maxLength} members.`);
    } else {
      // Solo event registration
      const { name, email, phone, rollNumber } = body as SoloRegistrationRequest;
      await appendRowToSheet(spreadsheetId, sheetName, [
        timestamp,
        name,
        email,
        phone || "",
        rollNumber || "",
      ]);
      console.log(`Solo registration successful for ${name} (${email}).`);
    }

    // Return WhatsApp group link if present
    const whatsappLink = EVENTS_CONFIG[eventId].whatsappLink;

    return NextResponse.json(
      { ok: true, message: "Registered successfully!", whatsappLink },
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

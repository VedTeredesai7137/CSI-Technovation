// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { appendRegistrationRow, countRegistrationsByEvent } from "@/lib/sheets";

// Define event capacity limits
const EVENT_LIMITS: Record<string, number> = {
  "music-fest": 5,
  "tech-conf": 5,
  "food-carnival": 5,
};

// Helper to get event limit (fallback to env or default 100)
function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 5);
}

// Type for request body
interface RegistrationRequest {
  eventId: string;
  name: string;
  email: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<RegistrationRequest>;
    const { eventId, name, email, phone } = body;

    console.log(`Processing registration request for event: ${eventId}, name: ${name}`);

    // Validate required fields
    if (!eventId || !name || !email) {
      console.log("Registration rejected: Missing required fields");
      return NextResponse.json(
        { ok: false, message: "Missing required fields: eventId, name, email" },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.error("Configuration error: Missing SHEETS_SPREADSHEET_ID");
      throw new Error("Missing SHEETS_SPREADSHEET_ID in environment variables.");
    }

    // Get registration limit
    const limit = getLimitFor(eventId);
    console.log(`Event ${eventId} has a limit of ${limit} registrations`);

    // Count existing registrations for this event
    const currentCount = await countRegistrationsByEvent(spreadsheetId, eventId);
    console.log(`Current registration count for ${eventId}: ${currentCount}/${limit}`);

    if (currentCount >= limit) {
      console.log(`Registration rejected: Event ${eventId} is full (${currentCount}/${limit})`);
      return NextResponse.json(
        { 
          ok: false, 
          message: `Sorry, this event has reached its capacity limit of ${limit} registrations.`,
          currentCount,
          limit 
        },
        { status: 409 }
      );
    }

    // Prepare registration row
    const timestamp = new Date().toISOString();
    await appendRegistrationRow({
      spreadsheetId,
      timestamp,
      eventId,
      name,
      email,
      phone: phone ?? "",
    });

    console.log(`Registration successful for ${name} (${email}) to event ${eventId}`);
    return NextResponse.json(
      { 
        ok: true, 
        message: "Registered successfully!",
        currentCount: currentCount + 1,
        limit 
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

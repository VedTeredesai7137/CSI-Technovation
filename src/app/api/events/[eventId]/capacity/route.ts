// src/app/api/events/[eventId]/capacity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { countRegistrationsByEvent } from "@/lib/sheets";

// Define event capacity limits (same as in register API)
const EVENT_LIMITS: Record<string, number> = {
  "music-fest": 5,
  "tech-conf": 5,
  "food-carnival": 5,
};

// Helper to get event limit (fallback to env or default 100)
function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? 5;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = params;
    
    if (!eventId) {
      return NextResponse.json(
        { ok: false, message: "Missing eventId parameter" },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Missing SHEETS_SPREADSHEET_ID in environment variables.");
    }

    // Get registration limit
    const limit = getLimitFor(eventId);

    // Count existing registrations for this event
    const currentCount = await countRegistrationsByEvent(spreadsheetId, eventId);
    
    console.log(`Capacity API: Event ${eventId} has ${currentCount}/${limit} registrations`);

    return NextResponse.json(
      { 
        ok: true, 
        eventId,
        currentCount,
        limit,
        isFull: currentCount >= limit
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Capacity API error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
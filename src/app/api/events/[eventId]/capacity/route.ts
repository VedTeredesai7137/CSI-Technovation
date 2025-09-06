// src/app/api/events/[eventId]/capacity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRowCountForSheet } from "@/lib/sheets";

// Define event capacity limits (same as in register API)
const EVENT_LIMITS: Record<string, number> = {
  // Solo events
  "No_Escape": 100,
  "Pitch_A_Thon": 100,
  "AdVision": 100,
  
  // Team events
  "Beat_the_bot": 50,
  "Game_Of_Controls": 50,
  "Cyber_Quest": 50,
  "Mystery_Unmasked": 50,
};

// Helper to get event limit (fallback to env or default 100)
function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 100);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    // Await params to get eventId (Next.js 15 requirement)
    const { eventId } = await params;
    
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
    const currentCount = await getRowCountForSheet(spreadsheetId, eventId);
    
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
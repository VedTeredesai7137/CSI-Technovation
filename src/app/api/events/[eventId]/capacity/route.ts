// src/app/api/events/[eventId]/capacity/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRowCountForSheet, getTeamCountForSheet } from "@/lib/sheets";
import { EVENTS_CONFIG, getLimitFor } from "@/lib/events";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    // Await params to get eventId (Next.js 15 requirement)
    const { eventId } = await params;
    
    if (!eventId || !EVENTS_CONFIG[eventId]) {
      return NextResponse.json(
        { ok: false, message: "Invalid eventId parameter" },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Missing SHEETS_SPREADSHEET_ID in environment variables.");
    }

    // Get event configuration and registration limit
    const eventConfig = EVENTS_CONFIG[eventId];
    const limit = getLimitFor(eventId);

    // Count existing registrations for this event
    let currentCount;
    if (eventConfig.type === "team") {
      currentCount = await getTeamCountForSheet(spreadsheetId, eventId);
      console.log(`Capacity API: Event ${eventId} has ${currentCount}/${limit} teams`);
    } else {
      currentCount = await getRowCountForSheet(spreadsheetId, eventId);
      console.log(`Capacity API: Event ${eventId} has ${currentCount}/${limit} registrations`);
    }
    
    return NextResponse.json(
      {
        ok: true,
        eventId,
        registered: currentCount,
        limit,
        full: currentCount >= limit,
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
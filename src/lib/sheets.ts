// src/lib/sheets.ts
import { google } from "googleapis";

export function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\n/g, "\n")!;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function appendRegistrationRow(params: {
  spreadsheetId: string;
  timestamp: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
}) {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: params.spreadsheetId,
    range: "Registrations!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        params.timestamp,
        params.eventId,
        params.name,
        params.email,
        params.phone
      ]],
    },
  });
}

export async function countRegistrationsByEvent(spreadsheetId: string, eventId: string) {
  const sheets = getSheetsClient();
  console.log("Checking sheet:", spreadsheetId, "with range: Registrations!A:E");
  
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    // Fetch the entire sheet to be more robust
    range: "Registrations!A:E", 
  });

  const rows = res.data.values;

  // If there are no rows at all, return 0
  if (!rows || rows.length === 0) {
    console.log("No data found in sheet.");
    return 0;
  }

  // Skip the header row (the first row) and then count
  const dataRows = rows.slice(1);
  const targetEventId = eventId.trim().toLowerCase();

  const count = dataRows.filter(row => {
    // Ensure the row and the eventId cell are not empty
    return row && row[1] && row[1].toString().trim().toLowerCase() === targetEventId;
  }).length;
  
  console.log(`Total registrations for event ${eventId}: ${count}`);
  return count;
}
// src/lib/sheets.ts
import { google } from "googleapis";
import { sheets_v4 } from "googleapis";

/**
 * Maps eventId to the corresponding Google Sheet tab name
 * @param eventId The event ID from the application
 * @returns The corresponding sheet name in Google Sheets
 */
export function getSheetNameForEvent(eventId: string): string {
  const eventToSheetMapping: Record<string, string> = {
    // Original events
    "No_Escape": "No_Escape",
    "Pitch_A_Thon": "Pitch_A_Thon", 
    "AdVision": "AdVision",
    "Beat_the_bot": "Beat_the_bot",
    "Game_Of_Controls": "Game_Of_Controls",
    "Cyber_Quest": "Cyber_Quest",
    "Mystery_Unmasked": "Mystery_Unmasked",
    
    // New events with their corresponding sheet names from Google Sheets
    "DeepDive_GitHub": "DeepDive_Into_Github",
    "Cyber_Forensics": "Cyber_Forensics_And_Security", 
    "Canva_Workshop": "Fun_With_Canva",
    "Stock_Analysis": "The_Art_Of_Stock_Analysis",
    "Echoes_Rebounded": "Echoes_Rebounded",
    "Pixelcraft": "PixelCraft",
  };
  
  return eventToSheetMapping[eventId] || eventId;
}

/**
 * Creates and returns an authenticated Google Sheets client
 * @returns Google Sheets API client with JWT authentication
 */
export function getSheetsClient(): sheets_v4.Sheets {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    if (!clientEmail || !privateKey) {
      throw new Error("Missing required Google service account credentials");
    }
    
    // Replace escaped newlines with actual newlines
    const formattedKey = privateKey.replace(/\\n/g, "\n");
    
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    console.log("Google Sheets client initialized successfully");
    return sheets;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    throw error;
  }
}

/**
 * Gets the number of unique teams from a specific sheet
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheetName The name of the sheet/tab for a team event
 * @returns Promise resolving to the number of unique teams
 */
export async function getTeamCountForSheet(spreadsheetId: string, sheetName: string): Promise<number> {
  try {
    console.log(`Getting team count for sheet: ${sheetName}`);
    const sheets = getSheetsClient();
    
    // Get all values from column B (TeamID), starting from row 2
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!B2:B`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return 0;
    }

    // Use a Set to count unique team IDs
    const uniqueTeamIds = new Set(rows.map(row => row[0]));
    console.log(`Found ${uniqueTeamIds.size} unique teams in sheet: ${sheetName}`);
    return uniqueTeamIds.size;
  } catch (err) {
    // Type guard for Google API errors
    const isGaxiosError = (error: unknown): error is { code: number; errors: { message: string }[] } => {
      return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "errors" in error &&
        Array.isArray((error as { errors: unknown }).errors)
      );
    };

    if (isGaxiosError(err) && err.code === 400 && err.errors[0]?.message.includes("Unable to parse range")) {
      console.log(`Sheet ${sheetName} is likely empty. Returning 0 teams.`);
      return 0;
    }
    console.error(`Error getting team count for sheet ${sheetName}:`, err);
    throw err;
  }
}

/**
 * Gets the number of data rows in a specific sheet (excluding header row)
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheetName The name of the sheet/tab
 * @returns Promise resolving to the number of data rows
 */
export async function getRowCountForSheet(spreadsheetId: string, sheetName: string): Promise<number> {
  try {
    console.log(`Getting row count for sheet: ${sheetName}`);
    const sheets = getSheetsClient();
    
    // Get all values from A2:Z (excluding header row)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A2:Z`,
    });

    const rows = response.data.values || [];
    console.log(`Found ${rows.length} data rows in sheet: ${sheetName}`);
    return rows.length;
  } catch (error) {
    console.error(`Error getting row count for sheet ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Appends a row of data to a specific sheet
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheetName The name of the sheet/tab
 * @param row Array of values to append as a new row
 */
export async function appendRowToSheet(
  spreadsheetId: string, 
  sheetName: string, 
  row: (string | number)[]
): Promise<void> {
  try {
    console.log(`Appending row to sheet: ${sheetName}`);
    const sheets = getSheetsClient();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });
    
    console.log(`Successfully appended row to sheet: ${sheetName}`);
  } catch (error) {
    console.error(`Error appending row to sheet ${sheetName}:`, error);
    throw error;
  }
}
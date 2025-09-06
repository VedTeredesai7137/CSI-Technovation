# CSI TECHNOVation Event Registration System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) for managing TECHNOVation event registrations with Google Sheets integration.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Google Sheets API credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here with escaped newlines\n-----END PRIVATE KEY-----\n"
SHEETS_SPREADSHEET_ID=your-google-spreadsheet-id

# Optional: Default event registration limit if not specified in code
DEFAULT_EVENT_LIMIT=100
```

## Google Sheets Configuration

The application expects a single Google Spreadsheet with multiple tabs/sheets. Each event has its own tab with the tab name matching the `eventId`.

### Sheet Tab Names

Each event should have its own tab in the spreadsheet with the following names:

- Solo Events:
  - `No_Escape`
  - `Pitch_A_Thon`
  - `AdVision`

- Team Events:
  - `Beat_the_bot`
  - `Game_Of_Controls`
  - `Cyber_Quest`
  - `Mystery_Unmasked`

### Sheet Headers

#### Solo Event Tabs

Solo event tabs should have the following headers in row 1:

```
TimeStamp | Name | Email | Phone | RollNumber
```

#### Team Event Tabs

Team event tabs should have the following headers in row 1:

```
TimeStamp | TeamID | MemberName | RollNumber | Email | Phone
```

## API Usage

### Register Endpoint

POST `/api/register`

#### Solo Event Registration

```json
{
  "eventId": "No_Escape",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",  // Optional
  "rollNumber": "CSE123"   // Optional
}
```

#### Team Event Registration

```json
{
  "eventId": "Beat_the_bot",
  "teamId": "Team42",
  "memberName": "Jane Smith",
  "rollNumber": "CSE456",
  "email": "jane@example.com",
  "phone": "9876543210"  // Optional
}
```

### Response

Success (201):
```json
{
  "ok": true,
  "message": "Registered successfully!"
}
```

Registration Full (409):
```json
{
  "ok": false,
  "message": "Registrations full"
}
```

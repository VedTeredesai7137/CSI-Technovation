# CSI Technovation

Welcome to CSI Technovation – a Next.js based event registration platform where you can explore, register, and participate in a variety of events and workshops. This project is designed with a modular architecture that separates presentation, business logic, API handling, and external integrations. Below is an in-depth explanation of the project structure and file dependencies.

---

## Table of Contents

- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
  - [Frontend Components](#frontend-components)
  - [Event Details and Registration](#event-details-and-registration)
  - [Backend API and Registration Workflow](#backend-api-and-registration-workflow)
  - [Google Sheets Integration](#google-sheets-integration)
- [Configuration and Environment](#configuration-and-environment)
- [Getting Started](#getting-started)

---

## Project Structure

```
.env.local
.gitignore
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
tsconfig.json
.next/
public/
  └── [Image assets, e.g., Advision.png, Beat_the_bot.png, Deep_Dive_Into_Github.png]
src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── events/
  │       ├── [eventId]/
  │       │    ├── page.tsx                 // Dynamically renders event details using EventClient
  │       │    ├── EventClient.tsx          // Contains the registration form and event detail display
  │       │    └── capacity/route.ts        // API endpoint to fetch event capacity info
  │       └── api/
  │            └── register/route.ts         // API endpoint for handling registrations
  ├── components/
  │   ├── EventCard.tsx                    // Renders event card for homepage
  │   └── Navbar.tsx                       // Navigation bar component
  └── lib/
      ├── events.ts                        // Contains event configuration, details and capacity limits
      └── sheets.ts                        // Handles Google Sheets integration: reads, counts, appends rows
```

---

## How It Works

### Frontend Components

- **Homepage ([src/app/page.tsx](src/app/page.tsx))**  
  The home page displays available events and sponsors. It maps through the list of events and renders each one using the [`EventCard`](src/components/EventCard.tsx) component.

- **Event Card ([src/components/EventCard.tsx](src/components/EventCard.tsx))**  
  This file displays each event as a card with profile images, titles, and a quick summary. When clicked, it navigates to the event detail page.

- **Navbar ([src/components/Navbar.tsx](src/components/Navbar.tsx))**  
  The navigation bar is visible across pages and allows users to navigate to the home page or events page.

### Event Details and Registration

- **Event Detail Page ([src/app/events/[eventId]/page.tsx](src/app/events/[eventId]/page.tsx))**  
  When a user selects an event, this page is rendered dynamically. It extracts the `eventId` from the router parameters then:
  - Fetches registration capacity data via an API call to `/api/events/[eventId]/capacity`.
  - Retrieves the event configuration from [`EVENTS_CONFIG`](src/lib/events.ts) in the [`events.ts`](src/lib/events.ts) file.
  - Renders the event detail and registration form by including [`EventClient`](src/app/events/[eventId]/EventClient.tsx).

- **Event Client ([src/app/events/[eventId]/EventClient.tsx](src/app/events/[eventId]/EventClient.tsx))**  
  This is a client-side React component that handles two main tasks:
  - **Display:** It renders detailed information of the event (such as rounds, rules, and resources) using event details defined in [`EVENTS_CONFIG`](src/lib/events.ts).
  - **Registration:** It provides the registration form. Upon form submission, the data is sent to the registration API, and it handles local state update, form resets, and displays feedback messages.

### Backend API and Registration Workflow

- **Registration API ([src/app/api/register/route.ts](src/app/api/register/route.ts))**  
  This file handles POST requests when a user registers for an event:
  - It validates the request payload based on whether the event is a solo or team event.
  - It checks that the event exists using configurations from [`EVENTS_CONFIG`](src/lib/events.ts).
  - It verifies if the event is not full by comparing current registrations (or teams, for team events) against defined limits.
  - It uses helper functions from [`sheets.ts`](src/lib/sheets.ts) to append the registration data into the corresponding Google Sheet based on sheet mapping.
  - Finally, it returns a response which includes a WhatsApp group link from the event configuration once registration is successful.

- **Capacity API ([src/app/events/[eventId]/capacity/route.ts](src/app/events/[eventId]/capacity/route.ts))**  
  This endpoint checks and provides current registration counts:
  - It reads the corresponding Google Sheets tab (using a sheet name determined by [`getSheetNameForEvent`](src/lib/sheets.ts)) to calculate the number of registrations or unique teams.
  - This data is then consumed by [`EventClient`](src/app/events/[eventId]/EventClient.tsx) to disable further registrations if the event is full.

### Google Sheets Integration

- **Sheets Integration ([src/lib/sheets.ts](src/lib/sheets.ts))**  
  This file serves as the bridge to Google Sheets using the Google API:
  - It authenticates using credentials specified in `.env.local`.
  - It offers methods such as `getTeamCountForSheet`, `getRowCountForSheet`, and `appendRowToSheet`. These methods are used by both the capacity API and registration API to read registration data and append new data.
  - The mapping between event IDs and the actual sheet tab names is maintained here via the function `getSheetNameForEvent`.

- **Event Configuration ([src/lib/events.ts](src/lib/events.ts))**  
  This includes detailed metadata for events:
  - It defines how each event operates (solo or team), the limits for registrations (`EVENT_LIMITS`), and additional details like event rounds, duration, venue, and WhatsApp links.
  - Both the frontend (for display) and backend (for validating limits) reference this file.

---

## Configuration and Environment

- **Typescript Configuration ([tsconfig.json](tsconfig.json))**  
  Configured with strict settings, paths mapping (using `@/*` for `src/*`), and incremental compilation enabled.

- **ESLint Configuration ([eslint.config.mjs](eslint.config.mjs))**  
  Sets up ESLint rules along with Next.js plugin rules for consistent code style and error detection.

- **PostCSS/Tailwind ([postcss.config.mjs](postcss.config.mjs) & [src/app/globals.css](src/app/globals.css))**  
  These files manage CSS processing and styling using Tailwind CSS to provide an attractive UI.

- **Environment Variables ([.env.local](.env.local))**  
  Contains secrets and configuration keys such as:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - `SHEETS_SPREADSHEET_ID`
  - `DEFAULT_EVENT_LIMIT`

---

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

Your application will now be running on [http://localhost:3000](http://localhost:3000). Enjoy exploring CSI Technovation!

---

This README provides an in-depth look at how files like [`EventClient.tsx`](src/app/events/[eventId]/EventClient.tsx) depend on event configuration from [`events.ts`](src/lib/events.ts) and how the registration process is managed through API routes, connecting the backend to Google Sheets via functions in [`sheets.ts`](src/lib/sheets.ts).

Happy Coding!

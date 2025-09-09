// src/lib/events.ts

// Define event types and team sizes
export type EventType = "solo" | "team";

export interface EventConfig {
  type: EventType;
  teamSize?: number; // Only for team events
  whatsappLink?: string; // Add whatsappLink
  details?: EventDetails; // Add detailed event information
}

export interface EventDetails {
  title: string;
  teamSize: string;
  duration: string;
  venue: string;
  rounds: Array<{
    name: string;
    duration: string;
    description: string;
  }>;
  // Optional extra metadata used by UI
  subtitle?: string;
  rules?: string[];
  resources?: { label: string; href: string }[];
}

// Define events configuration
export const EVENTS_CONFIG: Record<string, EventConfig> = {
  // Solo events
  "No_Escape": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/group1",
    details: {
      title: "Backspace: No Escape",
      teamSize: "Individual",
      duration: "75–90 mins",
      venue: "Labs",
      rounds: [
        {
          name: "Round 1 – Guess the Output",
          duration: "25 mins",
          description: "Predict output of tricky code snippets (C/Java/Python). Tests logic & attention to detail."
        },
        {
          name: "Round 2 – Code Quiz",
          duration: "20–25 mins",
          description: "Buzzer/MCQ quiz on coding languages & concepts. Covers syntax, trivia, debugging logic."
        },
        {
          name: "Round 3 – No Backspace Challenge",
          duration: "30–35 mins",
          description: "Code with backspace disabled. Small coding problems → clean logic, no errors. Accuracy + speed matter."
        }
      ]
    }
  },
  "Pitch_A_Thon": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/group2",
    details: {
      title: "Pitch-A-Thon",
      teamSize: "Individual",
      duration: "Presentation-based",
      venue: "Presentation Hall",
      rounds: [
        {
          name: "Solution Design & Presentation",
          duration: "Full Event",
          description: "Participants will be given a problem statement and must design a solution in PPT format (like a mini-hackathon but presentation-based). They will present their ideas with slides covering problem, proposed solution, tech stack, and impact. Judging based on innovation, feasibility, and clarity of presentation."
        }
      ]
    }
  },
  "AdVision": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/group3",
    details: {
      title: "AdVision",
      teamSize: "Individual",
      duration: "Design-based",
      venue: "Design Lab",
      rounds: [
        {
          name: "Creative Billboard Design",
          duration: "Full Event",
          description: "Participants create an eye-catching billboard/poster design for a given theme (tech/product/social cause). They can use tools like Figma, Canva, Photoshop. Judging based on creativity, clarity of message, and visual appeal."
        }
      ]
    }
  },
  
  // Team events
  "Beat_the_bot": { 
    type: "team", 
    teamSize: 2, 
    whatsappLink: "https://chat.whatsapp.com/group4",
    details: {
      title: "Beat the Bot",
      teamSize: "Teams of 2",
      duration: "60–75 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Round 1 – AI Basics Quiz",
          duration: "15 mins",
          description: "MCQs + buzzer on AI fundamentals (easy-medium)."
        }
      ]
    }
  },
  "Game_Of_Controls": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/group5",
    details: {
      title: "Game of Controls",
      teamSize: "Teams of 3",
      duration: "90–120 mins",
      venue: "Labs",
      rounds: [
        {
          name: "Round 1 – Gaming Clash",
          duration: "40 mins",
          description: "Teams battle in mini esports matches (deadshot.io)."
        },
        {
          name: "Round 2 – Data Structures Reloaded",
          duration: "25 mins",
          description: "DSA + Gaming-themed quiz (buzzer/rapid fire). Mix of: Identify DSA from real-life gaming scenarios, Match DS with usage (heap = leaderboard, queue = matchmaking), Small dry run outputs. Individual participation from here."
        },
        {
          name: "Round 3 – TechQuest",
          duration: "25 mins",
          description: "Gaming + Tech quiz (hardware, AI in NPCs, graphics, algorithms in game design). Combination of MCQs + visual questions + rapid-fire."
        }
      ]
    }
  },
  "Cyber_Quest": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/group6",
    details: {
      title: "Cyber Quest",
      teamSize: "Teams of 3",
      duration: "90–120 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Round 1 – Tech Housie",
          duration: "30 mins",
          description: "Each team gets a Housie card, but with tech-related answers instead of numbers. Host asks random tech questions/riddles (example: 'What is LIFO?' → Stack). If the answer is on their card, they strike it off. First team to complete a row/column/full house shouts Bingo! and qualifies for next round."
        },
        {
          name: "Round 2 – The Encrypted Image",
          duration: "30 mins",
          description: "Winning teams from Round 1 scan a QR code. It reveals a puzzle/image with hidden answer. Solving it unlocks the next clue."
        },
        {
          name: "Round 3 – The Real-World Chase",
          duration: "30 mins",
          description: "Final clue directs teams to search for physical clues hidden in campus. The first team to reach the treasure, wins."
        }
      ]
    }
  },
  "Mystery_Unmasked": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/group7",
    details: {
      title: "Mystery Unmasked",
      teamSize: "Teams of 3",
      duration: "75–90 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Round 1 – Guess the Sound",
          duration: "20–25 mins",
          description: "Play short notification tones, startup sounds, theme songs, and gaming sounds. Teams must identify the correct app, brand, or game. Top teams qualify for the next round."
        },
        {
          name: "Round 2 – Who Am I?",
          duration: "25–30 mins",
          description: "One participant takes the role of the 'mystery personality' and can only ask Yes/No questions to the audience/teams. Teams can only respond with 'Yes' or 'No' to help the participant guess the identity. Example: 'Am I an entrepreneur?' → Yes. 'Did I drop out of Harvard?' → Yes. 'Did I co-found Microsoft?' → Yes → Bill Gates. The faster the correct guess, the more points awarded. Top 2 teams qualify for the finale."
        },
        {
          name: "Round 3 – The Imposter Draw",
          duration: "30–35 mins",
          description: "Final round with the top 2 teams. Each team has 4 members (if only 3, add a volunteer for balance). Host gives a secret word (tech item/object) to 3 members of the team. The 4th member is the Imposter → they don't know the word. One by one, each team member goes to the board and continues the drawing. The Imposter will try to blend in but will make mistakes since they don't know what to draw. The opponent team observes carefully and must identify the Imposter."
        }
      ]
    }
  },
};

// Define event capacity limits
export const EVENT_LIMITS: Record<string, number> = {
  "No_Escape": 2,
  "Pitch_A_Thon": 100,
  "AdVision": 100,
  "Beat_the_bot": 50,
  "Game_Of_Controls": 50,
  "Cyber_Quest": 50,
  "Mystery_Unmasked": 50,
};

// Helper to get event limit (fallback to env or default 100)
export function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 100);
}

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
  "Impel_Down_Trials": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/KHFJf3DjptPBny6MMXFFD6?mode=ems_wa_c",
    details: {
      title: "Backspace: No Escape",
      teamSize: "Individual",
      duration: "3:30 PM - 5:00PM",
      venue: "LAB 310,314",
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
  "The_Pirate_Pitch": { 
    type: "team", 
    teamSize: 5,
    whatsappLink: "https://chat.whatsapp.com/DdU7xNZuz23LcuAg8GWg5y?mode=ems_wa_c",
    details: {
      title: "The Pirate Pitch",
      teamSize: "Teams of 5",
      duration: "Deadline 17th September 2025, 10 p.m",
      venue: "Online",
      rounds: [
        {
          name: "Solution Design & Presentation",
          duration: "The Pirate's Pitch",
          description: "An online hackathonstyle event where participants receive a problem statement and prepare a solution in PPT format. Presentations must cover: Problem definition. Proposed solution. Tech stack used. Real-world impact. Judging is based on innovation, feasibility, and clarity of ideas. A template will be provided, and participants must use only that template."
        }
      ]
    }
  },
  "Wanted_Creation": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/L9jMW2ZAPiTBfRT4DeTIOA?mode=ems_wa_c",
    details: {
      title: "Wanted Creation",
      teamSize: "Individual",
      duration: "17th September 10pm",
      venue: "Online",
      rounds: [
        {
          name: "Wanted Creations",
          duration: "Full Event",
          description: "Participants create an eye-catching billboard/poster design for The theme can also explore Future of Sustainable Cities,encouraging creativity around eco-friendly urban living.. They can use tools like Figma, Canva, Photoshop. Judging based on creativity, clarity of message, and visual appeal. A Google submission form will be circulated. 17th September 2025, 10 p.m. would be the deadline"
        }
      ]
    }
  },
  
  // Team events
  "Buster_Call_Challenge": { 
    type: "team", 
    teamSize: 2, 
    whatsappLink: "https://chat.whatsapp.com/IEDynFi5elBBuGhaKQSLQa?mode=ems_wa_c",
    details: {
      title: "Buster Call Challenge",
      teamSize: "Teams of 2",
      duration: "3.30PM TO 5.00PM",
      venue: "303",
      rounds: [
        {
          name: "Round 1: AI Basics Quiz",
          duration: "20–25 mins",
          description: "A quick-fire buzzer/MCQ round testing participants’ grasp of AI fundamentals. The questions range from basic definitions to real-world AI applications."
        },
        {
          name: "Round 2: Search Algorithm Challenge",
          duration: "25–30 mins",
          description: "Each participant receives a problem statement — such as maze pathfinding, puzzlesolving, or state-space search. They must implement solutions using algorithms like BFS, DFS, UCS, or A*. The first teams to solve correctly qualify."
        },
        {
          name: "Round 3: Bot Charades",
          duration: "30–35 mins",
          description: "A fun AI-themed round where teams: Guess prompts from bizarre AI images. Solve quirky AI riddles. Identify Bollywood dialogues from AI translations. Scoring is based on accuracy, creativity, and audience votes"
        }
      ]
    }
  },
  "Grand_Line_Showdown": { 
    type: "team", 
    teamSize: 5, 
    whatsappLink: "https://chat.whatsapp.com/D12x79j95ETBkZMNUvFSwy?mode=ems_wa_c",
    details: {
      title: "Grand Line Showdown",
      teamSize: "Teams of 5",
      duration: "3.30PM TO 5:00PM",
      venue: "305",
      rounds: [
        {
          name: "Round 1 – Gaming Clash",
          duration: "40 mins",
          description: "Teams battle in mini esports matches (deadshot.io)."
        },
        {
          name: "Round 2 – Data Structures Reloaded",
          duration: "25 mins",
          description: "Now played individually, each member competes in a gaming-themed DSA quiz."
        },
        {
          name: "Round 3 – TechQuest",
          duration: "25 mins",
          description: "The finale combines gaming knowledge with technical concepts. Expect MCQs, visual questions, and rapid-fire rounds covering graphics, AI in NPCs, and algorithms used in game design."
        }
      ]
    }
  },
  "Log_Pose_Hunt": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/Cao6uV6uN5RKqlLSlqgump?mode=ems_wa_c",
    details: {
      title: "Log Pose Hunt",
      teamSize: "Teams of 3",
      duration: "3.00PM TO 4:30PM",
      venue: "303",
      rounds: [
        {
          name: "Round 1 – Tech Housie",
          duration: "30 mins",
          description: "Round 1: Tech Housie Teams receive housie cards filled with technical terms. The host asks riddles or questions Teams mark the answers on their cards. Completing a row, column, or full house qualifies them."
        },
        {
          name: "Round 2 – The Encrypted Image",
          duration: "30 mins",
          description: "Round 2: The Encrypted Image Winning teams scan a QR code to unlock a puzzle or hidden image. Solving it correctly reveals the next clue."
        },
        {
          name: "Round 3 – The Real-World Chase",
          duration: "30 mins",
          description: "Round 3: The Real-World Chase (30 mins) The final clue leads teams across campus, where hidden objects or codes await. The first team to solve and reach the treasure wins."
        }
      ]
    }
  },
  "Devil_Whisper": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/Lm8gRyWyFiq6JqYlZQ2XIp?mode=ems_wa_c",
    details: {
      title: "Devil's Whisper",
      teamSize: "Teams of 3",
      duration: "3.00PM TO 4:30PM",
      venue: "305",
      rounds: [
        {
          name: "Round 1 – Guess the Sound",
          duration: "20–25 mins",
          description: "Teams listen to short clips — from notification tones to startup jingles and game sound effects. Correct identification earns points."
        },
        {
          name: "Round 2 – Who Am I?",
          duration: "25–30 mins",
          description: "One member becomes the “mystery personality” and must guess their identity by asking only Yes/No questions."
        },
        {
          name: "Round 3 – The Imposter Draw",
          duration: "30–35 mins",
          description: "Teams sketch a given word on the board, but one member — the Imposter — doesn’t know the word. The Imposter tries to blend in while the opponent team observes to identify them."
        }
      ]
    }
  },
  
  // New technical workshops
  "DeepDive_GitHub": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/HoxJ8ZjLGkEGDjPriBvMQD?mode=ems_wa_c",
    details: {
      title: "DeepDive into GitHub – Akash Singh",
      teamSize: "Individual",
      duration: "1.30PM TO 3.30PM",
      venue: "305",
      rounds: [
        {
          name: "GitHub Workshop",
          duration: "1.30PM TO 3.30PM",
          description: "Version control is the backbone of every developer’s workflow, and GitHub is the most powerful collaboration platform in the coding world. In this workshop, participants will: Learn the basics of repositories, commits, branches, and pull requests. Explore real-world collaboration workflows used in open-source and industry projects. Understand how to manage projects efficiently using GitHub Issues and Actions. By the end, you’ll be able to confidently use GitHub for academic, personal, and professional projects"
        }
      ]
    }
  },
  "Cyber_Forensics": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/Bj1Du52kCovALTVJ1NnjSR?mode=ems_wa_c",
    details: {
      title: "Cyber Forensics & Security – Samuel Rodrigues",
      teamSize: "Individual",
      duration: "90 mins",
      venue: "Labs",
      rounds: [
        {
          name: "Security Workshop",
          duration: "90 mins",
          description: "An insightful workshop on cyber forensics, security principles, threat analysis, and digital investigation techniques."
        }
      ]
    }
  },
  
  // New non-technical workshops
  "Canva_Workshop": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/CQvTYhfUZCK60f3s1dfdRs?mode=ems_wa_c",
    details: {
      title: "Fun with Canva – Gargi Ubarhande",
      teamSize: "Individual",
      duration: "1:30PM - 3:00 PM",
      venue: "LAB 312",
      rounds: [
        {
          name: "Fun With Canva",
          duration: "1:30PM - 3:00 PM",
          description: "An interactive design workshop where participants learn to create posters, banners, and presentations with Canva Step-by-Step Guidance: From selecting templates to mastering color schemes and typography. Quick & Creative: Get design-ready skills in just minutes"
        }
      ]
    }
  },
  "Stock_Analysis": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/CsBgRDhIlWiL0jY2kCR4sC?mode=ems_wa_c",
    details: {
      title: "The Art of Stock Analysis – Divyam Navin",
      teamSize: "Individual",
      duration: "1:30 PM - 3:00 PM",
      venue: "305",
      rounds: [
        {
          name: "Finance Workshop",
          duration: "1:30 PM - 3:00 PM",
          description: "This finance-focused workshop introduces students to the basics of stock market analysis Learn to read stock charts, spot patterns, and evaluate company performance. Perfect for beginners curious about investing and financial literacy."
        }
      ]
    }
  },

  // Finance literacy solo event
  "Literacy_In_finance": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/J7iAv98PyV66m2eSJK0biH?mode=ems_wa_c",
    details: {
      title: "Literacy in Finance",
      teamSize: "Individual",
      duration: "1:30PM - 3:00PM",
      venue: "303",
      rounds: [
        {
          name: "Literacy_In_finance",
          duration: "1:30PM to 3:00PM",
          description: "Learn the basics of financial literacy to make informed money decisions. Gain insights into saving, budgeting, and investing effectively. Build skills for a secure and financially independent future."
        }
      ]
    }
  },
  
  // Non-technical events
  "Sea_Shanty_Session": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/EjP43bFQ94D036nCMXSpwf?mode=ems_wa_c",
    details: {
      title: "Sea Shanty Event",
      teamSize: "Individual",
      duration: "17th September 10pm",
      venue: "Online",
      rounds: [
        {
          name: "Literary Competition",
          duration: "17th September 10pm",
          description: "An online submission event to showcase your literary talent. Share your creativity through shayaris, poems, short stories, or any form of writing. A platform to express yourself freely and artistically."
        }
      ]
    }
  },
  "Thousand_Sunny_Design": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/LSIq7idXkOe3cgkSkG504w?mode=ems_wa_c",
    details: {
      title: "Thousand Sunny Designs",
      teamSize: "Individual",
      duration: "17th September 10pm",
      venue: "Online",
      rounds: [
        {
          name: "Thousand Sunny Design",
          duration: "17th September 10pm",
          description: "A UI/UX design event with no limit to topic or theme. Craft intuitive, user-friendly interfaces that balance aesthetics with functionality. Showcase your creativity, problem-solving, and design innovation "
        }
      ]
    }
  },
};

// Define event capacity limits
export const EVENT_LIMITS: Record<string, number> = {
  "Impel_Down_Trials": 40,
  "The_Pirate_Pitch": 14,
  "Wanted_Creation": 70,
  "Buster_Call_Challenge": 25,
  "Grand_Line_Showdown": 14,
  "Log_Pose_Hunt": 24,
  "Devil_Whisper": 24,

  "DeepDive_GitHub": 70,
  "Cyber_Forensics": 70,
  "Canva_Workshop": 35,
  "Stock_Analysis": 45,
  "Literacy_In_finance": 60,
  "Sea_Shanty_Session": 70,
  "Thousand_Sunny_Design": 70,
};

// Helper to get event limit (fallback to env or default 100)
export function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 50);
}

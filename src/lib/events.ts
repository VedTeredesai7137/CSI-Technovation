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
  "The_Pirate_Pitch": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/group2",
    details: {
      title: "The Pirate Pitch",
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
  "Wanted_Creation": { 
    type: "solo", 
    whatsappLink: "https://chat.whatsapp.com/group3",
    details: {
      title: "Wanted Creation",
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
  "Buster_Call_Challenge": { 
    type: "team", 
    teamSize: 2, 
    whatsappLink: "https://chat.whatsapp.com/group4",
    details: {
      title: "Buster Call Challenge",
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
  "Grand_Line_Showdown": { 
    type: "team", 
    teamSize: 5, 
    whatsappLink: "https://chat.whatsapp.com/group5",
    details: {
      title: "Grand Line Showdown",
      teamSize: "Teams of 5",
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
  "Log_Pose_Hunt": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/group6",
    details: {
      title: "Log Pose Hunt",
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
  "Devil_Whisper": { 
    type: "team", 
    teamSize: 3, 
    whatsappLink: "https://chat.whatsapp.com/group7",
    details: {
      title: "Devil's Whisper",
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
  
  // New technical workshops
  "DeepDive_GitHub": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group8",
    details: {
      title: "DeepDive into GitHub – Akash Singh",
      teamSize: "Individual",
      duration: "90 mins",
      venue: "Labs",
      rounds: [
        {
          name: "GitHub Workshop",
          duration: "90 mins",
          description: "A comprehensive workshop covering GitHub functionalities, version control, collaboration features, and best practices for developers."
        }
      ]
    }
  },
  "Cyber_Forensics": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group9",
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
    whatsappLink: "https://chat.whatsapp.com/group10",
    details: {
      title: "Fun with Canva – Gargi Ubarhande",
      teamSize: "Individual",
      duration: "60 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Design Workshop",
          duration: "60 mins",
          description: "Learn to create stunning designs with Canva. Master graphic design principles, templates, and creative tools for professional presentations."
        }
      ]
    }
  },
  "Stock_Analysis": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group11",
    details: {
      title: "The Art of Stock Analysis – Divyam Navin",
      teamSize: "Individual",
      duration: "90 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Finance Workshop",
          duration: "90 mins",
          description: "Understand the fundamentals and techniques of stock analysis, market trends, financial indicators, and investment strategies."
        }
      ]
    }
  },

  // Finance literacy solo event
  "Literacy_In_finance": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group14",
    details: {
      title: "Literacy in Finance",
      teamSize: "Individual",
      duration: "60–90 mins",
      venue: "Classroom",
      rounds: [
        {
          name: "Finance Basics & Practical Money Skills",
          duration: "Full Event",
          description: "Interactive session covering budgeting, banking, credit, and investment basics aimed at students."
        }
      ]
    }
  },
  
  // Non-technical events
  "Sea_Shanty_Session": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group12",
    details: {
      title: "Sea Shanty Event",
      teamSize: "Individual",
      duration: "Variable",
      venue: "Online",
      rounds: [
        {
          name: "Literary Competition",
          duration: "Variable",
          description: "An online literary event to showcase creative writing talents, poetry, storytelling, and literary expression."
        }
      ]
    }
  },
  "Thousand_Sunny_Design": {
    type: "solo",
    whatsappLink: "https://chat.whatsapp.com/group13",
    details: {
      title: "Thousand Sunny Designs",
      teamSize: "Individual",
      duration: "120 mins",
      venue: "Labs",
      rounds: [
        {
          name: "Design Challenge",
          duration: "120 mins",
          description: "A UI/UX design event to test creativity and design skills. Create user interfaces, wireframes, and interactive prototypes."
        }
      ]
    }
  },
};

// Define event capacity limits
export const EVENT_LIMITS: Record<string, number> = {
  "Impel_Down_Trials": 2,
  "The_Pirate_Pitch": 100,
  "Wanted_Creation": 100,
  "Buster_Call_Challenge": 50,
  "Grand_Line_Showdown": 50,
  "Log_Pose_Hunt": 50,
  "Devil_Whisper": 50,
  // New events
  "DeepDive_GitHub": 30,
  "Cyber_Forensics": 30,
  "Canva_Workshop": 40,
  "Stock_Analysis": 40,
  "Literacy_In_finance": 60,
  "Sea_Shanty_Session": 100,
  "Thousand_Sunny_Design": 25,
};

// Helper to get event limit (fallback to env or default 100)
export function getLimitFor(eventId: string): number {
  return EVENT_LIMITS[eventId] ?? Number(process.env.DEFAULT_EVENT_LIMIT ?? 100);
}

import React from "react";
import EventCard from "@/components/EventCard";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  type: "solo" | "team";
  teamSize?: number;
  imageUrl: string;
}


// Event images mapping (all square 1:1 from Unsplash)
const eventImages: Record<string, string> = {
  Impel_Down_Trials: "/Impel_Down_Trials.png",
  The_Pirate_Pitch: "/The_Pirate_Speech.jpg",
  Wanted_Creation: "/Wanted_creation.png",
  Buster_Call_Challenge: "/Buster_Call_Challenge.jpg",
  Grand_Line_Showdown: "/Grand_Line_Showdown.jpg",
  Log_Pose_Hunt: "/Log_Pose_hunt.jpg",
  Devil_Whisper: "/Devil's_whisper.jpg",
  Literacy_In_finance: "/Literacy_In_finance.jpg",

  // New events
  DeepDive_GitHub: "/DeepDive_Into_Github.jpg", // coding
  Cyber_Forensics: "/Cyber_Forensic_And_Security.jpg", // cybersecurity
  Canva_Workshop: "/Fun_With_Canva.jpg", // design
  Stock_Analysis: "/The_Art_Of_Stock_Analysis.jpg", // finance
  Sea_Shanty_Session: "/Sea_Shanny_Session.jpg", // writing
  Thousand_Sunny_Design: "/Thousand_Sunny_Design.jpg", // UI design
};

const events: Event[] = [
  // Original events
  { id: "Impel_Down_Trials", title: "Impel Down Trials (S.E only)", date: "Coming Soon", type: "solo", imageUrl: eventImages["Impel_Down_Trials"] },
  { id: "The_Pirate_Pitch", title: "The Pirate Pitch", date: "Coming Soon", type: "solo", imageUrl: eventImages["The_Pirate_Pitch"] },
  { id: "Wanted_Creation", title: "Wanted Creations", date: "Coming Soon", type: "solo", imageUrl: eventImages["Wanted_Creation"] },
  { id: "Buster_Call_Challenge", title: "Beat the Bot", date: "Coming Soon", type: "team", teamSize: 2, imageUrl: eventImages["Buster_Call_Challenge"] },
  { id: "Grand_Line_Showdown", title: "Grand Line Showdown", date: "Coming Soon", type: "team", teamSize: 5, imageUrl: eventImages["Grand_Line_Showdown"] },
  { id: "Log_Pose_Hunt", title: "Log Pose Hunt", date: "Coming Soon", type: "team", teamSize: 3, imageUrl: eventImages["Log_Pose_Hunt"] },
  { id: "Devil_Whisper", title: "Devil's Whisper", date: "Coming Soon", type: "team", teamSize: 3, imageUrl: eventImages["Devil_Whisper"] },

  // New technical workshops
  { id: "DeepDive_GitHub", title: "DeepDive into GitHub ", date: "Coming Soon", type: "solo", imageUrl: eventImages["DeepDive_GitHub"] },
  { id: "Cyber_Forensics", title: "Cyber Forensics & Security", date: "Coming Soon", type: "solo", imageUrl: eventImages["Cyber_Forensics"] },

  // New non-technical workshops
  { id: "Canva_Workshop", title: "Fun with Canva", date: "Coming Soon", type: "solo", imageUrl: eventImages["Canva_Workshop"] },
  { id: "Stock_Analysis", title: "The Art of Stock Analysis", date: "Coming Soon", type: "solo", imageUrl: eventImages["Stock_Analysis"] },
  { id: "Literacy_In_finance", title: "Literacy in Finance", date: "Coming Soon", type: "solo", imageUrl: eventImages["Literacy_In_finance"] },

  // Non-technical events
  { id: "Sea_Shanty_Session", title: "Sea Shanty Session", date: "Coming Soon", type: "solo", imageUrl: eventImages["Sea_Shanty_Session"] },
  { id: "Thousand_Sunny_Design", title: "Thousand Sunny Design", date: "Coming Soon", type: "solo", imageUrl: eventImages["Thousand_Sunny_Design"] },
];



export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Web Banner */}
        <img
          src="/TechnovationWebDevBanner.png"
          alt="TECHNOVATION"
          className="hidden md:block w-full object-cover h-[80vh]"
        />
        {/* Mobile Banner */}
        <img
          src="/TechnovationMobileDevBanner.png"
          alt="TECHNOVATION Mobile"
          className="block md:hidden w-full object-cover"
        />
      </section>

      {/* Events Section */}
      <section id="events" className="py-12 sm:py-16 md:py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
            Explore the <span className="text-yellow-400">Events</span>
          </h2>
          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {events.map((event: Event) => (
              <div key={event.id} className="w-full max-w-sm">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">CSI IT</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Embarked on the journey of technology and beyond
              </p>
            </div>
            {/* Empty div for spacing, pushing 'Follow Us' to the right on larger screens */}
            <div className="hidden md:block"></div>

            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4 sm:space-x-6">
                <a href="https://www.instagram.com/csiitfcrit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://www.linkedin.com/company/csi-it-fcrit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="text-center text-xs sm:text-sm text-gray-500 px-4">
            © 2025 CSI IT Technovation — All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

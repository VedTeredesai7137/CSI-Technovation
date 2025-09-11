"use client";

import React, { useState } from "react";
import EventCard from "@/components/EventCard";

interface Event {
  id: string;
  title: string;
  date: string;
  type: "solo" | "team";
  teamSize?: number;
  imageUrl: string;
  category: "offline" | "workshop" | "online";
}

const eventImages: Record<string, string> = {
  Impel_Down_Trials: "/Impel_Down_Trials.png",
  The_Pirate_Pitch: "/The_Pirate_Speech.jpg",
  Wanted_Creation: "/Wanted_creation.png",
  Buster_Call_Challenge: "/Buster_Call_Challenge.jpg",
  Grand_Line_Showdown: "/Grand_Line_Showdown.jpg",
  Log_Pose_Hunt: "/Log_Pose_hunt.jpg",
  Devil_Whisper: "/Devil's_whisper.jpg",
  Literacy_In_finance: "/Literacy_In_finance.jpg",
  DeepDive_GitHub: "/DeepDive_Into_Github.jpg",
  Cyber_Forensics: "/Cyber_Forensic_And_Security.jpg",
  Canva_Workshop: "/Fun_With_Canva.jpg",
  Stock_Analysis: "/The_Art_Of_Stock_Analysis.jpg",
  Sea_Shanty_Session: "/Sea_Shanny_Session.jpg",
  Thousand_Sunny_Design: "/Thousand_Sunny_Design.jpg",
};

const events: Event[] = [
  // Offline Contests
  { id: "Impel_Down_Trials", title: "Impel Down Trials (S.E only)", date: "17th September", type: "solo", imageUrl: eventImages.Impel_Down_Trials, category: "offline" },
  { id: "Buster_Call_Challenge", title: "Beat the Bot", date: "17th September", type: "team", teamSize: 2, imageUrl: eventImages.Buster_Call_Challenge, category: "offline" },
  { id: "Grand_Line_Showdown", title: "Grand Line Showdown", date: "17th September", type: "team", teamSize: 5, imageUrl: eventImages.Grand_Line_Showdown, category: "offline" },
  { id: "Log_Pose_Hunt", title: "Log Pose Hunt", date: "16th September", type: "team", teamSize: 3, imageUrl: eventImages.Log_Pose_Hunt, category: "offline" },
  { id: "Devil_Whisper", title: "Devil's Whisper", date: "16th September", type: "team", teamSize: 3, imageUrl: eventImages.Devil_Whisper, category: "offline" },

  // Workshops
  { id: "Literacy_In_finance", title: "Literacy in Finance", date: "16th September", type: "solo", imageUrl: eventImages.Literacy_In_finance, category: "workshop" },
  { id: "Canva_Workshop", title: "Fun with Canva", date: "16th September", type: "solo", imageUrl: eventImages.Canva_Workshop, category: "workshop" },
  { id: "Stock_Analysis", title: "The Art of Stock Analysis", date: "16th September", type: "solo", imageUrl: eventImages.Stock_Analysis, category: "workshop" },
  { id: "DeepDive_GitHub", title: "DeepDive into GitHub", date: "17th September", type: "solo", imageUrl: eventImages.DeepDive_GitHub, category: "workshop" },
  { id: "Cyber_Forensics", title: "Cyber Forensics & Security", date: "17th September", type: "solo", imageUrl: eventImages.Cyber_Forensics, category: "workshop" },

  // Online Events
  { id: "The_Pirate_Pitch", title: "The Pirate Pitch", date: "Deadline 17th September 10pm", type: "team", teamSize: 5, imageUrl: eventImages.The_Pirate_Pitch, category: "online" },
  { id: "Thousand_Sunny_Design", title: "Thousand Sunny Design", date: "Deadline 17th September 10pm", type: "solo", imageUrl: eventImages.Thousand_Sunny_Design, category: "online" },
  { id: "Wanted_Creation", title: "Wanted Creations", date: "Deadline 17th September 10pm", type: "solo", imageUrl: eventImages.Wanted_Creation, category: "online" },
  { id: "Sea_Shanty_Session", title: "Sea Shanty Session", date: "Deadline 17th September 10pm", type: "solo", imageUrl: eventImages.Sea_Shanty_Session, category: "online" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"offline" | "workshop" | "online" | "all">("all");

  const filteredEvents = selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <img src="/TechnovationWebDevBanner.png" alt="TECHNOVATION" className="hidden md:block w-full object-cover h-[80vh]" />
        <img src="/TechnovationMobileDevBanner.png" alt="TECHNOVATION Mobile" className="block md:hidden w-full object-cover" />
      </section>

      {/* Category Filter Buttons */}


      {/* Events Section */}
      <section id="events" className="py-12 sm:py-16 md:py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
            Explore the <span className="text-yellow-400">Events</span>
          </h2>
          <div className="flex justify-center gap-4 mt-6 mb-6">
        <button className={`px-4 py-2 rounded-2xl ${selectedCategory === "offline" ? "bg-yellow-400 text-black" : "bg-slate-700"}`} onClick={() => setSelectedCategory("offline")}>Offline Contests</button>
        <button className={`px-4 py-2 rounded-2xl ${selectedCategory === "workshop" ? "bg-yellow-400 text-black" : "bg-slate-700"}`} onClick={() => setSelectedCategory("workshop")}>Workshops</button>
        <button className={`px-4 py-2 rounded-2xl ${selectedCategory === "online" ? "bg-yellow-400 text-black" : "bg-slate-700"}`} onClick={() => setSelectedCategory("online")}>Online Events</button>
        <button className={`px-4 py-2 rounded-2xl ${selectedCategory === "all" ? "bg-yellow-400 text-black" : "bg-slate-700"}`} onClick={() => setSelectedCategory("all")}>All</button>
        </div>
          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredEvents.map((event) => (
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

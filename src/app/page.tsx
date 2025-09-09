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

interface Partner {
  name: string;
  logo: string;
}

// Event images mapping (all square 1:1 from Unsplash)
const eventImages: Record<string, string> = {
  No_Escape: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop",
  Pitch_A_Thon: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
  AdVision: "/Advision.png",
  Beat_the_bot: "/Beat_the_bot.png",
  Game_Of_Controls: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
  Cyber_Quest: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop",
  Mystery_Unmasked: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=400&fit=crop",

  // New events
  DeepDive_GitHub: "Deep_Dive_Into_Github.png", // coding
  Cyber_Forensics: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=400&h=400&fit=crop", // cybersecurity
  Canva_Workshop: "https://images.unsplash.com/photo-1604014237800-1c6f6c2eebd3?w=400&h=400&fit=crop", // design
  Stock_Analysis: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=400&fit=crop", // finance
  Echoes_Rebounded: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop", // writing
  Pixelcraft: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=400&fit=crop", // UI design
};

const events: Event[] = [
  // Original events
  { id: "No_Escape", title: "No Escape (S.E only)", date: "Coming Soon", type: "solo", imageUrl: eventImages["No_Escape"] },
  { id: "Pitch_A_Thon", title: "Pitch-A-Thon", date: "Coming Soon", type: "solo", imageUrl: eventImages["Pitch_A_Thon"] },
  { id: "AdVision", title: "AdVision", date: "Coming Soon", type: "solo", imageUrl: eventImages["AdVision"] },
  { id: "Beat_the_bot", title: "Beat the Bot", date: "Coming Soon", type: "team", teamSize: 2, imageUrl: eventImages["Beat_the_bot"] },
  { id: "Game_Of_Controls", title: "Game Of Controls", date: "Coming Soon", type: "team", teamSize: 3, imageUrl: eventImages["Game_Of_Controls"] },
  { id: "Cyber_Quest", title: "Cyber Quest", date: "Coming Soon", type: "team", teamSize: 3, imageUrl: eventImages["Cyber_Quest"] },
  { id: "Mystery_Unmasked", title: "Mystery Unmasked", date: "Coming Soon", type: "team", teamSize: 3, imageUrl: eventImages["Mystery_Unmasked"] },

  // New technical workshops
  { id: "DeepDive_GitHub", title: "DeepDive into GitHub ", date: "Coming Soon", type: "solo", imageUrl: eventImages["DeepDive_GitHub"] },
  { id: "Cyber_Forensics", title: "Cyber Forensics & Security", date: "Coming Soon", type: "solo", imageUrl: eventImages["Cyber_Forensics"] },

  // New non-technical workshops
  { id: "Canva_Workshop", title: "Fun with Canva", date: "Coming Soon", type: "solo", imageUrl: eventImages["Canva_Workshop"] },
  { id: "Stock_Analysis", title: "The Art of Stock Analysis", date: "Coming Soon", type: "solo", imageUrl: eventImages["Stock_Analysis"] },

  // Non-technical events
  { id: "Echoes_Rebounded", title: "Echoes Rebounded (Online Literary Event)", date: "Coming Soon", type: "solo", imageUrl: eventImages["Echoes_Rebounded"] },
  { id: "Pixelcraft", title: "Pixelcraft (UI/UX Design Event)", date: "Coming Soon", type: "solo", imageUrl: eventImages["Pixelcraft"] },
];

const partners: Partner[] = [
  { name: "MacDONALDS", logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center" },
  { name: "TechCorp", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center" },
  { name: "InnovateX", logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop&crop=center" },
  { name: "CodeSail", logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&crop=center" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
          TECHNOVATION
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300">
          Powered by <span className="font-bold text-yellow-400">CSI IT</span>
        </p>
        <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed px-2">
          A voyage into technology & innovation. Set sail with us as we bring together brilliant minds, groundbreaking ideas, and the spirit of adventure.
        </p>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
            Our <span className="text-cyan-400">Sponsors</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {partners.map((partner, index) => (
              <div key={index} className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border border-white/20 hover:border-cyan-400/50 hover:-translate-y-2">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-white/20 to-white/10 mb-4">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-white font-semibold text-center group-hover:text-cyan-400 transition-colors duration-300">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
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
                Driving innovation through collaboration. Join us for Technovation and be part of the adventure.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li><a href="#events" className="hover:text-cyan-400 transition-colors">Events</a></li>
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4 sm:space-x-6">
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 hover:scale-110 transition">IG</a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 hover:scale-110 transition">LI</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="text-center text-xs sm:text-sm text-gray-500 px-4">
            © 2024 CSI IT Technovation — All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

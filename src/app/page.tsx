import React from "react";
import EventCard from "@/components/EventCard";

interface Event {
  id: string;
  title: string;
  date: string;
  type: "solo" | "team";
  teamSize?: number;
  imageUrl: string;
}

const eventImages: Record<string, string> = {
  No_Escape:
    "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop",
  Pitch_A_Thon:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
  AdVision:
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
  Beat_the_bot:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
  Game_Of_Controls:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop",
  Cyber_Quest:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop",
  Mystery_Unmasked:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=400&fit=crop",
};

const events: Event[] = [
  {
    id: "No_Escape",
    title: "No Escape (S.E only)",
    date: "Coming Soon",
    type: "solo",
    imageUrl: eventImages["No_Escape"],
  },
  {
    id: "Pitch_A_Thon",
    title: "Pitch-A-Thon",
    date: "Coming Soon",
    type: "solo",
    imageUrl: eventImages["Pitch_A_Thon"],
  },
  {
    id: "AdVision",
    title: "AdVision",
    date: "Coming Soon",
    type: "solo",
    imageUrl: eventImages["AdVision"],
  },
  {
    id: "Beat_the_bot",
    title: "Beat the Bot",
    date: "Coming Soon",
    type: "team",
    teamSize: 2,
    imageUrl: eventImages["Beat_the_bot"],
  },
  {
    id: "Game_Of_Controls",
    title: "Game Of Controls",
    date: "Coming Soon",
    type: "team",
    teamSize: 3,
    imageUrl: eventImages["Game_Of_Controls"],
  },
  {
    id: "Cyber_Quest",
    title: "Cyber Quest",
    date: "Coming Soon",
    type: "team",
    teamSize: 3,
    imageUrl: eventImages["Cyber_Quest"],
  },
  {
    id: "Mystery_Unmasked",
    title: "Mystery Unmasked",
    date: "Coming Soon",
    type: "team",
    teamSize: 3,
    imageUrl: eventImages["Mystery_Unmasked"],
  },
];

const partners = [
  {
    name: "MacDONALDS",
    logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center",
  },
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
  },
  {
    name: "InnovateX",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop&crop=center",
  },
  {
    name: "CodeSail",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&crop=center",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        {/* Mobile: 3xl, Tablet: 5xl, Desktop: 6xl-8xl */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
          TECHNOVATION
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300">
          Powered by <span className="font-bold text-yellow-400">CSI IT</span>
        </p>
        <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed px-2">
          A voyage into technology & innovation. Set sail with us as we bring
          together brilliant minds, groundbreaking ideas, and the spirit of
          adventure.
        </p>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
            Our <span className="text-cyan-400">Sponsors</span>
          </h2>
          {/* Mobile: 2 columns, Medium+: 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg flex flex-col items-center transition-transform hover:-translate-y-2"
              >
                <div className="aspect-square w-20 sm:w-24 md:w-32 rounded-lg overflow-hidden bg-white/10 mb-3 sm:mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-200 text-center">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
            Explore the <span className="text-yellow-400">Events</span>
          </h2>
          {/* Mobile: 1 column, Small: 2 columns, Large: 3 columns, XL: 4 columns */}
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
          {/* Mobile: Stacked vertically, Medium+: Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">CSI IT</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Driving innovation through collaboration. Join us for Technovation
                and be part of the adventure.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <li>
                  <a href="#events" className="hover:text-cyan-400 transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-cyan-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4 sm:space-x-6">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 hover:scale-110 transition text-sm sm:text-base font-medium"
                >
                  IG
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 hover:scale-110 transition text-sm sm:text-base font-medium"
                >
                  LI
                </a>
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
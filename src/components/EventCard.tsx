"use client";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  type?: "solo" | "team";
  teamSize?: number;
  imageUrl: string; // Add imageUrl property
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:-translate-y-4 border border-white/20 hover:border-cyan-400/50 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating elements */}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
        
        <div className="relative p-6">
          {/* Event Image */}
          <div className="aspect-square rounded-2xl overflow-hidden mb-6 border-2 border-white/20 group-hover:border-cyan-400/50 transition-colors duration-300">
            <Image 
              src={event.imageUrl} 
              alt={event.title}
              width={400} // Assuming a base width for the image
              height={400} // Assuming a base height for the image
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Event Title */}
          <h3 className="text-lg font-bold text-white text-center mb-4 group-hover:text-cyan-400 transition-colors duration-300">
            {event.title}
          </h3>
          
          {/* Event Type Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 group-hover:text-cyan-200 transition-all duration-300">
              {event.type === 'solo' ? 'Solo Event' : `Team of ${event.teamSize}`}
            </span>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
        </div>
      </div>
    </Link>
  );
}

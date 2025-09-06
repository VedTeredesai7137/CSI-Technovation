"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EventsApp
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/events" className="hover:text-blue-600">Events</Link>
        </div>
      </div>
    </nav>
  );
}

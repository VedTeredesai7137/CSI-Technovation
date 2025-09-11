"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { EventConfig, EventDetails } from "@/lib/events";

interface EventClientProps {
  eventId: string;
  eventConfig: EventConfig;
  initialCapacity: {
    registered: number;
    limit: number;
    full: boolean;
  } | null;
}

export default function EventClient({ eventId, eventConfig, initialCapacity }: EventClientProps) {
  const router = useRouter();
  const isTeamEvent = eventConfig.type === "team";

  // --- local state preserved from original ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  
  const [teamId, setTeamId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberRollNumber, setMemberRollNumber] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [capacity, setCapacity] = useState(initialCapacity);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  // Fetch capacity if not provided initially
  useEffect(() => {
    if (!initialCapacity) {
      async function fetchCapacity() {
        try {
          const res = await fetch(`/api/events/${eventId}/capacity`);
          if (res.ok) {
            const data = await res.json();
            setCapacity(data);
          }
        } catch (err) {
          console.error("Error fetching capacity:", err);
        }
      }
      fetchCapacity();
    }
  }, [eventId, initialCapacity]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSubmitting(true);

    try {
      const requestBody = isTeamEvent
        ? { 
            eventId, 
            teamId, 
            memberName, 
            email: memberEmail, 
            phone: memberPhone,
            rollNumber: memberRollNumber,
          }
        : { 
            eventId, 
            name, 
            email, 
            phone,
            rollNumber,
          };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.message || "Registration failed" });
      } else {
        setMsg({ type: "success", text: data.message || "Registration successful!" });
        setWhatsappLink(data.whatsappLink);
        
        // reset
        if (isTeamEvent) {
          setTeamId("");
          setMemberName("");
          setMemberEmail("");
          setMemberPhone("");
          setMemberRollNumber("");
        } else {
          setName("");
          setEmail("");
          setPhone("");
          setRollNumber("");
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMsg({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setSubmitting(false);
    }
  }

  if (whatsappLink) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-gray-900 rounded-xl shadow-lg p-8 text-center border border-gray-700">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Registration Successful!</h2>
            <p className="text-gray-300 mb-6 text-lg">Thanks for registering. Join the WhatsApp group for updates.</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Join WhatsApp Group
            </a>
            <div className="mt-6">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper: render event detail card
  const renderEventDetails = (details?: EventDetails) => {
    if (!details) return null;

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-blue-400 mb-6">{details.title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400">Team Size</p>
            <p className="font-semibold text-white mt-1">{details.teamSize ?? "Solo"}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400">Duration</p>
            <p className="font-semibold text-white mt-1">{details.duration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400">Venue</p>
            <p className="font-semibold text-white mt-1">{details.venue}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-blue-300">Rounds</h4>
          {details.rounds.map((round, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">{round.name}</p>
                  <p className="text-gray-300 mt-2">{round.description}</p>
                </div>
                <span className="text-sm text-blue-300 bg-gray-700 px-3 py-1 rounded ml-4 whitespace-nowrap">
                  {round.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-4">
            {eventConfig?.details?.title ?? eventId}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {eventConfig?.details?.subtitle ?? "Dive into the challenge and showcase your skills."}
          </p>
        </div>

        {/* Desktop split layout: left = info, right = form. On mobile, stack vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column (info) - takes 2/3 of space */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event details card */}
            {eventConfig.details && renderEventDetails(eventConfig.details)}

            {/* Additional info: capacity / rules / resources */}
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Event Information</h3>

              <div className="space-y-6">
                {capacity && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 text-lg">Registrations</span>
                      <span className="font-semibold text-white text-lg">
                        {capacity.registered} / {capacity.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          capacity.full ? "bg-red-500" : "bg-blue-500"
                        }`}
                        style={{ 
                          width: `${Math.min(100, (capacity.registered / capacity.limit) * 100)}%` 
                        }}
                      />
                    </div>
                    {capacity.full && (
                      <p className="text-red-400 text-sm mt-2">Event is full!</p>
                    )}
                  </div>
                )}

                {eventConfig?.details?.rules && (
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">Rules</h4>
                    <ul className="space-y-2">
                      {eventConfig.details.rules.map((rule: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span className="text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {eventConfig?.details?.resources && (
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-3">Resources</h4>
                    <ul className="space-y-2">
                      {eventConfig.details.resources.map((res: { label: string; href: string }, idx: number) => (
                        <li key={idx}>
                          <a 
                            href={res.href} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                          >
                            {res.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column (registration form) - takes 1/3 of space */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Register Now</h3>
                <p className="text-gray-400 mb-6">
                  {isTeamEvent 
                    ? "Team event — register members with Team ID" 
                    : "Solo event — fill your details below"
                  }
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isTeamEvent ? (
                    <>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Team Name *
                        </label>
                        <input
                          value={teamId}
                          onChange={(e) => setTeamId(e.target.value)}
                          required
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter team identifier"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Member Names * <span className="font-normal text-gray-400">(Separate with commas)</span>
                        </label>
                        <input
                          value={memberName}
                          onChange={(e) => setMemberName(e.target.value)}
                          required
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John Doe, Jane Smith, Mike Johnson"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Roll Numbers * <span className="font-normal text-gray-400">(Same order as names)</span>
                        </label>
                        <input
                          value={memberRollNumber}
                          onChange={(e) => setMemberRollNumber(e.target.value)}
                          required
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="12345, 67890, 11111"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Captain Email * <span className="font-normal text-gray-400">(One email for team)</span>
                        </label>
                        <input
                          value={memberEmail}
                          onChange={(e) => setMemberEmail(e.target.value)}
                          required
                          type="email"
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="captain@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Phone Numbers <span className="font-normal text-gray-400">(Same order as names)</span>
                        </label>
                        <input
                          value={memberPhone}
                          onChange={(e) => setMemberPhone(e.target.value)}
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="9876543210, 9876543211, 9876543212"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Email *
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Phone
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Optional phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">
                          Roll Number
                        </label>
                        <input
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value)}
                          className="w-full rounded-lg p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your roll number"
                        />
                      </div>
                    </>
                  )}

                  {msg && (
                    <div
                      className={`p-4 rounded-lg border ${
                        msg.type === "error" 
                          ? "bg-red-900/50 border-red-600 text-red-300" 
                          : "bg-green-900/50 border-green-600 text-green-300"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting || (capacity?.full ?? false)}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                        capacity?.full 
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                          : submitting
                          ? "bg-blue-600 text-white cursor-wait"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {submitting ? "Registering..." : capacity?.full ? "Event Full" : "Register Now"}
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="w-full px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                    >
                      Back to Events
                    </button>
                  </div>

                  {capacity && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      {capacity.registered}/{capacity.limit} registered
                    </p>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
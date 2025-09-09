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
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Registration Successful</h2>
          <p className="text-gray-700 mb-4">Thanks for registering. Join the WhatsApp group for updates.</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Join WhatsApp Group
        </a>
          <div className="mt-4">
        <button
          onClick={() => router.push("/")}
              className="px-4 py-2 mt-4 text-sm text-gray-700 border rounded hover:bg-gray-50"
        >
          Back to Events
        </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper: render event detail card (keeps markup consistent with homepage style)
  const renderEventDetails = (details?: EventDetails) => {
    if (!details) return null;

    return (
      <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/6 rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-white mb-4">{details.title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/4 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Team Size</p>
            <p className="font-semibold text-white mt-1">{details.teamSize ?? "Solo"}</p>
          </div>
          <div className="bg-white/4 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Duration</p>
            <p className="font-semibold text-white mt-1">{details.duration}</p>
          </div>
          <div className="bg-white/4 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Venue</p>
            <p className="font-semibold text-white mt-1">{details.venue}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Rounds</h4>
          {details.rounds.map((round, index) => (
            <div key={index} className="bg-white/6 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{round.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{round.description}</p>
                </div>
                <span className="text-sm text-gray-200 bg-white/5 px-3 py-1 rounded">{round.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {eventConfig?.details?.title ?? eventId}
        </h1>
        <p className="mt-2 text-gray-300 max-w-2xl mx-auto">{eventConfig?.details?.subtitle ?? "Dive into the challenge and showcase your skills."}</p>
      </div>

      {/* Desktop split layout: left = info, right = form. On mobile, stack vertically */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column (info) */}
        <div className="md:col-span-7 space-y-6">
          {/* Big info card */}
          <div className="bg-slate-900 border border-white/6 rounded-2xl p-6 shadow-lg">
            {eventConfig.details && renderEventDetails(eventConfig.details)}
          </div>

          {/* Additional info: capacity / rules / resources */}
          <div className="bg-slate-900 border border-white/6 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Event Info</h3>

            <div className="text-sm text-gray-300 space-y-3">
              {capacity && (
      <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Registrations</span>
                    <span className="font-medium">{capacity.registered} / {capacity.limit}</span>
                  </div>
                  <div className="w-full bg-white/6 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${capacity.full ? "bg-red-600" : "bg-green-500"}`}
                style={{ width: `${Math.min(100, (capacity.registered / capacity.limit) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {eventConfig?.details?.rules && (
                <div>
                  <h4 className="font-semibold text-white mt-3">Rules</h4>
                  <ul className="list-disc list-inside mt-2 text-gray-300">
                    {eventConfig.details.rules.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
                  </ul>
                </div>
              )}

              {eventConfig?.details?.resources && (
                <div>
                  <h4 className="font-semibold text-white mt-3">Resources</h4>
                  <ul className="mt-2 space-y-1">
                    {eventConfig.details.resources.map((res: any, idx: number) => (
                      <li key={idx}>
                        <a href={res.href} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
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

        {/* Right column (registration form) */}
        <aside className="md:col-span-5">
          <div className="sticky top-28">
            <div className="bg-gradient-to-br from-white/4 to-white/2 border border-white/6 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-1">Register</h3>
              <p className="text-sm text-gray-300 mb-4">{isTeamEvent ? `Team event — register members with Team ID` : "Solo event — fill your details below"}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
        {isTeamEvent ? (
          <>
            <div>
                      <label className="text-sm text-gray-300 block mb-1">Team Name *</label>
              <input
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter team identifier"
              />
            </div>
            
            <div>
                      <label className="text-sm text-gray-300 block mb-1">Member Name *(If Team add all members name)</label>
              <input
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter member's full name"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Roll Number *(If Team add all members roll number in order of Names inputted)</label>
              <input
                value={memberRollNumber}
                onChange={(e) => setMemberRollNumber(e.target.value)}
                required
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter member's roll number"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Email *(If Team add all members email in order of Names inputted)</label>
              <input
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                type="email"
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Enter member's email"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Phone(If Team add all members phone in order of Names inputted)</label>
              <input
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter member's phone number"
              />
            </div>
          </>
        ) : (
          <>
            <div>
                      <label className="text-sm text-gray-300 block mb-1">Full Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your full name"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Email *</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Enter your email address"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Optional phone"
              />
            </div>

            <div>
                      <label className="text-sm text-gray-300 block mb-1">Roll Number</label>
              <input
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                        className="w-full rounded-md p-3 bg-white/3 border border-white/8 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Your roll number"
              />
            </div>
          </>
        )}

        {msg && (
          <div
            className={`p-3 rounded ${msg.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {msg.text}
          </div>
        )}

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={() => router.push("/")}
                    className="w-full sm:w-auto px-4 py-3 rounded-md text-gray-800 bg-white/90 hover:bg-white transition"
          >
                    Back
          </button>

          <button
            type="submit"
            disabled={submitting || (capacity?.full ?? false)}
                    className={`w-full sm:w-auto px-4 py-3 rounded-md text-white ${capacity?.full ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"}`}
          >
                    {submitting ? "Registering..." : capacity?.full ? "Full" : "Register"}
          </button>
        </div>

                {/* Capacity small text */}
                {capacity && (
                  <p className="text-xs text-gray-400 mt-2">
                    {capacity.registered}/{capacity.limit} registered
                  </p>
                )}
      </form>
            </div>

            {/* optional small notes */}
            <div className="mt-4 text-sm text-gray-400">
              <p><strong>Note:</strong> Please bring your college ID on the event day.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

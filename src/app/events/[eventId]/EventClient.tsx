"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EventClientProps {
  eventId: string;
  eventConfig: { type: "solo" | "team"; teamSize?: number };
  initialCapacity: {
    registered: number;
    limit: number;
    full: boolean;
  } | null;
}

export default function EventClient({ eventId, eventConfig, initialCapacity }: EventClientProps) {
  const router = useRouter();
  const isTeamEvent = eventConfig.type === "team";

  // Solo event fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  
  // Team event fields
  const [teamId, setTeamId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberRollNumber, setMemberRollNumber] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [capacity, setCapacity] = useState(initialCapacity);

  // Fetch current capacity when component mounts
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
      // Prepare request body based on event type
      const requestBody = isTeamEvent
        ? { 
            eventId, 
            teamId, 
            memberName, 
            email: memberEmail, 
            phone: memberPhone,
            rollNumber: memberRollNumber 
          }
        : { 
            eventId, 
            name, 
            email, 
            phone,
            rollNumber 
          };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.error || "Registration failed" });
      } else {
        setMsg({ type: "success", text: "Registration successful!" });
        
        // Reset form fields based on event type
        if (isTeamEvent) {
          setTeamId(""); setMemberName(""); setMemberEmail(""); 
          setMemberPhone(""); setMemberRollNumber("");
        } else {
          setName(""); setEmail(""); setPhone(""); setRollNumber("");
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMsg({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Event: {eventId}</h1>
        <p className="text-gray-600 mt-1">
          {isTeamEvent 
            ? `Team event (${eventConfig.teamSize} members). Register each member separately with the same Team ID.` 
            : "Solo event. Register below."} Limited slots only.
        </p>
        {capacity && (
          <div className="mt-2">
            <span className="text-sm font-medium">
              Registrations: {capacity.registered} / {capacity.limit}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className={`h-2.5 rounded-full ${capacity.full ? "bg-red-600" : "bg-green-600"}`}
                style={{ width: `${Math.min(100, (capacity.registered / capacity.limit) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4 max-w-lg">
        {isTeamEvent ? (
          // Team event form
          <>
            <div>
              <label className="block text-sm font-medium">Team ID *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
                placeholder="Your team identifier"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Member Name *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                required
                placeholder="Team member's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Roll Number *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={memberRollNumber}
                onChange={(e) => setMemberRollNumber(e.target.value)}
                required
                placeholder="Member's roll number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                required
                type="email"
                placeholder="member@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                placeholder="Member's phone number"
              />
            </div>
          </>
        ) : (
          // Solo event form
          <>
            <div>
              <label className="block text-sm font-medium">Full Name *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Roll Number</label>
              <input
                className="mt-1 w-full border rounded-lg p-2"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
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

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
          >
            Back to Events
          </button>
          <button
            type="submit"
            disabled={submitting || (capacity?.full ?? false)}
            className={`px-4 py-2 text-white rounded-lg ${capacity?.full ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
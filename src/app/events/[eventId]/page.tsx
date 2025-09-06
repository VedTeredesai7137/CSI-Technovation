"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ eventId: string }>; // 👈 mark as Promise
}

export default function EventPage({ params }: Props) {
  // unwrap the promise
  const { eventId } = use(params);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [capacity, setCapacity] = useState<{ current: number; limit: number } | null>(null);

  // Fetch current capacity when component mounts
  useEffect(() => {
    async function fetchCapacity() {
      try {
        const res = await fetch(`/api/events/${eventId}/capacity`);
        if (res.ok) {
          const data = await res.json();
          if (data.currentCount !== undefined && data.limit !== undefined) {
            setCapacity({
              current: data.currentCount,
              limit: data.limit
            });
          }
        }
      } catch (error) {
        console.error("Error fetching capacity:", error);
      }
    }
    
    fetchCapacity();
  }, [eventId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name, email, phone }),
      });
      const data = await res.json();
      
      // Update capacity information if available in response
      if (data.currentCount !== undefined && data.limit !== undefined) {
        setCapacity({
          current: data.currentCount,
          limit: data.limit
        });
      }
      
      if (!res.ok) {
        setMsg({ type: "error", text: data.message || "Registration failed." });
      } else {
        setMsg({ type: "success", text: "Registration successful!" });
        setName(""); setEmail(""); setPhone("");
      }
    } catch (err) {
      setMsg({ type: "error", text: "Network error. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Event: {eventId}</h1>
        <p className="text-gray-600 mt-1">
          Register below. Limited slots only.
        </p>
        {capacity && (
          <div className="mt-2">
            <p className={`text-sm font-medium ${capacity.current >= capacity.limit ? 'text-red-600' : 'text-green-600'}`}>
              Capacity: {capacity.current} / {capacity.limit} registrations
              {capacity.current >= capacity.limit && " (FULL)"}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4 max-w-lg">
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
            placeholder="+1 555 555 5555"
          />
        </div>

        {msg && (
          <div
            className={`rounded-md p-3 text-sm ${
              msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Register"}
        </button>
      </form>

      <button
        onClick={() => router.push("/events")}
        className="text-blue-600 hover:underline"
      >
        ← Back to all events
      </button>
    </div>
  );
}

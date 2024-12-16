"use client";

import { useState, useEffect } from "react";

interface Toggle {
  id: number;
  name: string;
  isEnabled: boolean;
}

export default function AdminPage() {
  const [toggles, setToggles] = useState<Toggle[]>([]);

  useEffect(() => {
    async function fetchToggles() {
      try {
        const response = await fetch("/api/features/toggle");
        if (!response.ok) {
          throw new Error("Failed to fetch toggles");
        }
        const data = await response.json();
        setToggles(data);
      } catch (error) {
        console.error("Error fetching toggles:", error);
      }
    }
    fetchToggles();
  }, []);

  async function handleToggle(id: number, isEnabled: boolean) {
    try {
      const response = await fetch(`/api/features/toggle/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isEnabled }),
      });
      if (!response.ok) {
        throw new Error("Failed to update toggle");
      }

      setToggles((prev) =>
        prev.map((toggle) =>
          toggle.id === id ? { ...toggle, isEnabled } : toggle
        )
      );
    } catch (error) {
      console.error("Error updating toggle:", error);
    }
  }

  return (
    <div>
      <h1>Feature Toggles</h1>
      <ul>
        {toggles.map((toggle) => (
          <li key={toggle.id}>
            <span>
              {toggle.id}-{toggle.name}
            </span>
            <input
              type="checkbox"
              checked={toggle.isEnabled}
              onChange={(e) => handleToggle(toggle.id, e.target.checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

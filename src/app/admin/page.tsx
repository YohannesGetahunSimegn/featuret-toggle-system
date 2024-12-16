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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Feature Toggles
        </h1>
        <ul className="space-y-4">
          {toggles.map((toggle) => (
            <li
              key={toggle.id}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-gray-700 font-medium text-lg flex items-center space-x-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  {toggle.id}
                </span>
                <span>{toggle.name}</span>
              </span>
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-500 focus:ring-blue-400 rounded"
                checked={toggle.isEnabled}
                onChange={(e) => handleToggle(toggle.id, e.target.checked)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Toggle {
  id: number;
  name: string;
  isEnabled: boolean;
}

export default function LandingPage() {
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

  return (
    <div>
      <h1>Landing Page</h1>
      {toggles.length === 0 ? (
        <p>Loading features...</p>
      ) : (
        <div>
          {toggles.map((toggle) => {
            // Render content conditionally based on the toggle's name and `isEnabled` status
            if (toggle.isEnabled) {
              switch (toggle.name) {
                case "Dark Mode":
                  return (
                    <div key={toggle.id}>
                      <h2>Dark Mode</h2>
                      <p>
                        Enjoy a darker theme for better night-time browsing!
                      </p>
                    </div>
                  );
                case "Free Shipping":
                  return (
                    <div key={toggle.id}>
                      <h2>Free Shipping</h2>
                      <p>Get free shipping on all orders above $50!</p>
                    </div>
                  );
                case "Beta Feature X":
                  return (
                    <div key={toggle.id}>
                      <h2>Beta Feature X</h2>
                      <p>Try out our new experimental features!</p>
                    </div>
                  );
                default:
                  return (
                    <div key={toggle.id}>
                      <h2>{toggle.name}</h2>
                      <p>This feature is enabled and available for you!</p>
                    </div>
                  );
              }
            }
            return null; // Do not render anything for disabled features
          })}
        </div>
      )}
    </div>
  );
}

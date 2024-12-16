"use client";

import { useEffect, useState } from "react";
import Snowfall from "./components/SnowFall";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-rose-950">
      {toggles.map((toggle) => {
        if (toggle.isEnabled && toggle.name === "chrismass_animation_test") {
          return (
            <>
              <h2 key={toggle.id} className="text-2xl text-white mb-6">
                Merry Christmas 🎄
              </h2>
              <Snowfall />
            </>
          );
        }
        return null; // If toggle is not enabled, return nothing
      })}

      <input
        type="text"
        placeholder="Search gifts..."
        className="w-full max-w-md p-2 border border-pink-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 mb-6"
      />

      <h1 className="relative text-white text-4xl text-center p-4 font-sans font-bold mb-10">
        Welcome to gift house
      </h1>

      {toggles.length === 0 ? (
        <p className="font-medium text-2xl">Loading features...</p>
      ) : (
        <div>
          {toggles.map((toggle) => {
            if (toggle.isEnabled) {
              switch (toggle.name) {
                case "casual_page_test":
                  return (
                    <div key={toggle.id}>
                      <nav className="absolute top-0 left-0 w-full bg-rose-900 text-white py-2 px-4 shadow-md flex justify-between items-center">
                        <a href="#home" className="text-lg font-bold">
                          🎁 Gift House
                        </a>
                        <div className="flex space-x-4">
                          <a
                            href="#home"
                            className="hover:text-pink-300 transition duration-300"
                          >
                            Home
                          </a>
                          <a
                            href="#signup"
                            className="hover:text-pink-300 transition duration-300"
                          >
                            Sign Up
                          </a>
                        </div>
                      </nav>
                    </div>
                  );
                case "chrismass_animation_test":
                  return (
                    <div
                      key={toggle.id}
                      className="flex flex-col items-center justify-center text-center mt-10"
                    >
                      <nav className="absolute top-0 left-0 w-full bg-rose-900 text-white py-2 px-4 shadow-md flex justify-between items-center">
                        <a href="#home" className="text-lg font-bold">
                          🎅Gift House
                        </a>
                        <div className="flex space-x-4">
                          <a
                            href="#home"
                            className="hover:text-pink-300 transition duration-300"
                          >
                            Home
                          </a>
                          <a
                            href="#signup"
                            className="hover:text-pink-300 transition duration-300"
                          >
                            Sign Up
                          </a>
                        </div>
                      </nav>
                      <p className="text-lg text-white mt-4">
                        Discover the perfect Christmas gifts for everyone on
                        your list! At Gift House, we bring the magic of the
                        season to your celebrations with curated surprises that
                        spread holiday cheer and create lasting memories.
                      </p>
                    </div>
                  );
                default:
                  return null; // Skip any other toggles
              }
            }
            return null; // Do not render anything for disabled features
          })}
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";

const Snowfall: React.FC = () => {
  // Updated Snowflake type
  type Snowflake = {
    id: number;
    size: number; // Size of the snowflake
    left: number; // Horizontal position
    animationDuration: number; // Duration of the animation
    animationDelay: number; // Delay before animation starts
  };

  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  // Function to create snowflakes

  // Create snowflakes on component mount
  useEffect(() => {
    const createSnowflakes = () => {
      const snowflakeArray: Snowflake[] = [];
      const numSnowflakes = 100; // Number of snowflakes

      for (let i = 0; i < numSnowflakes; i++) {
        snowflakeArray.push({
          id: i,
          size: Math.random() * 10 + 5, // Snowflake size between 5px and 15px
          left: Math.random() * window.innerWidth, // Random horizontal position
          animationDuration: Math.random() * 5 + 5, // Random animation duration
          animationDelay: Math.random() * 20, // Random delay
        });
      }

      setSnowflakes(snowflakeArray);
    };
    createSnowflakes();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute bg-white rounded-full opacity-80 animate-snowfall"
          style={{
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            left: `${snowflake.left}px`,
            animationDuration: `${snowflake.animationDuration}s`,
            animationDelay: `${snowflake.animationDelay}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Snowfall;

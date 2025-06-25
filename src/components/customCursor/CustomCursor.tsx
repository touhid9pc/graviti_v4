"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75"
      style={{
        left: position.x + 20,
        top: position.y - 30,
        // transform: "translate(-50%, -50%)",
      }}
    >
      <div className="text-xl text-primary font-semibold">Click</div>
    </div>
  );
}

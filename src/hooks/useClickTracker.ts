"use client";
import { useEffect } from "react";

export function useClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const info = {
        tag: target.tagName,
        text: target.textContent?.trim()?.slice(0, 100),
        id: target.id,
        class: target.className,
      };

      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "click", {
          event_category: "interaction",
          event_label: JSON.stringify(info),
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

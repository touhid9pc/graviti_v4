"use client";

import { useEffect } from "react";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

export function useClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const label = target.dataset.analytics;

      if (analytics && label) {
        logEvent(analytics, "click", {
          category: "interaction",
          label,
        });
      } else if (analytics) {
        const info = {
          tag: target.tagName,
          text: target.textContent?.trim()?.slice(0, 100),
          id: target.id,
          class: target.className,
        };

        console.log({ info });
        logEvent(analytics, "click", {
          category: "interaction",
          label: JSON.stringify(info),
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

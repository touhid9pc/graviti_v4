"use client";

import { useEffect } from "react";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";

export function useClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;

      while (target && target !== document.body && !target.id) {
        target = target.parentElement as HTMLElement;
      }

      if (!target || target === document.body) return;

      const label = target.dataset.analytics || target.id;

      if (analytics && label) {
        // Case 1: Explicit tracking via data-analytics
        logEvent(analytics, "click", {
          category: "interaction",
          label,
        });
      } else if (analytics) {
        // Case 2: Auto-logging element details (structured, not JSON)
        logEvent(analytics, "click", {
          category: "interaction",
          tag: target.tagName,
          text: target.textContent?.trim()?.slice(0, 100),
          id: target.id || undefined,
          class: target.className || undefined,
          innerHtml: target?.innerHTML,
        });
      }

      console.log({ target });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

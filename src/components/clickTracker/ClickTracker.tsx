"use client";

import { useEffect } from "react";
import { analytics } from "@/firebase/firebase";
import { logEvent } from "firebase/analytics";
import { usePathname } from "next/navigation";

export default function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!analytics) return;

      const tag = target.tagName;
      const text = target.textContent?.trim()?.slice(0, 50) || "";
      const href =
        target instanceof HTMLAnchorElement ? target.href : undefined;

      logEvent(analytics, "user_click", {
        tag,
        text,
        href,
        page: pathname,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}

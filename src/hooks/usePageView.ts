"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window?.gtag !== "undefined") {
      window?.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);
}

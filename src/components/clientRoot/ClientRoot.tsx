// components/layout/ClientRoot.tsx
"use client";

import { useAppStore } from "@/store/useStore";
import HamburgerMenu from "@/components/hamburger/Hamburger";
import { useClickTracker } from "@/hooks/useClickTracker";
import { usePageView } from "@/hooks/usePageView";

const ClientRoot = () => {
  const { user } = useAppStore();

  useClickTracker();
  usePageView();

  return (
    <>
      <HamburgerMenu />
    </>
  );
};

export default ClientRoot;

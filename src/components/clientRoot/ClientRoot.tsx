// components/layout/ClientRoot.tsx
"use client";

import { useAppStore } from "@/store/useStore";
import HamburgerMenu from "@/components/hamburger/Hamburger";
import { useClickTracker } from "@/hooks/useClickTracker";
import { usePageView } from "@/hooks/usePageView";
import Banner from "../banner/Banner";

const ClientRoot = () => {
  const { user } = useAppStore();

  useClickTracker();
  usePageView();

  return (
    <>
      {/* <Banner /> */}
      <HamburgerMenu />
    </>
  );
};

export default ClientRoot;

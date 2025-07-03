// components/layout/ClientRoot.tsx
"use client";

import { useAppStore } from "@/store/useStore";
import HamburgerMenu from "@/components/hamburger/Hamburger";

const ClientRoot = () => {
  const { user } = useAppStore();

  return <>{user && <HamburgerMenu />}</>;
};

export default ClientRoot;

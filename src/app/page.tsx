"use client";

import SectionOne from "@/components/sections/SectionOne";
import SectionThree from "@/components/sections/SectionThree";
import SectionTwo from "@/components/sections/SectionTwo";
import { auth } from "@/firebase/firebase";
import { useAppStore } from "@/store/useStore";
import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { step, setStep, user: stateUser, setUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setStep(1);
      } else {
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const renderStepComponent = (currentStep: number) => {
  //   switch (currentStep) {
  //     case 1:
  //       return <SectionOne />;
  //     case 2:
  //       return <SectionTwo />;
  //     case 3:
  //       return <SectionThree />;
  //     default:
  //       return <SectionOne />;
  //   }
  // };

  return (
    <main className="flex flex-col items-center space-y-4">
      {/* <div className="w-full">{renderStepComponent(step)}</div> */}
      <SectionOne />
      <SectionTwo scrollToSection={scrollToSection} />
      <SectionThree sectionRef={sectionRef} />
    </main>
  );
}

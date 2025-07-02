"use client";

import SectionOne from "@/components/sections/SectionOne";
import SectionStocks from "@/components/sections/SectionStocks";
import SectionThree from "@/components/sections/SectionThree";
import SectionTwo from "@/components/sections/SectionTwo";
import { auth } from "@/firebase/firebase";
import { useAppStore } from "@/store/useStore";
import { User } from "firebase/auth";
import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const {
    step,
    setStep,
    user: stateUser,
    setUser,
    isProceed,
    setInterestsData,
    setIsProceed,
  } = useAppStore();

  const [showReveal, setShowReveal] = useState<Boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setStep(1);
        setUser(null);
        setInterestsData({
          companies: [],
          triviaScore: 0,
          timestamp: new Date(),
        });
        setIsProceed(false);
        return;
      }

      try {
        const idTokenResult = await user.getIdTokenResult();
        const expirationTime = new Date(idTokenResult.expirationTime);
        const now = new Date();

        if (now > expirationTime) {
          console.log("🔥 Token expired — logging out user");
          toast.error("Token expired");
          setUser(null);
          setInterestsData({
            companies: [],
            triviaScore: 0,
            timestamp: new Date(),
          });
          setIsProceed(false);
          setStep(1);
          auth.signOut();
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("⚠️ Error checking token:", error);
        setUser(null);
        setInterestsData({
          companies: [],
          triviaScore: 0,
          timestamp: new Date(),
        });
        setIsProceed(false);
        setStep(1);
      }
    });

    return unsubscribe;
  }, []);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const proceedRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSecondSection = () => {
    proceedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let proceed = isProceed || false;

  // const renderStepComponent = (currentStep: number) => {
  //   switch (currentStep) {
  //     case 1:
  //       return <SectionOne />;
  //     case 2:
  //       return <SectionTwo />;
  //     case 3:
  //       return <SectionThree />;
  //     default:
  //       return <SectionOne />;ageage
  //   }
  // };

  return (
    <main className="flex flex-col items-center space-y-4 bg-gradient-to-br from-[#FAF9F6] via-[#FFF] to-[#FAF9F6]">
      {/* <div className="w-full">{renderStepComponent(step)}</div> */}
      <SectionOne scrollToSecondSection={scrollToSecondSection} />
      {proceed && (
        <>
          {/* <SectionTwo
            proceedRef={proceedRef}
            scrollToSection={scrollToSection}
          /> */}
          <SectionStocks
            proceedRef={proceedRef}
            scrollToSection={scrollToSection}
            setShowReveal={setShowReveal}
          />
          {showReveal && <SectionThree sectionRef={sectionRef} />}
        </>
      )}
    </main>
  );
}

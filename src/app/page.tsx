"use client";

import SectionOne from "@/components/sections/SectionOne";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const renderStepComponent = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <SectionOne />;
      case 2:
        return <div>2 Section</div>;
      case 3:
        return <div>3 Section</div>;
      default:
        return <SectionOne />;
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <main className="flex flex-col items-center space-y-4">
      <div className="w-full">{renderStepComponent(step)}</div>

      {/* <div className="flex space-x-4">
        <button onClick={prevStep} className="">
          Previous
        </button>
        <button onClick={nextStep} className="">
          Next
        </button>
      </div> */}
    </main>
  );
}

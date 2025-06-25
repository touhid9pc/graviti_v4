"use client";

import SectionOne from "@/components/sections/SectionOne";
import SectionTwo from "@/components/sections/SectionTwo";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepComponent = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <SectionOne nextStep={nextStep} />;
      case 2:
        return <SectionTwo nextStep={nextStep} />;
      case 3:
        return <div>3 Section</div>;
      default:
        return <SectionOne nextStep={nextStep} />;
    }
  };

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

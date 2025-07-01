import React, { useState } from "react";
import DraggableCarousel from "../carousel/DraggableCarousel";
import TextComponent from "../textComponent/TextComponent";
import { useAppStore } from "@/store/useStore";
import { getRandomStyleObject } from "@/utils/common";

interface SectionTwoProps {
  scrollToSection: () => void;
  proceedRef: React.RefObject<HTMLDivElement | null>;
}

const SectionTwo: React.FC<SectionTwoProps> = ({
  scrollToSection,
  proceedRef,
}) => {
  const { nextStep } = useAppStore();

  return (
    <>
      <DraggableCarousel
        nextStep={nextStep}
        scrollToSection={scrollToSection}
        proceedRef={proceedRef}
      />
    </>
  );
};

export default SectionTwo;

import React from "react";
import DraggableCarousel from "../carousel/DraggableCarousel";
import TextComponent from "../textComponent/TextComponent";
import { useAppStore } from "@/store/useStore";

interface SectionTwoProps {
  nextStep: () => void;
}

const SectionTwo = () => {
  const { nextStep } = useAppStore();

  return (
    <>
      <DraggableCarousel nextStep={nextStep} />
    </>
  );
};

export default SectionTwo;

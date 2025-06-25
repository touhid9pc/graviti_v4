import React from "react";
import DraggableCarousel from "../carousel/DraggableCarousel";
import TextComponent from "../textComponent/TextComponent";

interface SectionTwoProps {
  nextStep: () => void;
}

const SectionTwo: React.FC<SectionTwoProps> = ({ nextStep }) => {
  return (
    <>
      <DraggableCarousel nextStep={nextStep} />
    </>
  );
};

export default SectionTwo;

import React from "react";
import Dock from "../dock/Dock";
import TextComponent from "../textComponent/TextComponent";
import Block from "../block/Block";
import CardsGrid from "../cardsGrid/CardsGrid";
import { motion } from "framer-motion";

interface SectionTwoProps {
  scrollToSection: () => void;
  proceedRef: React.RefObject<HTMLDivElement | null>;
  setShowReveal: (value: boolean) => void;
}
const SectionStocks: React.FC<SectionTwoProps> = ({
  scrollToSection,
  proceedRef,
  setShowReveal,
}) => {
  return (
    <motion.div
      //   initial={{ opacity: 0, y: 100 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   exit={{ opacity: 0, y: 0 }}
      //   transition={{ duration: 0.9 }}
      ref={proceedRef}
      className="flex flex-col justify-center items-center w-full h-max min-h-screen py-10 space-y-10 "
    >
      {/* <TextComponent /> */}
      {/* <div className="flex flex-col items-center text-center"> */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] text-center">
        Select 4 favourite brands to see how much wealth you would’ve made
      </h2>
      {/* </div> */}
      <CardsGrid
        scrollToSection={scrollToSection}
        proceedRef={proceedRef}
        setShowReveal={setShowReveal}
      />
      {/* <Block /> */}
      {/* <Dock /> */}
    </motion.div>
  );
};
export default SectionStocks;

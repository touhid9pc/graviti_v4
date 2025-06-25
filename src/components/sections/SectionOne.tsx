import React, { useEffect, useRef } from "react";
import CustomCursor from "../customCursor/CustomCursor";
import gsap from "gsap";

interface SectionOneProps {
  nextStep: () => void;
}

const SectionOne: React.FC<SectionOneProps> = ({ nextStep }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 50,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, []);
  return (
    <section
      className="w-full h-screen flex items-center justify-center overflow-hidden bg-custom"
      onClick={nextStep}
    >
      <CustomCursor />

      <h1
        ref={textRef}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center z-10 drop-shadow-lg"
      >
        Is the US stock market relevant for your wealth portfolio?
      </h1>
    </section>
  );
};

export default SectionOne;

import React, { useEffect, useRef } from "react";
import CustomCursor from "../customCursor/CustomCursor";
import gsap from "gsap";
import { useAppStore } from "@/store/useStore";
import BlobBackground from "../blobBackground/BlobBackground";
import AnimatedButton from "../animatedButton/AnimatedButton";

interface SectionOneProps {
  scrollToSecondSection: () => void;
}
const SectionOne: React.FC<SectionOneProps> = ({ scrollToSecondSection }) => {
  const { nextStep, setIsProceed, isProceed } = useAppStore();

  const textRef = useRef<HTMLHeadingElement>(null);
  const usStockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      [textRef.current, buttonRef.current],
      {
        opacity: 0,
        y: 50,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      }
    );

    tl.to(
      highlightRef.current,
      {
        scaleX: 1,
        duration: 0.35,
        ease: "power2.inOut",
      },
      "highlight"
    ).to(
      usStockRef.current,
      {
        color: "#f1f5f9",
        duration: 0.1,
        ease: "none",
      },
      "+=0.1"
    );
  }, []);

  return (
    <>
      {/* <CustomCursor /> */}

      <section
        ref={containerRef}
        className="w-full h-screen flex flex-col items-center justify-center relative z-20 !my-0 px-4 sm:px-5 gap-6"
        onClick={nextStep}
      >
        <div
          ref={textRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-slate-950 text-center z-25 drop-shadow-xl relative"
        >
          <div className="inline">
            Is the{" "}
            <div className="relative inline-block px-1 sm:px-1.5">
              <div
                ref={usStockRef}
                className="relative z-10 px-1.5 sm:px-2 py-0.5 sm:py-1 inline-block text-slate-950"
              >
                US stock
              </div>
              <div
                ref={highlightRef}
                className="absolute inset-0 bg-slate-900 scale-x-0 z-0 rounded-md"
                style={{
                  transformOrigin: "left",
                }}
              />
            </div>{" "}
            market relevant for your wealth portfolio?
          </div>
        </div>
        {!isProceed && (
          <div ref={buttonRef}>
            <AnimatedButton
              onClick={() => {
                setIsProceed(true);
                setTimeout(() => {
                  scrollToSecondSection();
                }, 300);
              }}
            >
              Proceed
            </AnimatedButton>
          </div>
        )}
      </section>
    </>
  );
};

export default SectionOne;

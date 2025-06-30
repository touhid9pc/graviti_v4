import React, { useEffect, useRef } from "react";
import CustomCursor from "../customCursor/CustomCursor";
import gsap from "gsap";
import { useAppStore } from "@/store/useStore";
import BlobBackground from "../blobBackground/BlobBackground";

const SectionOne = () => {
  const { nextStep } = useAppStore();

  const textRef = useRef<HTMLHeadingElement>(null);
  const usStockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
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
        className="w-full h-screen flex items-center justify-center relative z-20 !my-0 px-5"
        onClick={nextStep}
      >
        <div
          ref={textRef}
          className="text-xl md:text-3xl lg:text-5xl font-black text-slate-950 text-center z-25 drop-shadow-xl relative"
        >
          <div className="inline">
            Is the{" "}
            <div className="relative inline-block px-1 sm:px-2">
              <div
                ref={usStockRef}
                className="relative z-10 px-2 sm:px-3 py-1 sm:py-2 inline-block text-slate-950"
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
      </section>
    </>
  );
};

export default SectionOne;

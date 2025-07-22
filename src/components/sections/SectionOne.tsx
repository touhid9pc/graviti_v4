import React, { useEffect, useRef } from "react";
import CustomCursor from "../customCursor/CustomCursor";
import gsap from "gsap";
import { useAppStore } from "@/store/useStore";
import BlobBackground from "../blobBackground/BlobBackground";
import AnimatedButton from "../animatedButton/AnimatedButton";
import Image from "next/image";

interface SectionOneProps {
  scrollToSecondSection: () => void;
}
const SectionOne: React.FC<SectionOneProps> = ({ scrollToSecondSection }) => {
  const { nextStep, setIsProceed, isProceed } = useAppStore();

  const textRef = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLHeadingElement>(null);
  const usStockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const questionMarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      [textRef.current, spanRef.current, buttonRef.current],
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
        color: "#1a1a1a",
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
        className="w-full h-screen flex flex-col items-center justify-center relative z-20 !my-0 gap-6" //px-4 sm:px-5
        onClick={nextStep}
      >
        {/* <video
          muted
          autoPlay
          loop
          playsInline
          controls={false}
          className="absolute inset-0 w-screen h-screen object-cover grayscale-25"
        >
          <source src="/assets/videos/video.mp4" type="video/mp4" />
        </video> */}

        {/* <Image
          src={"/background1.webp"}
          alt="bg-image"
          fill
          className="absolute inset-0 w-screen h-screen object-cover"
        /> */}

        {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-xs z-0" /> */}

        <div className="inline-flex flex-wrap justify-center items-center">
          <span
            ref={textRef}
            id={"question-text"}
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-[#FAF9F6] text-center z-25 drop-shadow-xl relative"
          >
            <span className="inline">
              Is the{" "}
              <span className="relative inline-block px-1 sm:px-1.5">
                <span
                  ref={usStockRef}
                  className="relative z-20 px-1.5 sm:px-2 py-0.5 sm:py-1 inline-block text-[#FAF9F6]"
                >
                  US stock
                </span>
                <span
                  ref={highlightRef}
                  className="absolute inset-0 bg-[#FAF9F6] scale-x-0 z-0 rounded-xs"
                  style={{
                    transformOrigin: "left",
                  }}
                />
              </span>{" "}
              market relevant for your wealth portfolio
            </span>
            <span
              ref={questionMarkRef}
              className=" text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-[#FAF9F6] text-center z-25 drop-shadow-sm "
              style={{ transformOrigin: "center" }}
            >
              ?
            </span>
          </span>
        </div>

        {!isProceed && (
          <div ref={buttonRef} onClick={(e) => console.log(e.target)}>
            <AnimatedButton
              className="!font-bold !z-11"
              id="cta-proceed"
              data-analytics="cta_proceed_button"
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

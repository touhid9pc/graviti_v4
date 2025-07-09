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
  const usStockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const questionMarkRef = useRef<HTMLSpanElement>(null);

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
        color: "#Faf9f6",
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
          src={"/background.png"}
          alt="bg-image"
          fill
          className="absolute inset-0 w-screen h-screen object-cover"
        /> */}

        {/* <div className="absolute inset-0 bg-black/20 backdrop-blur-xs z-0" /> */}

        <div className="inline-flex flex-wrap justify-center items-center">
          <span
            ref={textRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-[#1a1a1a] text-center z-25 drop-shadow-xl relative"
          >
            <span className="inline">
              Is the{" "}
              <span className="relative inline-block px-1 sm:px-1.5">
                <span
                  ref={usStockRef}
                  className="relative z-20 px-1.5 sm:px-2 py-0.5 sm:py-1 inline-block text-[#1a1a1a]"
                >
                  US stock
                </span>
                <span
                  ref={highlightRef}
                  className="absolute inset-0 bg-[#1a1a1a] scale-x-0 z-0 rounded-md"
                  style={{
                    transformOrigin: "left",
                  }}
                />
              </span>{" "}
              market relevant for your wealth portfolio
            </span>
          </span>
          <span
            ref={questionMarkRef}
            className=" text-lg sm:text-xl md:text-2xl lg:text-4xl font-black text-[#1a1a1a] text-center z-25 drop-shadow-sm "
            style={{ transformOrigin: "center" }}
          >
            ?
          </span>
        </div>

        {!isProceed && (
          <div ref={buttonRef}>
            <AnimatedButton
              onClick={() => {
                setIsProceed(true);

                const el = questionMarkRef.current;
                const rect = el?.getBoundingClientRect();
                const text = textRef.current;
                const button = buttonRef.current;

                if (el && rect && text && button) {
                  const centerX =
                    window.innerWidth / 2 - rect.left - rect.width / 2;
                  const centerY =
                    window.innerHeight / 2 - rect.top - rect.height / 2;

                  // Step 1: Quickly hide all content except '?'
                  gsap.to([text, button], {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.out",
                    onComplete: () => {
                      // Step 2: Zoom the ? mark after content hides
                      gsap.to(el, {
                        scale: 10,
                        x: centerX,
                        y: centerY,
                        duration: 0.7,
                        ease: "power3.out",
                        onComplete: () => {
                          // Step 3: Scroll and reset
                          scrollToSecondSection();

                          // Reset after scroll completes
                          setTimeout(() => {
                            // Reset ? mark
                            gsap.to(el, {
                              scale: 1,
                              x: 0,
                              y: 0,
                              duration: 0.6,
                              ease: "power3.out",
                            });

                            // Fade text and button back in
                            gsap.to([text, button], {
                              opacity: 1,
                              duration: 0.4,
                              ease: "power1.inOut",
                            });
                          }, 1000); // wait ~1s for scroll
                        },
                      });
                    },
                  });
                }
              }}
              className="!font-bold"
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

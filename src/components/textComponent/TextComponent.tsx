import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextComponent: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const ctx = gsap.context(() => {
      const words = headingEl.querySelectorAll<HTMLSpanElement>(".word");

      gsap.set(words, {
        x: -120,
        opacity: 0,
        // filter: "blur(10px)"
      });

      gsap.to(words, {
        x: 0,
        opacity: 1,
        // filter: "blur(0px)",
        ease: "power4.out",
        stagger: isMobile ? 0.12 : 0.15,
        duration: 1.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: headingEl,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const headingText = `Select your favourite brands to see how much wealth you would’ve made`;
  const words = headingText.split(" ");

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col space-y-6 sm:space-y-8 lg:space-y-10 items-center text-center">
        <h1
          ref={headingRef}
          className="
            text-2xl sm:text-4xl md:text-5xl lg:text-6xl
            font-extrabold text-black
            flex flex-wrap justify-center items-center
            leading-tight max-w-7xl tracking-tight
          "
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="
                word inline-block opacity-0
                mx-1 sm:mx-2 md:mx-2.5
              "
              style={{ whiteSpace: "nowrap" }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default TextComponent;

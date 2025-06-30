"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextComponent: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
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
      gsap.fromTo(
        headingEl,
        {
          opacity: 0,
          y: 30,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1.2,
          delay: 0.2,
          scrollTrigger: {
            trigger: headingEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const headingText = `Select your favourite brands to see how much wealth you would’ve made`;

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col items-center text-center">
        <h1
          ref={headingRef}
          className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] opacity-0"
        >
          {headingText}
        </h1>
      </div>
    </div>
  );
};

export default TextComponent;

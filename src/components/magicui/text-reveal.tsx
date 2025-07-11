"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

interface TextRevealProps {
  children: string;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    if (!wrapperRef.current || !paragraphRef.current) return;

    const split = new SplitText(paragraphRef.current, {
      type: "words",
      wordsClass: "reveal-word",
    });

    const animation = gsap.fromTo(
      split.words,
      { opacity: 0.5 },
      {
        opacity: 1,

        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => {
            // Dynamically calculate scroll length without using window
            const height = paragraphRef.current?.offsetHeight ?? 0;
            return `+=${height * 2}`; // Customize multiplier as needed
          },
          anticipatePin: 1,
          markers: false,
        },
      }
    );

    return () => {
      split.revert();
      animation.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full flex items-center justify-center h-screen px-4 sm:px-6 md:px-8 ${className}`}
    >
      <p
        ref={paragraphRef}
        className="text-[0.9rem] md:text-xl w-full max-w-4xl mx-auto lg:text-2xl xl:text-3xl font-semibold text-slate-50 leading-relaxed text-start md:text-center lg:text-start"
      >
        {children}
      </p>
    </div>
  );
};

export default TextReveal;

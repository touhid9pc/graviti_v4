"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedButtonProps {
  name?: string;
  className?: string;
  children?: any;
}

export default function AnimatedButton({
  name,
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    // const wiggle = () => {
    //   gsap
    //     .timeline()
    //     .to(btn, { rotate: 5, duration: 0.1 })
    //     .to(btn, { rotate: -5, duration: 0.1 })
    //     .to(btn, { rotate: 0, duration: 0.1 });
    // };

    const moveText = (e: MouseEvent) => {
      const bounds = btn.getBoundingClientRect();
      const offsetX = e.clientX - bounds.left - bounds.width / 2;
      const offsetY = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(text, {
        x: offsetX * 0.2,
        y: offsetY * 0.2,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(btn, {
        x: offsetX * 0.2,
        y: offsetY * 0.2,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const resetText = () => {
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });

      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });
    };

    // btn.addEventListener("mouseenter", wiggle);
    btn.addEventListener("mousemove", moveText);
    btn.addEventListener("mouseleave", resetText);

    return () => {
      //   btn.removeEventListener("mouseenter", wiggle);
      btn.removeEventListener("mousemove", moveText);
      btn.removeEventListener("mouseleave", resetText);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`${className} group relative w-max rounded-full 
              backdrop-blur-md border border-white/20 ring-1 ring-white/10 
              bg-[#e3e0da] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
              px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-black 
              transition-colors duration-300`}
      {...props}
    >
      <span ref={textRef} className="block relative z-10">
        {children || name}
      </span>
    </button>
  );
}

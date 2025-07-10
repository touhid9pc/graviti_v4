"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  className?: string;
  children?: React.ReactNode;
  spanClassName?: string;
}

export default function AnimatedButton({
  name,
  className = "",
  children,
  disabled,
  spanClassName,
  ...props
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text || disabled) return;

    const move = (x: number, y: number) => {
      const bounds = btn.getBoundingClientRect();
      const offsetX = x - bounds.left - bounds.width / 2;
      const offsetY = y - bounds.top - bounds.height / 2;

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

    const reset = () => {
      gsap.to([btn, text], {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });
    };

    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        move(touch.clientX, touch.clientY);
      }
    };

    const onMouseLeave = reset;
    const onTouchEnd = reset;

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);
    btn.addEventListener("touchmove", onTouchMove);
    btn.addEventListener("touchend", onTouchEnd);

    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
      btn.removeEventListener("touchmove", onTouchMove);
      btn.removeEventListener("touchend", onTouchEnd);
    };
  }, [disabled]);

  return (
    <button
      ref={btnRef}
      disabled={disabled}
      className={`
    group relative w-max rounded-full 
    py-2 px-6 text-sm sm:text-base font-medium
    backdrop-blur-md border border-white/10 bg-white/5
    text-white ring-1 ring-white/10 shadow-inner
    hover:bg-white/10 hover:ring-white/20 hover:shadow-xl
    active:scale-95 active:ring-white/30
    focus:outline-none focus:ring-2 focus:ring-white/30
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    transition-all duration-300 !cursor-pointer
    ${className}
  `}
      {...props}
    >
      <span
        ref={textRef}
        className={`flex justify-center items-center relative z-10 ${spanClassName}`}
      >
        {children || name}
      </span>

      {/* Optional: Glow Effect */}
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-30 group-hover:opacity-50 transition duration-300 blur-xl"
        aria-hidden
      />
    </button>
  );
}

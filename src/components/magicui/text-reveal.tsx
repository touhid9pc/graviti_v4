"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 md:h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[60%] px-[1rem] py-[5rem]"
        }
      >
        <span
          ref={targetRef}
          className={
            "flex flex-wrap p-0 text-base font-bold text-slate-500 md:p-8 md:text-xl lg:p-10 lg:text-2xl " 
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.8, 1]); // scale from 0.8 to 1

  return (
    <span className="relative mx-1 lg:mx-1">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity, scale: scale }}
        className="text-slate-900"
      >
        {children}
      </motion.span>
    </span>
  );
};

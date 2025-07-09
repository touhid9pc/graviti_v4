"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface RollingTextProps {
  messages: string[];
  className?: string;
  textClassName?: string;
}

const RollingText: React.FC<RollingTextProps> = ({
  messages = [],
  className = "",
  textClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !listRef.current || messages.length === 0)
      return;

    tl.current?.kill();

    const container = containerRef.current;
    const list = listRef.current;
    const firstItem = list.children[0] as HTMLElement;
    const itemHeight = firstItem.offsetHeight;
    const listLength = messages.length;

    container.style.height = `${itemHeight}px`;

    const totalHeight = itemHeight * listLength;

    tl.current = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < listLength; i++) {
      tl.current.to({}, { duration: 2 }); // pause 3 seconds
      tl.current.to(list, {
        y: `-=${itemHeight}`,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }

    tl.current.to(list, { y: 0, duration: 0 });

    return () => {
      tl.current?.kill();
    };
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
    >
      <div ref={listRef} className={`flex flex-col ${textClassName}`}>
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="w-full text-center whitespace-nowrap">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingText;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardStackProps {
  images: string[];
  offset?: number;
  scaleFactor?: number;
}

export const CardStack = ({
  images,
  offset = 20,
  scaleFactor = 0.04,
}: CardStackProps) => {
  const [imageStack, setImageStack] = useState(images);

  const moveToEnd = () => {
    setImageStack((prev) => {
      const newStack = [...prev];
      const first = newStack.shift();
      if (first) newStack.push(first);
      return newStack;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveToEnd();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 w-60 md:h-64 md:w-100">
      {imageStack.map((src, index) => (
        <motion.div
          key={src}  
          className="absolute rounded-sm overflow-hidden h-60 w-60 md:h-64 md:w-100 "
          style={{ transformOrigin: "top center" }}
          layout  
          animate={{
            top: index * -offset,
            scale:  1- index * scaleFactor,
            zIndex: imageStack.length - index,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }} 
        >
          <Image
            src={src}
            alt={`Image ${index}`}
            objectFit="contain"
            fill
            priority={index === 0}
          />
        </motion.div>
      ))}
    </div>
  );
};

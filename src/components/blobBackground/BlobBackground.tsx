"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// FloatingBlobBackground Component
interface FloatingBlobBackgroundProps {
  children?: ReactNode;
}

const BlobBackground: React.FC<FloatingBlobBackgroundProps> = ({
  children,
}) => {
  // Common transition for continuous, smooth animation
  const commonTransition = {
    duration: 20,
    ease: "linear" as const,
    repeat: Infinity,
    repeatType: "mirror" as const,
  };

  // Define keyframes for morphing paths
  const morphPaths1 = {
    initial:
      "M898.5 612.5Q810 725 708 775.5t-209 53Q392 831 361.5 727t-166-165.5Q60 500 190.5 435t187-101.5Q434 297 494.5 313t202-21.5Q838 254 912.5 377t-14 235.5Z",
    animate:
      "M900 600Q820 700 710 760t-210 60Q390 820 350 720t-170-160Q50 500 180 430t190-100Q430 300 500 320t200-20Q840 260 910 380t-10 220Z",
  };

  const morphPaths2 = {
    initial:
      "M396.5 269.5Q422 299 420 334t-48.5 29Q325 357 307.5 374.5t-42.5 39Q240 435 218 406t-43 0.5Q154 358 133.5 345.5t-34-34Q86 290 67 265t-19-47Q48 196 90.5 158t42.5-45.5Q142 105 159 74.5t49 14Q240 114 269 88t38.5 10Q317 134 373.5 118t64 19.5Q445 173 408 206.5t-11.5 63Z",
    animate:
      "M400 270Q430 310 425 340t-50 25Q325 360 310 380t-40 45Q245 440 220 410t-45-5Q155 360 135 350t-35-30Q85 290 65 260t-20-50Q45 190 85 155t45-40Q140 105 160 75t50 15Q240 120 270 90t40 10Q320 130 370 115t60 20Q440 170 410 205t-10 65Z",
  };

  const morphPaths3 = {
    initial:
      "M392.5 282.5Q445 325 422.5 362.5t-67.5 42Q310 409 275 428.5t-74-10Q162 429 117.5 418t-48.5-51Q65 313 61 276.5t-4-58.5Q57 196 160 190.5t31-30Q197 136 218.5 97t66.5-56.5Q330 23 364.5 52t64.5 63Q459 149 399.5 194.5t-7 88Z",
    animate:
      "M390 280Q440 320 420 360t-65 45Q310 410 270 430t-70-15Q160 425 120 415t-50-50Q60 310 60 275t0-60Q60 195 155 190t35-25Q195 135 220 95t65-55Q330 20 365 50t65 65Q460 150 400 195t-10 85Z",
  };

  const morphPaths4 = {
    initial:
      "M380 260Q430 300 410 340t-60 30Q300 350 270 370t-50 10Q200 390 150 370t-50-50Q100 300 80 260t0-60Q80 200 120 170t50-30Q200 110 240 90t50 20Q300 150 340 170t40 90Z",
    animate:
      "M390 265Q435 305 415 345t-55 35Q305 355 275 375t-55 5Q200 395 145 375t-55-55Q90 295 75 255t0-65Q75 195 115 165t55-25Q200 105 245 85t55 25Q305 145 345 165t45 100Z",
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-500 via-[#1E3A8A] via-[#32bdaf] via-[#FFFFFF]  to-slate-700">
      {/* Blob 1 */}
      <motion.svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[10%] left-1/2 w-[1000px] h-[1000px] blur-3xl -translate-x-1/2 z-[1]"
        initial={{ x: "-50%", y: "0%", scale: 0.9, rotate: 5, opacity: 0.7 }}
        animate={{
          x: ["-50%", "-60%", "-40%", "-70%", "-50%"],
          y: ["0%", "20%", "-10%", "30%", "0%"],
          scale: [0.9, 1.1, 0.95, 1.05, 0.9],
          rotate: [5, -5, 10, -10, 5],
          opacity: [0.7, 0.8, 0.5, 0.7],
        }}
        transition={{ ...commonTransition, duration: 20 }}
      >
        <defs>
          <linearGradient
            id="galaxyGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="40%" stopColor="rgba(135, 206, 235, 0.5)" />
            <stop offset="70%" stopColor="rgba(173, 216, 230, 0.4)" />
            <stop offset="80%" stopColor="rgba(70, 130, 180, 0.5)" />
          </linearGradient>
        </defs>
        <motion.path
          d={morphPaths1.initial}
          animate={{
            d: [morphPaths1.initial, morphPaths1.animate, morphPaths1.initial],
          }}
          transition={{ ...commonTransition, duration: 20 }}
          fill="url(#galaxyGradient1)"
        />
      </motion.svg>

      {/* Blob 2 */}
      <motion.svg
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[15%] left-[5%] w-[900px] h-[900px] blur-3xl z-[2] "
        initial={{ x: "0%", y: "0%", scale: 0.95, rotate: 3, opacity: 0.6 }}
        animate={{
          x: ["0%", "10%", "-5%", "15%", "0%"],
          y: ["0%", "-10%", "5%", "-15%", "0%"],
          scale: [0.95, 1.05, 0.9, 1.1, 0.95],
          rotate: [3, -3, 6, -6, 3],
          opacity: [0.7, 0.8, 0.5, 0.7],
        }}
        transition={{ ...commonTransition, duration: 21 }}
      >
        <defs>
          <linearGradient
            id="galaxyGradient2"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="20%" stopColor="rgba(182, 208, 226, 0.4)" />
            <stop offset="30%" stopColor="rgba(100, 149, 237, 0.5)" />
            <stop offset="60%" stopColor="rgba(70, 130, 180, 0.5)" />
          </linearGradient>
        </defs>
        <motion.path
          d={morphPaths2.initial}
          animate={{
            d: [morphPaths2.initial, morphPaths2.animate, morphPaths2.initial],
          }}
          transition={{ ...commonTransition, duration: 21 }}
          fill="url(#galaxyGradient2)"
        />
      </motion.svg>

      {/* Blob 3 */}
      <motion.svg
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[5%] right-[5%] w-[850px] h-[850px] blur-3xl z-[3] "
        initial={{ x: "0%", y: "0%", scale: 0.85, rotate: 7, opacity: 0.5 }}
        animate={{
          x: ["0%", "-15%", "10%", "-20%", "0%"],
          y: ["0%", "15%", "-10%", "20%", "0%"],
          scale: [0.85, 1.15, 0.9, 1.2, 0.85],
          rotate: [7, -7, 14, -14, 7],
          opacity: [0.7, 0.8, 0.5, 0.7],
        }}
        transition={{ ...commonTransition, duration: 22 }}
      >
        <defs>
          <linearGradient
            id="galaxyGradient3"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="30%" stopColor="rgba(65, 105, 225, 0.4)" />
            <stop offset="60%" stopColor="rgba(100, 149, 237, 0.5)" />
            <stop offset="20%" stopColor="rgba(135, 206, 235, 0.45)" />
          </linearGradient>
        </defs>
        <motion.path
          d={morphPaths3.initial}
          animate={{
            d: [morphPaths3.initial, morphPaths3.animate, morphPaths3.initial],
          }}
          transition={{ ...commonTransition, duration: 22 }}
          fill="url(#galaxyGradient3)"
        />
      </motion.svg>

      {/* Blob 4 */}
      <motion.svg
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[10%] left-[10%] w-[950px] h-[950px] blur-3xl z-[4] "
        initial={{ x: "0%", y: "0%", scale: 1, rotate: 4, opacity: 0.55 }}
        animate={{
          x: ["0%", "20%", "-10%", "25%", "0%"],
          y: ["0%", "-15%", "10%", "-20%", "0%"],
          scale: [1, 1.2, 1.05, 1.15, 1],
          rotate: [4, -4, 8, -8, 4],
          opacity: [0.7, 0.8, 0.5, 0.7],
        }}
        transition={{ ...commonTransition, duration: 23 }}
      >
        <defs>
          <linearGradient
            id="galaxyGradient4"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop offset="10%" stopColor="rgba(70, 130, 180, 0.6)" />
            <stop offset="30%" stopColor="rgba(135, 206, 235, 0.6)" />
            <stop offset="60%" stopColor="rgba(65, 105, 225, 0.5)" />
          </linearGradient>
        </defs>
        <motion.path
          d={morphPaths4.initial}
          animate={{
            d: [morphPaths4.initial, morphPaths4.animate, morphPaths4.initial],
          }}
          transition={{ ...commonTransition, duration: 23 }}
          fill="url(#galaxyGradient4)"
        />
      </motion.svg>

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default BlobBackground;

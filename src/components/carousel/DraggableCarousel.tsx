"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "../animatedButton/AnimatedButton";
import TextComponent from "../textComponent/TextComponent";

interface CarouselCardData {
  id: number;
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
  tintColorClass: string;
}

const carouselData: CarouselCardData[] = [
  {
    id: 1,
    title: "Amazon",
    icon: "/assets/stocks/1.png",
    bgColor: "bg-gradient-to-br from-yellow-200 to-yellow-300",
    textColor: "text-black",
    tintColorClass: "from-yellow-400",
  },
  {
    id: 2,
    title: "Walmart",
    icon: "/assets/stocks/2.png",
    bgColor: "bg-gradient-to-br from-indigo-200 to-indigo-300",
    textColor: "text-black",
    tintColorClass: "from-indigo-400",
  },
  {
    id: 3,
    title: "Tesla",
    icon: "/assets/stocks/3.png",
    bgColor: "bg-gradient-to-br from-rose-200 to-rose-300",
    textColor: "text-black",
    tintColorClass: "from-rose-400",
  },
  {
    id: 4,
    title: "Hp",
    icon: "/assets/stocks/4.png",
    bgColor: "bg-gradient-to-br from-green-200 to-green-300",
    textColor: "text-black",
    tintColorClass: "from-green-400",
  },
  {
    id: 5,
    title: "Intel",
    icon: "/assets/stocks/5.png",
    bgColor: "bg-gradient-to-br from-sky-200 to-sky-300",
    textColor: "text-black",
    tintColorClass: "from-sky-400",
  },
  {
    id: 6,
    title: "JP Morgan",
    icon: "/assets/stocks/6.png",
    bgColor: "bg-gradient-to-br from-purple-200 to-purple-300",
    textColor: "text-black",
    tintColorClass: "from-purple-400",
  },
  {
    id: 7,
    title: "Microsoft",
    icon: "/assets/stocks/7.png",
    bgColor: "bg-gradient-to-br from-pink-200 to-pink-300",
    textColor: "text-black",
    tintColorClass: "from-pink-400",
  },
  {
    id: 8,
    title: "Nvidia",
    icon: "/assets/stocks/8.png",
    bgColor: "bg-gradient-to-br from-red-200 to-red-300",
    textColor: "text-black",
    tintColorClass: "from-red-400",
  },
  {
    id: 9,
    title: "Chevron",
    icon: "/assets/stocks/9.png",
    bgColor: "bg-gradient-to-br from-teal-200 to-teal-300",
    textColor: "text-black",
    tintColorClass: "from-teal-400",
  },
  {
    id: 10,
    title: "Visa",
    icon: "/assets/stocks/10.png",
    bgColor: "bg-gradient-to-br from-lime-200 to-lime-300",
    textColor: "text-black",
    tintColorClass: "from-lime-400",
  },
  {
    id: 11,
    title: "Apple",
    icon: "/assets/stocks/11.png",
    bgColor: "bg-gradient-to-br from-blue-200 to-blue-300",
    textColor: "text-black",
    tintColorClass: "from-blue-400",
  },
  {
    id: 12,
    title: "Coca Cola",
    icon: "/assets/stocks/12.png",
    bgColor: "bg-gradient-to-br from-orange-200 to-orange-300",
    textColor: "text-black",
    tintColorClass: "from-orange-400",
  },
];

interface DraggableCarouselProps {
  nextStep: () => void;
}

const DraggableCarousel: React.FC<DraggableCarouselProps> = ({ nextStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CarouselCardData[]>([]);
  const swipeSoundRef = useRef<HTMLAudioElement | null>(null);

  const total = carouselData.length;

  useEffect(() => {
    setIsMounted(true);
    swipeSoundRef.current = new Audio("/assets/sounds/swipe.mp3");

    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Responsive arc radius and spacing
  const getVisibleCount = () => {
    if (windowWidth < 768) return 3; // Mobile
    return 5; // Tablet and desktop
  };

  const visibleCount = getVisibleCount();
  const radius = 15;
  const angleSpread = 28;

  const playSwipeSound = () => {
    if (swipeSoundRef.current) {
      swipeSoundRef.current.currentTime = 0;
      swipeSoundRef.current.play().catch(() => {});
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    playSwipeSound();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    playSwipeSound();
  };

  const handleReveal = () => {
    if (selectedCard?.length === 4) {
      nextStep();
    }
    if (selectedCard?.length < 4 || selectedCard?.length > 4) {
      alert("Please Select 4 Cards");
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-pulse text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col overflow-hidden relative">
      <div className="absolute top-8 left-[50%] translate-x-[-50%] w-full">
        <TextComponent />
      </div>

      {/* Animated radial background tint from center */}
      <motion.div
        key={carouselData[currentIndex].id}
        initial={{ scale: 0.5, opacity: 0.1 }}
        animate={{ scale: 2, opacity: 0.25 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none z-10 will-change-transform"
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full blur-3xl ${carouselData[currentIndex].tintColorClass}`}
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage:
              "radial-gradient(circle at center, var(--tw-gradient-from), transparent 100%)",
          }}
        />
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="hidden absolute left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 lg:flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white/90"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="hidden absolute right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 lg:flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white/90"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Main carousel container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full"
      >
        <div className="relative w-full h-[24rem] sm:h-[28rem] md:h-[32rem] xl:h-[36rem] flex justify-center items-center">
          {/* Carousel cards */}
          {[...Array(visibleCount)].map((_, i) => {
            const offset = i - Math.floor(visibleCount / 2);
            const cardIndex = (currentIndex + offset + total) % total;
            const item = carouselData[cardIndex];

            const angleDeg = offset * angleSpread;
            const angleRad = (angleDeg * Math.PI) / 180;

            const xOffset = Math.sin(angleRad) * radius;
            // const yOffset = Math.cos(angleRad) * radius * -0.4;
            const yOffset = 0;

            const isCenter = offset === 0;
            const scale = isCenter
              ? 1
              : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
            const rotate = angleDeg * 0.4;
            const zIndex = 100 - Math.abs(offset);
            const opacity = isCenter
              ? 1
              : Math.max(0.5, 1 - Math.abs(offset) * 0.25);

            const isSelected = selectedCard.some((c) => c.id === item.id);

            return (
              <motion.div
                key={`${item.id}-${cardIndex}`}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.05 }}
                onDragEnd={(e, info) => {
                  const threshold = windowWidth < 768 ? 50 : 80;
                  if (info.offset.x < -threshold) {
                    handleNext();
                  } else if (info.offset.x > threshold) {
                    handlePrev();
                  }
                }}
                animate={{
                  x: `${xOffset}rem`,
                  y: `${yOffset}rem`,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                className="absolute cursor-grab active:cursor-grabbing h-full"
                style={{ zIndex }}
                onClick={() =>
                  setSelectedCard((prev) => {
                    if (isSelected) {
                      return prev.filter((card) => card?.id !== item?.id);
                    } else {
                      return [...prev, item];
                    }
                  })
                }
              >
                <Card
                  className={`${item.bgColor} ${item.textColor} border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden relative backdrop-blur-sm w-[15rem] h-full sm:w-[18rem] md:w-[20rem] md:h-full lg:w-[21rem] lg:h-full xl:w-[26rem]`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        key={`overlay-${item.id}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 2 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        className="absolute inset-0 bg-green-500/20 backdrop-blur-sm z-20 flex items-center justify-center rounded-full"
                      >
                        <Check size={40} color="white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col items-center justify-center relative">
                    {/* Subtle pattern overlay */}
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" /> */}

                    {/* Icon container */}
                    <motion.div
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="mb-4 sm:mb-6 relative z-10"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 flex justify-center items-center bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-inner">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl filter drop-shadow-lg">
                          <Image
                            src={item.icon}
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-full h-full"
                            loading="lazy"
                            priority={false}
                          />
                        </span>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center relative z-10 tracking-wide drop-shadow-md"
                    >
                      {item.title}
                    </motion.h3>

                    {/* Subtle accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-12 sm:w-16 h-0.5 bg-white/40 mt-3 sm:mt-4 rounded-full"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          <div className="absolute -bottom-30 left-[50%] translate-x-[-50%]">
            {/* {selectedCard?.length >= 3 ? ( */}
            <div className="flex justify-center items-center">
              <AnimatedButton
                name="Reveal"
                onClick={handleReveal}
                disabled={selectedCard?.length < 4}
              />
            </div>
            {/* ) : (
              <p className="text-center text-5xl text-gray-600">
                Select atleast 3 Cards
              </p>
            )} */}
          </div>
        </div>
        {/* Indicators */}
        {/* <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-slate-600 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div> */}
      </motion.div>
    </div>
  );
};

export default DraggableCarousel;

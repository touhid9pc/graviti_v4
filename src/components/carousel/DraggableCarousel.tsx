"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, Shuffle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "../animatedButton/AnimatedButton";
import TextComponent from "../textComponent/TextComponent";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, firebaseDb, googleAuthProvider } from "@/firebase/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { shuffleArray } from "@/utils/common";
import { CarouselCardData, carouselData } from "@/constants/constant";
import { useAppStore } from "@/store/useStore";

interface DraggableCarouselProps {
  nextStep: () => void;
}

const DraggableCarousel: React.FC<DraggableCarouselProps> = ({ nextStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CarouselCardData[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [shuffledData, setShuffledData] = useState(() =>
    shuffleArray(carouselData)
  );

  const { prevStep } = useAppStore();

  const swipeSoundRef = useRef<HTMLAudioElement | null>(null);

  const isDraggingRef = useRef<boolean>(false);

  const total = shuffledData.length;

  useEffect(() => {
    swipeSoundRef.current = new Audio("/assets/sounds/swipe.mp3");
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(loaderTimeout);
    };
  }, []);

  const getVisibleCount = () => {
    // if (windowWidth < 768) return 3;
    return 5;
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

  const handleReveal = async () => {
    // if (selectedCard?.length !== 4) {
    //   return toast.error("Please select exactly 4 cards");
    // }

    // try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    if (!user) {
      return toast.error("Authentication failed.");
    }

    const userRef = doc(firebaseDb, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // if (userSnap.exists()) {
    //   return toast.error("You have already signed in once. Access denied.");
    // }

    await setDoc(userRef, {
      uid: user?.uid,
      email: user?.email,
      name: user?.displayName,
      createdAt: new Date(),
      referredBy: null,
    });

    await addDoc(collection(firebaseDb, "interests"), {
      companies: selectedCard,
      triviaScore: 49,
      uid: `${user?.uid}1`,
      timestamp: new Date(),
    });

    toast.success("Signed in successfully. Great to have you here 🙌.");
    nextStep();
    // } catch (error) {
    //   console.error("Firebase error:", error);
    //   toast.error("Error during sign-up. Please try again.");
    // }
  };

  if (showLoader) {
    return (
      <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black animate-pulse drop-shadow-xl tracking-wide">
          💸 Manifesting market gains...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col overflow-hidden relative px-4 sm:px-8">
      {/* Header */}
      <div className="absolute top-10 lg:top-[6rem] left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-40">
        <TextComponent />

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <button
            className="px-5 py-4 text-sm sm:text-base font-semibold rounded-xl bg-white text-black border border-gray-200"
            onClick={prevStep}
          >
            <ChevronLeft />
          </button>

          <button
            className="px-5 py-2 text-sm sm:text-base font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 transition-all flex justify-center items-center"
            onClick={() => setShuffledData(shuffleArray(carouselData))}
          >
            <Shuffle className="mr-2" /> Surprise Me
          </button>
        </div>
      </div>

      {/* Animated radial background tint from center */}
      <motion.div
        key={shuffledData[currentIndex].id}
        initial={{ scale: 0.5, opacity: 0.1 }}
        animate={{ scale: 2, opacity: 0.25 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none z-10 will-change-transform"
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full blur-3xl ${shuffledData[currentIndex].tintColorClass}`}
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
        className="relative w-full pt-[10rem] sm:pt-[12rem]" // push carousel down to avoid overlap
      >
        <div className="relative w-full h-[24rem] sm:h-[28rem] md:h-[32rem] xl:h-[36rem] flex justify-center items-center">
          {/* Carousel cards */}
          {[...Array(visibleCount)].map((_, i) => {
            const offset = i - Math.floor(visibleCount / 2);
            const cardIndex = (currentIndex + offset + total) % total;
            const item = shuffledData[cardIndex];

            const angleDeg = offset * angleSpread;
            const angleRad = (angleDeg * Math.PI) / 180;

            const xOffset = Math.sin(angleRad) * radius;
            const yOffset = Math.cos(angleRad) * radius * -0.4;
            // const yOffset = 0;

            const isCenter = offset === 0;
            const scale = isCenter
              ? 1
              : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
            const rotate = angleDeg * 0.4;
            const zIndex = 100 - Math.abs(offset);
            const opacity = isCenter
              ? 1
              : Math.max(0.5, 1 - Math.abs(offset) * 0.25);

            const isSelected = selectedCard.some(
              (card) => card?.id === item?.id
            );

            return (
              <motion.div
                key={`${item.id}-${cardIndex}`}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.05 }}
                onDragStart={() => {
                  isDraggingRef.current = true;
                }}
                onDragEnd={(e, info) => {
                  isDraggingRef.current = false;

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
                onClick={() => {
                  if (isDraggingRef.current) return;

                  if (!isSelected && selectedCard.length === 4) {
                    toast.error("Please select only 4 cards");
                    return;
                  }

                  setSelectedCard((prev) => {
                    if (isSelected) {
                      return prev.filter((card) => card.id !== item.id);
                    } else {
                      return [...prev, item];
                    }
                  });
                }}
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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
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
            {selectedCard?.length >= 4 ? (
              <div className="flex justify-center items-center">
                <AnimatedButton
                  name="Reveal"
                  onClick={handleReveal}
                  // disabled={selectedCard?.length < 4}
                />
              </div>
            ) : (
              <p className="text-center text-xl sm:text-3xl md:text-3xl lg:text-5xl text-[#1a1a1a]">
                {`Selected ${selectedCard?.length}/4`}
              </p>
            )}
          </div>
        </div>
        {/* Indicators */}
        {/* <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {shuffledData.map((_, index) => (
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

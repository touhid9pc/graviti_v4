"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, RotateCcw, Shuffle } from "lucide-react";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AnimatedButton from "../animatedButton/AnimatedButton";
import TextComponent from "../textComponent/TextComponent";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, firebaseDb, googleAuthProvider } from "@/firebase/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { calculateStockProfit, shuffleArray } from "@/utils/common";
import { CarouselCardData, carouselData } from "@/constants/constant";
import { useAppStore } from "@/store/useStore";

interface DraggableCarouselProps {
  nextStep: () => void;
  scrollToSection: () => void;
}

const DraggableCarousel: React.FC<DraggableCarouselProps> = ({
  nextStep,
  scrollToSection,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CarouselCardData[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [shuffledData, setShuffledData] = useState(() =>
    shuffleArray(carouselData)
  );

  const { prevStep, setInterestsData, interestsData, user, setUser } =
    useAppStore();

  const swipeSoundRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const total = shuffledData.length;

  // Memoize window resize handler
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    swipeSoundRef.current = new Audio("/assets/sounds/swipe.mp3");
    handleResize();
    window.addEventListener("resize", handleResize);

    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(loaderTimeout);
    };
  }, [handleResize]);

  // Memoize visible count calculation
  const visibleCount = useMemo(() => {
    return 5; // Keep it simple and consistent
  }, []);

  const radius = 60;
  const angleSpread = 25;

  const playSwipeSound = useCallback(() => {
    if (swipeSoundRef.current) {
      swipeSoundRef.current.currentTime = 0;
      swipeSoundRef.current.play().catch(() => {});
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Memoize selected card IDs for faster lookup
  const selectedCardIds = useMemo(
    () => new Set(selectedCard.map((card) => card.id)),
    [selectedCard]
  );

  const handleCardSelect = useCallback(
    (item: CarouselCardData) => {
      const isSelected = selectedCardIds.has(item.id);

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
    },
    [selectedCardIds, selectedCard.length]
  );

  const handleReveal = useCallback(async () => {
    try {
      if (!user) {
        const result = await signInWithPopup(auth, googleAuthProvider);

        const userRef = doc(firebaseDb, "users", result?.user.uid);
        const userSnap = await getDoc(userRef);

        await setDoc(userRef, {
          uid: result?.user?.uid,
          email: result?.user?.email,
          name: result?.user?.displayName,
          createdAt: new Date(),
          referredBy: null,
        });

        setUser(result?.user);
        toast.success(
          `Signed in successfully. Great to have you here ${result?.user?.displayName} 🙌.`
        );
      }

      setInterestsData({
        companies: selectedCard,
        triviaScore: 49,
        timestamp: new Date(),
      });

      scrollToSection();
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Error during sign-up. Please try again.");
    }
  }, [user, selectedCard, setUser, setInterestsData, scrollToSection]);

  const handleReset = useCallback(() => {
    setSelectedCard([]);
  }, []);

  const handleShuffle = useCallback(() => {
    setShuffledData(shuffleArray(carouselData));
  }, []);

  // Memoize card calculations
  const cardCalculations = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const offset = i - Math.floor(visibleCount / 2);
      const cardIndex = (currentIndex + offset + total) % total;
      const item = shuffledData[cardIndex];

      const angleDeg = offset * angleSpread;
      const angleRad = (angleDeg * Math.PI) / 180;

      const xOffset = Math.sin(angleRad) * radius;
      const yOffset = 0;

      const isCenter = offset === 0;
      const scale = isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
      const rotate = angleDeg * 0.4;
      const zIndex = 100 - Math.abs(offset);
      const opacity = isCenter ? 1 : Math.max(0.5, 1 - Math.abs(offset) * 0.25);

      return {
        offset,
        cardIndex,
        item,
        xOffset,
        yOffset,
        isCenter,
        scale,
        rotate,
        zIndex,
        opacity,
      };
    });
  }, [visibleCount, currentIndex, total, shuffledData, angleSpread, radius]);

  if (showLoader) {
    return (
      <div className="w-full h-screen !mb-0 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200">
        <div className="text-xl lg:text-2xl font-bold text-black animate-pulse drop-shadow-xl tracking-wide">
          💸 Manifesting market gains...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.1, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen !mb-0 flex justify-center items-center flex-col overflow-x-hidden relative max-w-9xl"
    >
      {/* Optimized animated background - remove will-change-transform */}
      <motion.div
        key={shuffledData[currentIndex].id}
        initial={{ scale: 0, opacity: 0.1 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none z-10 w-screen h-screen"
      >
        <div
          className={`absolute top-1/2 left-1/2 w-full h-full rounded-full blur-3xl ${shuffledData[currentIndex].tintColorClass}`}
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage:
              "radial-gradient(circle at center, var(--tw-gradient-from), #F9F6EE 100%)",
          }}
        />
      </motion.div>

      {/* Header */}
      <div className="w-full h-full flex flex-col items-center z-20 gap-3">
        <div className="flex justify-center items-start lg:items-center space-x-2 pt-10">
          <TextComponent />
        </div>

        <div className="flex flex-wrap justify-center space-x-4">
          <button
            className="mt-10 px-5 py-2 text-sm z-20 sm:text-base font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 transition-all flex justify-center items-center"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2" /> Reset
          </button>
          <button
            className="mt-10 px-5 py-2 text-sm z-20 sm:text-base font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:scale-105 transition-all flex justify-center items-center"
            onClick={handleShuffle}
          >
            <Shuffle className="mr-2" /> Surprise Me
          </button>
        </div>

        {/* Main carousel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <div className="w-full h-full flex justify-center items-center">
            {/* Carousel cards */}
            {cardCalculations.map(
              (
                {
                  offset,
                  cardIndex,
                  item,
                  xOffset,
                  yOffset,
                  isCenter,
                  scale,
                  rotate,
                  zIndex,
                  opacity,
                },
                i
              ) => {
                const isSelected = selectedCardIds.has(item.id);

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
                      x: `${xOffset}%`,
                      y: `${yOffset}%`,
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
                    className="absolute cursor-grab active:cursor-grabbing"
                    style={{ zIndex }}
                    onClick={() => {
                      if (isDraggingRef.current) return;
                      handleCardSelect(item);
                    }}
                  >
                    <Card
                      className={`${item.bgColor} ${item.textColor} border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden relative backdrop-blur-sm w-[15em] h-[20em] md:w-[16em] md:h-[22em] lg:w-[22em] lg:h-[30em]`}
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
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

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
                            <Image
                              src={item.icon}
                              alt={item.title}
                              width={100}
                              height={100}
                              className="w-full h-full"
                              loading="lazy"
                              priority={false}
                            />
                          </div>
                        </motion.div>

                        <motion.h3
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center relative z-10 tracking-wide drop-shadow-md"
                        >
                          {item.title}
                        </motion.h3>

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
              }
            )}
          </div>

          <div className="absolute left-[50%] -translate-x-[50%] bottom-[5em] z-30">
            {selectedCard?.length >= 4 ? (
              <div className="flex justify-center items-center">
                <AnimatedButton name="Reveal" onClick={handleReveal} />
              </div>
            ) : (
              <p className="text-center text-xl lg:text-2xl font-semibold text-[#1a1a1a]">
                {`Selected ${selectedCard?.length}/4`}
              </p>
            )}
          </div>

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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(DraggableCarousel);

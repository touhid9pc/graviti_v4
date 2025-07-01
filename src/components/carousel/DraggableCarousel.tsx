"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, Shuffle } from "lucide-react";
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
import {
  getRandomStyleObject,
  selectCompaniesByNumber,
  shuffleArray,
} from "@/utils/common";
import { Company, carouselData, companyData } from "@/constants/constant";
import { useAppStore } from "@/store/useStore";

interface DraggableCarouselProps {
  nextStep: () => void;
  scrollToSection: () => void;
  proceedRef: React.RefObject<HTMLDivElement | null>;
}

const DraggableCarousel: React.FC<DraggableCarouselProps> = ({
  nextStep,
  scrollToSection,
  proceedRef,
}) => {
  const extractedCompanyData = selectCompaniesByNumber(companyData as any, 2);

  const enhanceWithStyle = (companies: Company[]) =>
    companies.map((company) => ({
      ...company,
      style: getRandomStyleObject(),
    }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [selectedCard, setSelectedCard] = useState<Company[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [shuffledData, setShuffledData] = useState(() =>
    enhanceWithStyle(extractedCompanyData)
  );

  const { prevStep, setInterestsData, interestsData, user, setUser } =
    useAppStore();

  const isDraggingRef = useRef<boolean>(false);

  const total = shuffledData.length;

  // Memoize window resize handler
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
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

  const visibleCount = useMemo(() => {
    // if (windowWidth < 640) return 5; // Mobile
    // if (windowWidth < 1024) return 5; // Tablet
    return 5; // Desktop
  }, [windowWidth]);

  const radius = 50;
  const angleSpread = 20;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    // playSwipeSound();
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    // playSwipeSound();
  }, [total]);

  // Memoize selected card IDs
  const selectedCardIds = useMemo(
    () => new Set(selectedCard.map((card) => card.symbol)),
    [selectedCard]
  );

  const handleCardSelect = useCallback(
    (item: Company) => {
      const isSelected = selectedCardIds.has(item.symbol);

      if (!isSelected && selectedCard.length === 4) {
        toast.error("Please select only 4 cards");
        return;
      }

      setSelectedCard((prev) => {
        if (isSelected) {
          return prev.filter((card) => card.symbol !== item.symbol);
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
        const userRef = doc(firebaseDb, "users", result?.user?.uid);

        const searchParams = new URLSearchParams(window.location.search);
        const ref = searchParams.get("ref");

        const resObject = {
          uid: result?.user?.uid,
          email: result?.user?.email,
          name: result?.user?.displayName,
          createdAt: new Date(),
          referredBy: ref ? ref : null,
        };

        await setDoc(userRef, resObject);
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

      await addDoc(collection(firebaseDb, "interests"), {
        companies: selectedCard,
        uid: `${user?.uid}`,
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
    setShuffledData(enhanceWithStyle(shuffleArray(extractedCompanyData)));
  }, [extractedCompanyData]);

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
      const scale = isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.1);
      const rotate = angleDeg * 0.3;
      const zIndex = 100 - Math.abs(offset);
      const opacity = isCenter ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.2);

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

  // if (showLoader) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
  //       <div className="text-xl md:text-2xl font-bold text-gray-800 animate-pulse tracking-wide">
  //         loading...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-9xl mx-auto min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      ref={proceedRef}
    >
      {/* Background overlay */}
      <motion.div
        key={shuffledData[currentIndex]?.style.id}
        initial={{ scale: 0.8, opacity: 0.1 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <div
          className={`absolute top-1/2 left-1/2 w-full h-full rounded-full blur-3xl ${shuffledData[currentIndex]?.style?.tintColorClass}`}
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage:
              "radial-gradient(circle at center, var(--tw-gradient-from), #F9F6EE 100%)",
          }}
        />
      </motion.div>

      {/* Header */}
      <div className="w-full flex flex-col items-center z-20 gap-4 mb-6 md:mb-8">
        <TextComponent />
        <motion.div
          initial={{ y: 50, opacity: 0.1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
            onClick={handleReset}
          >
            <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
          </button>
          <button
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
            onClick={handleShuffle}
          >
            <Shuffle className="mr-1.5 h-4 w-4" /> Surprise Me
          </button>
        </motion.div>
      </div>

      {/* Main carousel container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full flex-1 flex justify-center items-center py-8"
      >
        <div className="relative w-full max-w-6xl flex justify-center items-center">
          {/* Carousel cards */}
          {cardCalculations.map(
            ({
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
            }) => {
              const isSelected = selectedCardIds.has(item.symbol);

              return (
                <motion.div
                  key={`${item.symbol}-${cardIndex}`}
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
                    type: "tween",
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
                    className={`${item?.style?.bgColor} ${item?.style?.textColor} border-0 shadow-xl rounded-2xl overflow-hidden backdrop-blur-md w-[11rem] h-[15rem] sm:w-[13rem] sm:h-[17rem] md:w-[15rem] md:h-[19rem] lg:h-[22rem] max-w-[17rem] max-h-[22rem] transition-all duration-200 !py-0`}
                  >
                    {isSelected && (
                      <motion.div
                        key={`overlay-${item.symbol}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-indigo-500/30 backdrop-blur-sm z-20 flex items-center justify-center"
                      >
                        <Check
                          size={36}
                          color="white"
                          className="drop-shadow-md"
                        />
                      </motion.div>
                    )}

                    <CardContent className="p-4 sm:p-5 md:p-6 h-full flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
                      <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4"
                      >
                        <div className="flex w-full h-24 sm:h-28 md:h-32 bg-white/20 p-3 rounded-2xl justify-center items-center">
                          <Image
                            // src={item.icon}
                            src={"/assets/stocks/1.png"}
                            alt={item?.name}
                            width={100}
                            height={100}
                            loading="lazy"
                            className="object-contain"
                          />
                        </div>
                      </motion.div>

                      <motion.h3
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm sm:text-base md:text-lg font-semibold text-center tracking-wide drop-shadow-md"
                      >
                        {item?.name}
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

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-slate-100/50  cursor-pointer backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all  duration-200 md:flex hidden items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
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
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-slate-100/50 cursor-pointer backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all  duration-200 md:flex hidden items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
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

      {/* Footer with selection status or reveal button */}
      <div className="w-full flex justify-center mt-6 md:mt-8 z-30">
        {selectedCard?.length >= 4 ? (
          <AnimatedButton
            name="Reveal"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
            onClick={handleReveal}
          />
        ) : (
          <p className="text-center text-lg md:text-xl font-semibold text-gray-800">
            {`Selected ${selectedCard?.length}/4`}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default DraggableCarousel;

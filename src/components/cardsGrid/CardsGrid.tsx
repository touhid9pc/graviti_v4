import {
  companiesImages,
  CompanySymbol,
} from "@/constants/companyStocksImages";
import { Company, companyData } from "@/constants/constant";
import { selectCompaniesByNumber, shuffleArray } from "@/utils/common";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AnimatedButton from "../animatedButton/AnimatedButton";
import { signInWithPopup } from "firebase/auth";
import { auth, firebaseDb, googleAuthProvider } from "@/firebase/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useAppStore } from "@/store/useStore";
import { Check, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { ShinyButton } from "../magicui/shiny-button";

interface CardsGridProps {
  scrollToSection: () => void;
  proceedRef: React.RefObject<HTMLDivElement | null>;
  setShowReveal: (value: boolean) => void;
}

const CardsGrid: React.FC<CardsGridProps> = ({
  scrollToSection,
  proceedRef,
  setShowReveal,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const extractedCompanyData = selectCompaniesByNumber(companyData as any, 1);

  const [shuffledData, setShuffledData] = useState(() => extractedCompanyData);
  const [selectedCard, setSelectedCard] = useState<Company[]>([]);

  const { prevStep, setInterestsData, interestsData, user, setUser } =
    useAppStore();

  const selectedCardIds = useMemo(
    () => new Set(selectedCard.map((card) => card.symbol)),
    [selectedCard]
  );

  const handleShuffle = useCallback(() => {
    setShuffledData(shuffleArray(extractedCompanyData));
  }, [extractedCompanyData]);

  const handleCardSelect = useCallback(
    (item: Company) => {
      const isSelected = selectedCardIds.has(item.symbol);
      if (!isSelected && selectedCard.length === 4) {
        toast.error("Please select only 4 cards");
        return;
      }
      setSelectedCard((prev) =>
        isSelected
          ? prev.filter((card) => card.symbol !== item.symbol)
          : [...prev, item]
      );
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
      if (user) {
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
        setShowReveal(true);
        setTimeout(() => {
          scrollToSection();
        }, 300);
      }
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Error during sign-up. Please try again.");
    }
  }, [user, selectedCard, setUser, setInterestsData, scrollToSection]);

  return (
    <div className="min-h-screen px-2 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center z-20 gap-4 mb-6 md:mb-10">
        <motion.div
          initial={{ y: 50, opacity: 0.1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* <button
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
            onClick={handleReset}
          >
            <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
          </button> */}
          <AnimatedButton
            className=" flex justify-center items-center"
            onClick={handleShuffle}
          >
            <Shuffle className="mr-1.5 h-4 w-4" />
            Surprise Me
          </AnimatedButton>
        </motion.div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {shuffledData?.slice(0, 10).map((card, idx) => {
          const isSelected = selectedCardIds.has(card.symbol);
          const isHovered = hoveredCard === idx;

          return (
            <motion.div
              key={idx}
              className="w-[10rem] h-[14rem] sm:w-[13rem] sm:h-[17rem] md:w-[15rem] md:h-[19rem] lg:h-[22rem] max-w-[17rem] max-h-[22rem] perspective-1000"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(idx)}
              onTouchEnd={() => setHoveredCard(null)}
              onClick={() => handleCardSelect(card)}
            >
              <motion.div
                className="relative w-full h-full rounded-xl transition-transform duration-500"
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{ duration: 0.1 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow">
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-30 rounded-full p-1 flex items-center justify-center bg-green-200">
                      <Check
                        size={30}
                        color="#1a1a1a"
                        className="drop-shadow-md"
                      />
                    </div>
                  )}

                  <div className="mb-6 h-[60%] flex items-center justify-center">
                    <Image
                      src={
                        companiesImages[card.symbol as CompanySymbol] ||
                        "/fallback.webp"
                      }
                      alt={card.name}
                      width={100}
                      height={100}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <h3
                    className={`text-sm md:text-xl font-bold capitalize ${
                      isSelected ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {card.name}
                  </h3>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-start justify-center bg-white rounded-xl p-5 shadow">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 w-full text-center">
                    Top Products
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 overflow-y-auto no-scrollbar max-h-[90%]">
                    {(card.topProducts ?? []).map((product, i) => (
                      <li key={i}>{product}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* <div className="text-center mt-20">
        <div className="mb-6">
          <span className="text-lg font-semibold text-gray-700">
            Selected: {selectedCard.length}/4 companies
          </span>
        </div>
        <button
          disabled={selectedCard.length === 0}
          className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedCard.length === 0 ? "Select Companies" : "Invest Now"}
        </button>
      </div> */}

      <div className="w-full flex justify-center mt-6 md:mt-8 z-30 ">
        {selectedCard?.length >= 4 ? (
          <AnimatedButton
            name="Reveal"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
            onClick={handleReveal}
          />
        ) : (
          <p className="text-center text-lg md:text-xl font-semibold text-gray-800">
            {`Selected ${selectedCard?.length}/4`}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardsGrid;

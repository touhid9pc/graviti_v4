import {
  categories,
  companiesImages,
  CompanySymbol,
} from "@/constants/companyStocksImages";
import { Company, companyData } from "@/constants/constant";
import {
  pickRandomCompaniesPerCategory,
  selectCompaniesByNumber,
  shuffleArray,
} from "@/utils/common";
import Image from "next/image";
import React, { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import AnimatedButton from "../animatedButton/AnimatedButton";
import { signInWithPopup } from "firebase/auth";
import { auth, firebaseDb, googleAuthProvider } from "@/firebase/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useAppStore } from "@/store/useStore";
import { Check, ChevronLeft, Info, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { ShinyButton } from "../magicui/shiny-button";
import FancyDropdown from "../fancyDropdown/FancyDropdown";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface CardsGridProps {
  scrollToSection: () => void;
  proceedRef: React.RefObject<HTMLDivElement | null>;
  setShowReveal: (value: boolean) => void;
}

type categoryType = {
  id: string;
  title: string;
  svgPath: string;
};

const CardsGrid: React.FC<CardsGridProps> = ({
  scrollToSection,
  proceedRef,
  setShowReveal,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const extractedCompanyData = selectCompaniesByNumber(companyData as any, 1);

  const [shuffledData, setShuffledData] = useState(() =>
    pickRandomCompaniesPerCategory(companyData)
  );
  const [selectedCard, setSelectedCard] = useState<Company[]>([]);
  const [tooltipIndex, setTooltipIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<categoryType>(
    categories[0]
  );

  const { prevStep, setInterestsData, interestsData, user, setUser } =
    useAppStore();

  const selectedCardIds = useMemo(
    () => new Set(selectedCard.map((card) => card?.id)),
    [selectedCard]
  );

  const handleShuffle = useCallback(() => {
    setShuffledData(pickRandomCompaniesPerCategory(companyData));
  }, [extractedCompanyData]);

  const handleCardSelect = useCallback(
    (item: Company) => {
      const isSelected = selectedCardIds.has(item?.id);
      if (!isSelected && selectedCard.length === 4) {
        toast.error("Please select only 4 cards");
        return;
      }
      setSelectedCard((prev) =>
        isSelected
          ? prev.filter((card) => card?.id !== item?.id)
          : [...prev, item]
      );
    },
    [selectedCardIds, selectedCard.length]
  );

  const handleReveal = useCallback(async () => {
    setLoading(true);
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
        setInterestsData({
          companies: selectedCard,
          triviaScore: 49,
          timestamp: new Date(),
        });

        await addDoc(collection(firebaseDb, "interests"), {
          companies: selectedCard,
          uid: `${result?.user?.uid}`,
          timestamp: new Date(),
        });
        setShowReveal(true);
        setTimeout(() => {
          setLoading(false);
          scrollToSection();
        }, 300);
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
          setLoading(false);
          scrollToSection();
        }, 300);
      }
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Error during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user, selectedCard, setUser, setInterestsData, scrollToSection]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm">
        <div className="text-xl md:text-2xl font-bold text-[#fAf9F6] animate-pulse tracking-wide">
          loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen px-2 sm:px-6 lg:px-8">
        <FancyDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="hidden md:flex flex-row flex-wrap justify-center items-center mb-10 gap-6">
          {categories?.map((item, idx) => {
            const isCategoryhasId = selectedCard?.some(
              (data) => data?.category === item?.id
            );

            return (
              <AnimatedButton
                key={item.id}
                className={`!p-4 relative group border border-slate-300 rounded-full cursor-pointer transition-all  ${
                  selectedCategory?.id === item?.id ? "bg-[#FAF9F6]" : ""
                }`}
                spanClassName={"invert"}
                onClick={() => setSelectedCategory(item)}
              >
                {isCategoryhasId && (
                  // <Check className="text-black absolute -top-[80%] -right-[50%]" />
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-pink-600 absolute -top-[80%] -right-[50%]"
                  />
                )}
                <Image
                  src={item?.svgPath}
                  alt={item?.title}
                  width={28}
                  height={28}
                  className="rounded-md"
                />

                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FAF9F6] text-[#1a1a1a] text-sm px-3 py-1 font-semibold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 leading-10">
                  {item?.title}
                </div>
              </AnimatedButton>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center z-20 gap-4 mb-6 md:mb-10">
          <motion.div
            initial={{ y: 50, opacity: 0.1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <AnimatedButton
              className="text-base sm:text-lg flex justify-center items-center"
              onClick={() => setSelectedCard([])}
            >
              Clear
            </AnimatedButton>
            {/* <AnimatedButton
              className="text-base sm:text-lg flex justify-center items-center !bg-[#1a1a1a] !text-[#FAF9F6]"
              onClick={handleShuffle}
            >
              Shuffle
            </AnimatedButton> */}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {(companyData as any)[selectedCategory?.id]?.map(
            (card: Company, idx: number) => {
              const isSelected = selectedCardIds.has(card?.id);
              const isHovered = hoveredCard === idx;

              const handleFlip = (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setHoveredCard(idx);
              };

              const handleFlipBack = (e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setHoveredCard(null);
              };
              return (
                <motion.div
                  key={idx}
                  className="w-[9rem] h-[12rem] sm:w-[13rem] sm:h-[17rem] md:w-[15rem] md:h-[19rem] lg:h-[22rem] max-w-[17rem] max-h-[22rem] perspective-1000"
                  onClick={() => handleCardSelect(card)}
                >
                  {/* from-purple-900 via-black to-blue-900 */}
                  <motion.div
                    className="relative w-full h-full rounded-xl bg-gradient-to-tl from-black to-[#a8ffe0]/40 transition-transform duration-500"
                    animate={{ rotateY: isHovered ? 180 : 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center rounded-xl p-6 shadow-inner border border-white/10 bg-white/5 backdrop-blur-md hover:backdrop-blur-xl transition-all duration-300">
                      {/* <div
                        onClick={handleFlip}
                        className="absolute top-2 left-2"
                      >
                        <Info className="text-white/50" />
                      </div> */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-30 rounded-full p-1 flex items-center justify-center bg-green-200">
                          <Check
                            size={30}
                            color="#1a1a1a"
                            className="drop-shadow-md"
                          />
                        </div>
                      )}

                      <div className="mb-6 h-[60%] w-full p-2 flex items-center rounded-xl bg-gradient-to-r from-white  to-gray-300 justify-center">
                        <Image
                          src={
                            companiesImages[card.symbol as CompanySymbol] ||
                            "/fallback.webp"
                          }
                          alt={card.name}
                          width={100}
                          height={100}
                          className="transition-transform duration-300 hover:scale-110 p-2 object-contain "
                        />
                      </div>

                      <h3
                        className={`text-sm md:text-xl font-bold capitalize text-center ${
                          isSelected ? "text-green-400" : "text-white"
                        }`}
                      >
                        {card.name}
                      </h3>

                      <p
                        onClick={handleFlip}
                        className={`text-xs sm:text-sm xl:text-base mt-2 underline text-center text-white/50`}
                      >
                        more details
                      </p>
                    </div>

                    {/* BACK */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-start justify-center rounded-xl p-5 shadow-inner backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 ${
                        isSelected ? "ring-1 ring-green-300" : ""
                      }`}
                    >
                      <div
                        onClick={handleFlipBack}
                        className="absolute top-2 left-2"
                      >
                        <ChevronLeft className="text-white/50" />
                      </div>
                      <h4 className="text-xs sm:text-sm md:text-lg font-semibold text-white mb-2 w-full text-center">
                        Top Products
                      </h4>
                      <ul className="list-disc list-inside text-gray-200 text-xs sm:text-sm font-semibold space-y-1 overflow-y-auto no-scrollbar max-h-[90%]">
                        {(card.topProducts ?? []).map((product, i) => (
                          <li key={i}>{product}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            }
          )}
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
              name={loading ? "loading..." : "Reveal"}
              className="text-base sm:text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center"
              onClick={handleReveal}
            />
          ) : (
            <p className="text-center text-lg md:text-xl font-semibold text-[#Faf9f6]">
              {`Selected ${selectedCard?.length}/4`}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CardsGrid;

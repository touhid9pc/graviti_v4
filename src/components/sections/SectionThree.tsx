"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { calculateStockProfit } from "@/utils/common";
import { useAppStore } from "@/store/useStore";
import { ChevronLeft } from "lucide-react";
import { ShareCard } from "../shareCard/ShareCard";

export type stockResultProps = {
  profit: number;
  totalAmountInvested: number;
  percentageGrowth: number;
};
interface SectionThreeProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}
const SectionThree: React.FC<SectionThreeProps> = ({ sectionRef }) => {
  const [investment, setInvestment] = useState(1000);
  const [stockResult, setStockResult] = useState<stockResultProps>({
    profit: 0,
    totalAmountInvested: 0,
    percentageGrowth: 0,
  });

  const { interestsData, prevStep, user } = useAppStore();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stockResult = calculateStockProfit(interestsData?.companies, 1000);
    setStockResult(stockResult);
  }, [interestsData?.companies]);

  const profit = stockResult?.profit;
  const total = investment + profit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value || "0");
    setInvestment(val);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (val == 0) {
      return setStockResult({
        profit: 0,
        totalAmountInvested: 0,
        percentageGrowth: 0,
      });
    }
    debounceTimeout.current = setTimeout(() => {
      const result = calculateStockProfit(interestsData?.companies, val);
      setStockResult(result);
    }, 300);
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex  flex-col items-center justify-center px-4 sm:px-8 md:px-12 bg-gradient-to-br from-[#fdfbfb] via-[#fce8f7] to-[#e6f5f4]"
    >
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl text-center space-y-6 "
        >
          {/* Heading */}
          <div className="flex justify-center items-center space-x-4">
            {/* <button
            className="p-2 lg:p-4 text-sm sm:text-base  font-semibold rounded-xl bg-white text-black border border-gray-200"
            onClick={prevStep}
          >
            <ChevronLeft />
          </button> */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight text-[#1a1a1a] ">
              Wow, you would’ve gained{" "}
              <span className="text-green-600">{`${stockResult?.percentageGrowth}%`}</span>{" "}
              on your favourite brands
            </h2>
          </div>
          {/* Main message */}
          <p className="text-base sm:text-lg md:text-xl text-[#333] font-medium px-2">
            Your stock choices?{" "}
            <span className="font-semibold text-purple-600">Impressive</span>.
            If you’d invested
            <input
              type="number"
              value={investment}
              onChange={handleChange}
              className="mx-1 w-[80px] sm:w-[100px] bg-transparent border-b-2 border-[#888] text-black font-semibold text-center focus:outline-none focus:border-black transition-all"
            />
            rupees, you'd have earned{" "}
            <span className="text-green-600 font-bold">
              ₹{profit.toFixed(2)}
            </span>{" "}
            by now.
          </p>

          {/* Total display */}
          <p className="text-base sm:text-lg text-[#444]">
            That brings your total to{" "}
            <span className="font-semibold text-black">
              ₹{total.toFixed(2)}
            </span>{" "}
            💸
          </p>
        </motion.div>
      )}

      <ShareCard stockResult={stockResult} />
    </div>
  );
};

export default SectionThree;

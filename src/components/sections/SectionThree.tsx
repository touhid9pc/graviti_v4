"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Main profit result page
const SectionThree = () => {
  const [investment, setInvestment] = useState(1000);
  const debouncedInvestment = useDebounce(investment, 800);

  const calculateProfit = (amount: number) => {
    const profitPercent = 0.15;
    return amount * profitPercent;
  };

  const profit = calculateProfit(debouncedInvestment);
  const total = investment + profit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value || "0");
    setInvestment(val);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-12 bg-gradient-to-br from-[#fdfbfb] via-[#fce8f7] to-[#e6f5f4]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center space-y-6 py-12 sm:py-20"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-[#1a1a1a]">
          🎉 Solid move!
        </h1>

        {/* Main message */}
        <p className="text-base sm:text-lg md:text-xl text-[#333] font-medium px-2">
          Your stock choices?{" "}
          <span className="font-semibold text-purple-600">Impressive</span>. If
          you’d invested{" "}
          <input
            type="number"
            value={investment}
            onChange={handleChange}
            className="mx-1 w-[80px] sm:w-[100px] bg-transparent border-b-2 border-[#888] text-black font-semibold text-center focus:outline-none focus:border-black transition-all"
          />{" "}
          rupees, you'd have earned{" "}
          <span className="text-green-600 font-bold">₹{profit.toFixed(2)}</span>{" "}
          by now.
        </p>

        {/* Total display */}
        <p className="text-base sm:text-lg text-[#444]">
          That brings your total to{" "}
          <span className="font-semibold text-black">₹{total.toFixed(2)}</span>{" "}
          💸
        </p>

        {/* Fine print */}
        <p className="text-xs sm:text-sm text-[#888]">
          *(This is just a projection — real profits vary with market swings.)
        </p>
      </motion.div>
    </main>
  );
};

export default SectionThree;

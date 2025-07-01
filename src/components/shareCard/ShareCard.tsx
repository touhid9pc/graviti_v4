"use client";

import React from "react";
import { useAppStore } from "@/store/useStore";
import { FaXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import AnimatedButton from "../animatedButton/AnimatedButton";

type stockResultProps = {
  stockResult: {
    profit: number;
    totalAmountInvested: number;
    percentageGrowth: number;
  };
};

export function ShareCard({ stockResult }: stockResultProps) {
  const { user } = useAppStore();

  const baseLink = "https://graviti-v4.vercel.app";
  const fullLink = `${baseLink}?ref=${user?.uid}`;

  const totalProfit = stockResult?.totalAmountInvested + stockResult?.profit;

  const message = `If I had invested ₹${
    stockResult?.totalAmountInvested
  }, I would have earned ₹${
    stockResult?.profit
  } by now.\n\nThat brings my total to ₹${totalProfit.toFixed(
    2
  )} \n\nJust came across this kickass investment app for indians, check yours: ${fullLink}`;

  // const message = `hey <<fname>>, just came across this kickass investment app for indians`

  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodedMessage}`;

  return (
    <div className="relative mx-auto mt-20 w-full max-w-2xl px-8 py-14 rounded-tl-xl rounded-br-xl bg-orange-200/20 border-amber-950/10 shadow-md ">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          🚀 {user ? "Challenge" : "Refer"} your friends!
        </h2>
        {user && (
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Share your result
          </p>
        )}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 sm:gap-8">
        {/* WhatsApp */}
        <AnimatedButton className="!p-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="flex items-center cursor-pointer"
          >
            <SiWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
          </a>
        </AnimatedButton>

        {/* X (Twitter) */}
        <AnimatedButton className="!p-4">
          <a
            href={twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="flex items-center cursor-pointer"
          >
            <FaXTwitter className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800" />
          </a>
        </AnimatedButton>
      </div>
    </div>
  );
}

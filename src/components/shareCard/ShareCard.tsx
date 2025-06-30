"use client";

import React, { useState, useEffect, useRef } from "react";
import { calculateStockProfit } from "@/utils/common";
import { useAppStore } from "@/store/useStore";
import { ChevronLeft } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import AnimatedButton from "../animatedButton/AnimatedButton";

type stockResultProps = {
  profit: number;
  totalAmountInvested: number;
};

export function ShareCard() {
  const { user } = useAppStore();
  return (
    <div className="relative mx-auto mt-20 w-full max-w-2xl px-8 py-14 rounded-tl-xl rounded-br-xl bg-orange-200/20 border-amber-950/10 shadow-md ">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          🚀 {user ? "Challenge" : "Refer"} your friends!
        </h2>
        {user && (
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Share your result on WhatsApp or X
          </p>
        )}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 sm:gap-8">
        {/* WhatsApp */}
        <AnimatedButton className="!p-4">
          <a
            href="https://wa.me/?text=Check%20out%20my%20stock%20investment%20results!"
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
            href="https://twitter.com/intent/tweet?text=Check%20out%20my%20stock%20investment%20results!"
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

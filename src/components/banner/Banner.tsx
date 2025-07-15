"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Banner: React.FC = () => {
  const pathname = usePathname();

  if (pathname === "/rewards") return null;

  return (
    <Link href="/rewards" target="_blank">
      <div className="w-full z-50 border-b-[1px] tracking-wider border-slate-50/40 h-28 md:h-18 bg-gradient-to-tl from-[#0a271c] to-[#116346] shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <div className="text-base md:text-lg font-bold md:font-black text-slate-50">
            Invest with{" "}
            <span className="text-lg md:text-2xl text-emerald-100">
              Graviti
            </span>{" "}
            — Win a Trip to the{" "}
            <span className="text-lg md:text-2xl text-emerald-100">
              Wall Street
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-100 mt-1 font-semibold">
            Up your Investments, to up your Experience.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Banner;

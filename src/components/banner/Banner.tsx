"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Banner: React.FC = () => {
  const pathname = usePathname();

  if (pathname === "/rewards") return null;

  return (
    <Link href="/rewards" target="_blank" className="w-full z-50">
      <div
        className="w-full h-28 md:h-20 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-300 shadow-md flex items-center justify-center px-6"
        id="banner"
      >
        <div className="max-w-screen-xl text-center">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-700">
            Invest with <span className="text-emerald-600">Graviti</span> — Win
            a Trip to the <span className="text-teal-600">Wall Street</span>
          </h2>
          <p className="mt-1 text-sm md:text-base font-semibold text-slate-500">
            Up your Investments, to up your Experience.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Banner;

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const BannerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-3xl h-64 mx-auto rounded-sm overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
              <div className="absolute inset-0">
                <Image
                  src="/assets/street.jpg"
                  alt="Banner Background"
                  fill
                  priority
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black to-slate-800 opacity-60" />
              </div>

              <div className="relative z-10 p-6 sm:p-10">
                <div className="space-y-4">
                  <h1 className="text-slate-50 font-extrabold leading-tight tracking-tight">
                    <span className="block text-lg sm:text-xl">
                      Invest with{" "}
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                        Graviti
                      </span>
                    </span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl mt-1">
                      Win a Trip to the USA — Wall Street Experience!
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-50 font-medium max-w-lg">
                    Up your Investments, to up your Experience.
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <IoClose className="text-slate-50 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BannerModal;

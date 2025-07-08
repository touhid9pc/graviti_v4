"use client";

import UniqueHeading from "@/components/section-heading";
import { motion } from "framer-motion";
import {
  gravitiFeatures,
  investmentOptions,
  investmentSteps,
} from "@/constants/constant";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import TextReveal from "@/components/magicui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const messages = ["Smart Investing", "Global Access", "Complete Control"];

function AboutSection() {
  const [index, setIndex] = useState(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      investmentSteps.forEach((_, i) => {
        const card = cardRefs.current[i];
        const bar = barRefs.current[i];

        tl.to(bar, {
          width: "100%",
          duration: 3,
          ease: "none",
          onStart: () => {
            cardRefs.current.forEach((c, idx) => {
              if (idx !== i && c) {
                gsap.to(c, { background: "transparent", duration: 0.2 });
              }
            });

            barRefs.current.forEach((b, idx) => {
              if (idx !== i && b) {
                gsap.set(b, { width: 0 });
              }
            });

            gsap.to(card, {
              background: "linear-gradient(to bottom right, #dfedff, #e2e8f0)",

              duration: 0,
            });
          },
        })
          .to(
            card,
            {
              background: "transparent",
              duration: 0,
            },
            "+=0"
          )
          .set(bar, { width: 0 });
      });
    }, []);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const mid = Math.ceil(gravitiFeatures.length / 2);
  const leftItems = gravitiFeatures.slice(0, mid);
  const rightItems = gravitiFeatures.slice(mid);

  return (
    <section className="flex flex-col w-full max-w-7xl space-y-12 md:space-y-4 mx-auto px-4 sm:px-4 py-6 md:py-0 md:px-8 text-slate-900">
      {/* About Hero Section */}
      <div className="w-full flex flex-col justify-center items-center min-h-[100dvh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <UniqueHeading
            text="About Us"
            bgCut
            className="text-3xl sm:text-4xl md:text-5xl text-slate-900 "
          />
          <div className="max-w-4xl flex items-center my-4 px-4">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-700">
              <span className="font-bold text-lg sm:text-xl md:text-2xl text-slate-900">
                Graviti.Finance
              </span>{" "}
              is a user-friendly trading platform that allows Indian investors
              to access global digital assets and{" "}
              <span className="font-extrabold text-2xl text-blue-900">
                U.S. stocks
              </span>{" "}
              securely, transparently, and at low cost.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="w-full px-4 mt-20">
          <div className="flex flex-col lg:flex-row justify-center items-center text-center gap-20 relative">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group px-6 py-8 max-w-xl w-full text-center"
            >
              {/* Glassy layered background using before/after */}
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-md before:border before:border-slate-200/20 before:transition-all before:duration-500 group-hover:before:bg-white/20 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/0 after:to-blue-50/10 z-[-1]" />

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight group-hover:tracking-wider transition-all duration-300">
                Vision
              </h3>
              <div className="w-14 h-[2px] mx-auto bg-gradient-to-r from-blue-500 to-slate-500 mb-6 transition-all duration-500 group-hover:w-20" />
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed tracking-tight">
                To empower Indian investors with smooth, secure access to the
                world’s most powerful digital and equity investment
                opportunities.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group px-6 py-8 max-w-xl w-full text-center"
            >
              {/* Glassy layered background using before/after */}
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-md before:border before:border-slate-200/20 before:transition-all before:duration-500 group-hover:before:bg-white/20 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/0 after:to-purple-50/10 z-[-1]" />

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4 tracking-tight group-hover:tracking-wider transition-all duration-300">
                Mission
              </h3>
              <div className="w-14 h-[2px] mx-auto bg-gradient-to-r from-slate-500 to-blue-500 mb-6 transition-all duration-500 group-hover:w-20" />
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed tracking-tight">
                To simplify global investing through a regulated, low-cost
                platform powered by expert insights and advanced technology —
                minimizing risk and helping investors build long-term wealth
                with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="w-full flex flex-col items-center justify-center gap-8 px-4 min-h-[100dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900">
          HOW IT WORKS?
        </span>
        <UniqueHeading
          text="Just 3 steps to get started"
          className="text-3xl mb-3 sm:text-4xl md:text-5xl text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 ">
          Transform Your Financial Future in 3 Simple Steps
        </span>

        <div className="flex flex-col lg:flex-row items-center justify-center  w-full gap-6">
          {investmentSteps.map((step, i) => (
            <div
              key={i}
              ref={(el: any) => (cardRefs.current[i] = el)}
              className="relative w-full lg:w-[30%] h-[14rem] shadow-md rounded-xl border border-slate-300 p-4 sm:p-5 flex flex-col justify-start bg-transparent transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-2 right-2 w-[30px] h-1.5  rounded overflow-hidden">
                <div
                  ref={(el: any) => (barRefs.current[i] = el)}
                  className="h-full w-0 bg-blue-700 rounded"
                ></div>
              </div>
              <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="w-full gap-8 flex flex-col items-center justify-center px-4 min-h-[100dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 ">
          WHY CHOOSE US?
        </span>
        <UniqueHeading
          text="Why Graviti Finance?"
          className="text-3xl mb-3 sm:text-4xl md:text-5xl text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 ">
          {messages[index]}
        </span>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-800 text-sm md:text-base  font-semibold leading-relaxed">
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-blue-600 transform -translate-x-1/2" />
          <div className="flex flex-col space-y-6 px-4">
            {leftItems.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-900">
                {feature}
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-6 px-4">
            {rightItems.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-900">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEXT REVEAL */}
      <div className="w-full min-h-screen">
        <TextReveal>
          Investing globally shouldn't be complicated, yet for most Indians, it
          still is. That’s how Graviti.Finance came into existence. We
          recognised the systemic barriers facing Indian investors: excessive
          brokerage fees, restricted access to global digital assets and complex
          onboarding processes that deter even the most experienced individuals.
          Graviti.Finance is built to overcome these challenges. By offering
          regulated access through GIFT City, expertly curated investment
          baskets, and a smooth digital interface, we have made global investing
          simple, transparent and accessible. And because trust is foundational,
          every investment in Graviti.Finance is protected with insurance
          coverage, so you can invest globally with clarity and confidence. We
          are here to empower every Indian investor to take smarter, more secure
          steps toward a truly global financial future.
        </TextReveal>
      </div>

      {/* INVESTMENT OPTIONS */}
      <div className="w-full flex flex-col justify-center gap-8 items-center px-4 min-h-[100dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 ">
          INVESTMENT OPTIONS
        </span>
        <UniqueHeading
          text="Where can you invest?"
          className="text-3xl mb-3 sm:text-4xl md:text-5xl text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 ">
          Maximise Potential with Limitless Investment Options
        </span>

        <div className="flex flex-wrap gap-6 justify-center items-stretch  max-w-5xl mx-auto w-full px-4">
          {investmentOptions.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex-1 min-w-[280px] max-w-sm p-6 bg-sand-300 text-slate-900 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200 to-slate-300 opacity-60 transform scale-50 origin-top-left transition-transform duration-500 group-hover:scale-[1.5]" />
              <div className="absolute bottom-0 right-0 w-20 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-slate-300 to-blue-200 opacity-60 transform scale-50 origin-bottom-right transition-transform duration-500 group-hover:scale-[2.5]" />
              <h3 className="relative z-10 text-lg font-extrabold tracking-wide">
                {item.title}
              </h3>
              <p className="relative z-10 mt-3 font-semibold text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

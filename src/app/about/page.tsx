"use client";

import { TextReveal } from "@/components/magicui/text-reveal";
import UniqueHeading from "@/components/section-heading";
import { motion } from "framer-motion";
import {
  gravitiFeatures,
  investmentOptions,
  investmentSteps,
} from "@/constants/constant";
import { CardStack } from "@/components/ui/card-stack";

function AboutSection() {
  const mid = Math.ceil(gravitiFeatures.length / 2);
  const leftItems = gravitiFeatures.slice(0, mid);
  const rightItems = gravitiFeatures.slice(mid);

  return (
    <section className="flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 bg-sand-100 text-slate-900">
      {/* Hero Section */}
      <div className="w-full min-h-screen flex flex-col justify-center items-center py-20 bg-sand-100">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <UniqueHeading
            text="About Us"
            bgCut
            className="text-3xl sm:text-4xl md:text-5xl text-blue-600"
          />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-slate-700">
            <span className="font-extrabold block mb-2 text-lg sm:text-xl md:text-2xl text-slate-900">
              Graviti.Finance
            </span>
            is a user-friendly trading platform that allows Indian investors to
            access global digital assets and{" "}
            <span className="font-extrabold text-lg sm:text-xl md:text-2xl text-blue-700">
              U.S. stocks
            </span>{" "}
            securely, transparently and at low cost.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="relative flex flex-col sm:flex-row justify-center items-center mt-12 gap-8 px-4 w-full">
          <div className="group relative flex-1 min-w-[280px] max-w-sm p-6 bg-sand-300 text-slate-900 rounded-sm overflow-hidden cursor-pointer  shadow-md hover:shadow-lg transition-shadow">
            <div
              className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200 to-slate-300 opacity-60 
                      transform scale-50 origin-top-left transition-transform duration-500 group-hover:scale-[1.5]"
            ></div>

            <div
              className="absolute bottom-0 right-0 w-20 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-slate-300 to-blue-200 opacity-60 
                      transform scale-50 origin-bottom-right transition-transform duration-500 group-hover:scale-[2.5]"
            ></div>

            <UniqueHeading
              text="Vision"
              className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900"
            />
            <p className="relative z-10 mt-3 text-sm leading-relaxed">
              To empower Indian investors with smooth, secure access to the world’s most powerful digital and equity investment opportunities.
            </p>
          </div>

          <div className="group relative flex-1 min-w-[280px] max-w-sm p-6 bg-sand-300 text-slate-900 rounded-sm overflow-hidden cursor-pointer  shadow-md hover:shadow-lg transition-shadow">
            <div
              className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200 to-slate-300 opacity-60 
                      transform scale-50 origin-top-left transition-transform duration-500 group-hover:scale-[1.5]"
            ></div>

            <div
              className="absolute bottom-0 right-0 w-20 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-slate-300 to-blue-200 opacity-60 
                      transform scale-50 origin-bottom-right transition-transform duration-500 group-hover:scale-[2.5]"
            ></div>

            <UniqueHeading
              text="Mission"
              className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900"
            />
            <p className="relative z-10 mt-3 text-sm leading-relaxed">
To simplify global investing through a regulated, low-cost platform powered by expert insights and advanced technology, minimising risk and helping investors build long-term wealth with confidence.            </p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="w-full flex flex-col items-center py-16 px-4 bg-sand-100">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          HOW IT WORKS?
        </span>
        <UniqueHeading
          text="Just 3 steps to get started"
          className="text-3xl sm:text-4xl md:text-5xl mb-10 text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          Transform Your Financial Future in 3 Simple Steps
        </span>

        <div className="mt-14 flex flex-col lg:flex-row gap-12 items-center justify-evenly w-full">
          <div className="flex flex-col space-y-10 max-w-md w-full">
            {investmentSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-900 flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <CardStack images={investmentSteps.map((i) => i.image)} />
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="w-full flex flex-col items-center py-16 px-4 bg-sand-100">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          WHY CHOOSE US?
        </span>
        <UniqueHeading
          text="Why Graviti Finance?"
          className="text-3xl sm:text-4xl md:text-5xl mb-10 text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          Smarter Investing | Global Access | Complete Control
        </span>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-800 text-sm md:text-base mt-5 font-semibold leading-relaxed">
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
      <TextReveal className="">
        Investing globally shouldn't be complicated, yet for most Indians, it
        still is. That’s how Graviti.Finance came into existence. We recognised
        the systemic barriers facing Indian investors: excessive brokerage fees,
        restricted access to global digital assets and complex onboarding
        processes that deter even the most experienced individuals.
        Graviti.Finance is built to overcome these challenges. By offering
        regulated access through GIFT City, expertly curated investment baskets,
        and a smooth digital interface, we have made global investing simple,
        transparent and accessible. And because trust is foundational, every
        investment in Graviti.Finance is protected with insurance coverage, so
        you can invest globally with clarity and confidence. We are here to
        empower every Indian investor to take smarter, more secure steps toward
        a truly global financial future.
      </TextReveal>

      {/* INVESTMENT OPTIONS */}
      <div className="w-full flex flex-col min-h-[100dvh] justify-center items-center py-16 px-4 bg-sand-100">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          INVESTMENT OPTIONS
        </span>
        <UniqueHeading
          text="Where can you invest?"
          className="text-3xl sm:text-4xl md:text-5xl mb-10 text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          Maximise Potential with Limitless Investment Options{" "}
        </span>

        <div className="flex flex-wrap gap-6 justify-center items-stretch mt-8 max-w-5xl mx-auto w-full px-4">
          {investmentOptions.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex-1 min-w-[280px] max-w-sm p-6 bg-sand-300 text-slate-900 rounded-sm overflow-hidden cursor-pointer  shadow-md hover:shadow-lg transition-shadow"
            >
              <div
                className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200 to-slate-300 opacity-60 
                      transform scale-50 origin-top-left transition-transform duration-500 group-hover:scale-[1.5]"
              ></div>

              <div
                className="absolute bottom-0 right-0 w-20 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-slate-300 to-blue-200 opacity-60 
                      transform scale-50 origin-bottom-right transition-transform duration-500 group-hover:scale-[2.5]"
              ></div>

              <h3 className="relative z-10 text-lg font-bold tracking-wide">
                {item.title}
              </h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed">
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

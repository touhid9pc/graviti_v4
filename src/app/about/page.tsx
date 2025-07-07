"use client";

import AnimatedTitle from "@/components/magicui/text-reveal";
import UniqueHeading from "@/components/section-heading";
import { motion } from "framer-motion";
import {
  gravitiFeatures,
  investmentOptions,
  investmentSteps,
} from "@/constants/constant";
import { CardStack } from "@/components/ui/card-stack";
import TextReveal from "@/components/magicui/text-reveal";

function AboutSection() {
  const mid = Math.ceil(gravitiFeatures.length / 2);
  const leftItems = gravitiFeatures.slice(0, mid);
  const rightItems = gravitiFeatures.slice(mid);

  return (
    <section className="flex flex-col w-full max-w-6xl space-y-16 md:space-y-6 mx-auto px-4 sm:px-4 py-6 md:py-0 md:px-8 text-slate-900">
      {/* About Hero Section */}
      <div className="w-full flex flex-col justify-center items-center min-h-[80dvh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <UniqueHeading
            text="About Us"
            bgCut
            className="text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4"
          />
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-700">
              <span className="font-bold block mb-4 text-lg sm:text-xl md:text-2xl text-slate-900">
                Graviti.Finance
              </span>
              is a user-friendly trading platform that allows Indian investors
              to access global digital assets and{" "}
              <span className="font-bold text-blue-600">U.S. stocks</span>{" "}
              securely, transparently and at low cost.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="w-full px-4 mt-10">
          <div className="flex flex-col sm:flex-row justify-center items-start gap-10 sm:gap-14 md:gap-20">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center max-w-full md:max-w-md px-4 py-4"
            >
              <UniqueHeading
                text="Vision"
                className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900"
              />
              <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-500 before:transition-all before:duration-500 group-hover:before:w-full"></div>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                To empower Indian investors with smooth, secure access to the
                world's most powerful digital and equity investment
                opportunities.
              </p>
            </motion.div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-28 bg-slate-200 self-center" />

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 text-center max-w-full md:max-w-md px-4 py-4"
            >
              <UniqueHeading
                text="Mission"
                className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900"
              />
              <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-4 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-500 before:transition-all before:duration-500 group-hover:before:w-full"></div>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600">
                To simplify global investing through a regulated, low-cost
                platform powered by expert insights and advanced technology,
                minimising risk and helping investors build long-term wealth
                with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="w-full  flex flex-col items-center justify-center px-4 min-h-[80dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          HOW IT WORKS?
        </span>
        <UniqueHeading
          text="Just 3 steps to get started"
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          Transform Your Financial Future in 3 Simple Steps
        </span>

        <div className="mt-12 flex flex-col lg:flex-row gap-10 items-center justify-evenly w-full">
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
      <div className="w-full  flex flex-col items-center justify-center px-4 min-h-[80dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          WHY CHOOSE US?
        </span>
        <UniqueHeading
          text="Why Graviti Finance?"
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-center text-blue-700"
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
      <div className="w-full min-h-screen ">
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
      <div className="w-full flex flex-col justify-center items-center px-4 min-h-[100dvh]">
        <span className="font-mono font-semibold tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          INVESTMENT OPTIONS
        </span>
        <UniqueHeading
          text="Where can you invest?"
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-center text-blue-700"
          bgCut
        />
        <span className="font-mono font-semibold text-center tracking-wide text-xs sm:text-sm md:text-base text-blue-900 mb-3">
          Maximise Potential with Limitless Investment Options
        </span>

        <div className="flex flex-wrap gap-6 justify-center items-stretch mt-8 max-w-5xl mx-auto w-full px-4">
          {investmentOptions.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex-1 min-w-[280px] max-w-sm p-6 bg-sand-300 text-slate-900 rounded-sm overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 left-0 w-16 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-200 to-slate-300 opacity-60 transform scale-50 origin-top-left transition-transform duration-500 group-hover:scale-[1.5]" />
              <div className="absolute bottom-0 right-0 w-20 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-slate-300 to-blue-200 opacity-60 transform scale-50 origin-bottom-right transition-transform duration-500 group-hover:scale-[2.5]" />
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

"use client";

import { TextReveal } from "@/components/magicui/text-reveal";
import {
  gravitiFeatures,
  investmentOptions,
  investmentSteps,
} from "@/constants/constant";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  return (
    <section className="flex flex-col items-center space-y-20 w-full px-6">
      {/* Intro Story Section */}
      <div className="w-full py-20 space-y-6 text-center mx-auto min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">
          <span className="text-[#2c2a28]">Our Story:</span> Bridging India to
          the Global Investment Frontier
        </h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-700">
          <span className="font-semibold text-black">Graviti.Finance</span> is a
          user-first platform empowering Indian investors to access{" "}
          <span className="text-slate-400 text-xl font-semibold">
            global digital assets
          </span>{" "}
          and{" "}
          <span className="text-slate-400 text-xl font-semibold">
            U.S. stocks
          </span>{" "}
          securely, transparently and at low cost.
        </p>
        <p className="text-md md:text-lg max-w-3xl mx-auto text-gray-600">
          Built with <span className="text-black font-medium">simplicity</span>{" "}
          and <span className="text-black font-medium">performance</span> in
          mind, it bridges traditional finance with the{" "}
          <span className="italic text-[#FF6600] font-medium">
            future of investing
          </span>
          .
        </p>
      </div>

      <TextReveal className="z-20">
        Investing globally shouldn't be complicated, yet for most Indians, it
        still is. That’s how Graviti.Finance came into existence. We recognised
        the systemic barriers: excessive brokerage fees, restricted access, and
        complex onboarding. We built a solution that offers regulated entry via
        GIFT City, curated investment baskets, and seamless UX. Every investment
        is insured — helping Indians invest globally with clarity, confidence,
        and control.
      </TextReveal>

      {/* Bento Grid Section */}
      <div className="grid grid-cols-1 md:max-w-7xl md:mx-auto sm:grid-cols-8 gap-4 w-full md:pb-20 z-10  min-h-[100dvh]  ">
        <div className="col-span-1 sm:col-span-3 row-span-6 border border-gray-200 rounded-sm p-4 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Why Graviti.Finance?
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Smarter Investing. Global Access. Complete Control.
          </p>
          <ul className="flex flex-col space-y-3">
            {gravitiFeatures.map((item, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex items-start"
              >
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-5 row-span-2 border border-gray-200 rounded-sm p-4 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h2>
          <p className="text-sm text-gray-700">
            To empower Indian investors with seamless, secure access to the
            world’s most powerful digital and equity investment opportunities.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-3 row-span-4 sm:col-start-6 sm:row-start-3 border border-gray-200 rounded-sm p-4 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-gray-900 mb-2">The Mission</h2>
          <p className="text-sm text-gray-700">
            To simplify global investing through a regulated, low-cost platform
            powered by expert insights and advanced technology, minimizing risk
            and helping investors build long-term wealth with confidence.
          </p>
        </div>
        <div className="col-span-1 sm:col-span-5 row-span-4 sm:col-start-1 sm:row-start-7 border border-gray-200 rounded-sm p-4 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            What Can You Invest In?
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Maximize Potential with Limitless Investment Options
          </p>
          <ul className="flex flex-col space-y-4">
            {investmentOptions.map((item, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">
                  {item.title}:
                </span>{" "}
                <span className="ml-1">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-3 row-span-4 sm:col-start-6 sm:row-start-7 border border-gray-200 rounded-sm p-4 flex flex-col justify-start">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            How It Works?
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Transform Your Financial Future in 3 Simple Steps
          </p>
          <ol className="flex flex-col space-y-4">
            {investmentSteps.map((item, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">
                  {item.title}:
                </span>{" "}
                <span className="ml-1">{item.description}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-span-1 sm:col-span-2 row-span-4 sm:col-start-4 sm:row-start-3 border border-gray-200 rounded-sm p-4 flex items-center justify-center"></div>
      </div>
    </section>
  );
}

export default AboutSection;

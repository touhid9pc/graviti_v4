import AnimatedBlob from "@/components/animatedBlob/AnimatedBlob";
import React from "react";

const sections = [
  {
    title: "Eligibility Checklist",
    items: [
      "Sign up on Graviti using your email ID",
      "Complete your KYC with valid documents",
      "Invest a minimum of $100 on US stocks via Graviti",
      "Refer 3 friends using your unique referral link",
    ],
  },
  {
    title: "Inclusions",
    items: [
      "Round-trip flights from India to New York",
      "Hotel accommodation",
      "Wall Street tour experience",
    ],
  },
  {
    title: "Winner Selection",
    items: [
      "All eligible users enter a lucky draw",
      "Draw happens quarterly",
      "Higher investment may increase winning probability",
    ],
  },
];

function Rewards() {
  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <AnimatedBlob />
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-24 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="w-1 h-16 bg-emerald-500 mx-auto"></div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight">
              Win Your Dream Trip to
              <br />
              <span className="font-extrabold text-emerald-600 ">
                Wall Street
              </span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-50 font-bold leading-relaxed max-w-lg mx-auto">
            Invest in US stocks via{" "}
            <span className="text-emerald-400 font-bold">Graviti</span> and
            qualify for a premium Wall Street tour experience.
          </p>
        </div>
      </div>

      {/* Content Tower */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-24">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2"></div>

          <div className="space-y-24">
            {sections.map((section, i) => (
              <div key={section.title} className="relative">
                {/* Section Marker */}
                <div className="absolute left-1/2 top-0 w-3 h-3 lg:w-4 lg:h-4 bg-emerald-500 transform -translate-x-1/2 -translate-y-2"></div>

                {/* Section Content */}
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl">
                  {/* Section Header */}
                  <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                      {/* <div className="w-6 lg:w-8 h-px bg-white/30"></div>
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-6 lg:w-8 h-px bg-white/30"></div> */}
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    {section.items.map((item, j) => (
                      <div key={j} className="group">
                        <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 border border-emerald-500/50 backdrop-blur-sm bg-emerald-500/10 flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-bold text-emerald-400">
                              {String(j + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="flex-1 pt-2 sm:pt-2.5 lg:pt-3">
                            <p className="text-sm lg:text-lg text-white/90 leading-relaxed font-semibold">
                              {item}
                            </p>
                          </div>
                        </div>

                        {j < section.items.length - 1 && (
                          <div className="mt-4 sm:mt-5 lg:mt-6 ml-14 sm:ml-16 lg:ml-18">
                            <div className="w-full h-px bg-white/10"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rewards;

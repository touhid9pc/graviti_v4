import AnimatedBlob from "@/components/animatedBlob/AnimatedBlob";
import React from "react";

function Rewards() {
  const eligibilityChecklist = [
    "Sign up on Graviti using your email ID",
    "Complete your KYC with valid documents",
    <>
      Invest a minimum of{" "}
      <span className="text-emerald-400 font-extrabold">$100</span> on US stocks
      via Graviti
    </>,
    <>
      Refer <span className="text-emerald-400 font-extrabold">3 friends</span>{" "}
      using your unique referral link
    </>,
  ];

  const inclusions = [
    "Round-trip flights from India to New York",
    "Hotel accommodation",
    "Wall Street tour experience",
  ];

  const winnerSelection = [
    "All eligible users enter a lucky draw",
    "Draw happens quarterly",
    "Higher investment may increase winning probability",
  ];

  // A reusable List component with the vertical timeline style
  const TimelineList = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="relative border-l-2 border-emerald-400 pl-6 space-y-8">
      {items.map((item, idx) => (
        <li key={idx} className="relative pl-4">
          {/* Dot */}
          <span className="absolute -left-4 top-2 w-3 h-3 rounded-sm bg-emerald-400"></span>
          <p className="text-base text-slate-100">{item}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center">
      <AnimatedBlob />

      <div className="max-w-6xl mx-auto px-6 py-20 text-slate-100 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {/* Eligibility Checklist */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">
            Eligibility Checklist
          </h2>
          <ul className="space-y-6">
            <li className="border-l-4 border-emerald-400 pl-4">
              Sign up on Graviti using your email ID
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Complete your KYC with valid documents
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Invest a minimum of{" "}
              <span className="text-emerald-400 font-extrabold">$100</span> on
              US stocks via Graviti
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Refer{" "}
              <span className="text-emerald-400 font-extrabold">3 friends</span>{" "}
              using your unique referral link
            </li>
          </ul>
        </section>

        {/* Inclusions */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">Inclusions</h2>
          <ul className="space-y-6">
            <li className="border-l-4 border-emerald-400 pl-4">
              Round-trip flights from India to New York
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Hotel accommodation
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Wall Street tour experience
            </li>
          </ul>
        </section>

        {/* Winner Selection */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">Winner Selection</h2>
          <ul className="space-y-6">
            <li className="border-l-4 border-emerald-400 pl-4">
              All eligible users enter a lucky draw
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Draw happens quarterly
            </li>
            <li className="border-l-4 border-emerald-400 pl-4">
              Higher investment may increase winning probability
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Rewards;

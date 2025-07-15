"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
} from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Rewards", href: "/rewards" },
    ],
  },
];

const socialLinks = [
  {
    logo: <IoLogoInstagram className="text-2xl sm:text-3xl" />,
    url: "https://www.instagram.com/graviti.finance",
  },
  {
    logo: <IoLogoFacebook className="text-2xl sm:text-3xl" />,
    url: "https://www.facebook.com/graviti.finance",
  },
  {
    logo: <FaXTwitter className="text-2xl sm:text-3xl" />,
    url: "https://twitter.com/graviti_finance",
  },
  {
    logo: <IoLogoLinkedin className="text-2xl sm:text-3xl" />,
    url: "https://www.linkedin.com/company/graviti-finance",
  },
];

const policy = `Important Notice for All Visitors: Investing in US stocks and Exchange-Traded Funds (ETFs) through Graviti.Finance involves inherent risks that may result in the loss of your invested capital. Market volatility, currency exchange rate fluctuations, and regulatory changes in India and the United States could impact the value of your investments. The services are facilitated by Alphaquest Technovation Pvt. Ltd. in partnership with a licensed US broker-dealer, and we do not guarantee profits or protect against losses. Past performance is not a reliable indicator of future results. For a comprehensive understanding of these risks, please consult our full Risk Disclosure document available on this website. Your decision to invest should be based on your own assessment and, where necessary, independent financial advice.`;

export default function Footer() {
  const pathname = usePathname();
  const isHome = true;

  const footerClass = isHome
    ? "bg-white/10 backdrop-blur-md border-white/10 text-slate-100"
    : "bg-[#f8fafc] border-gray-200 text-slate-800";

  const titleClass = isHome
    ? "text-2xl sm:text-3xl md:text-4xl font-bold text-white"
    : "text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900";

  const paragraphClass = isHome
    ? "text-sm sm:text-base md:text-lg text-slate-400"
    : "text-sm sm:text-base md:text-lg text-slate-600";

  const sectionTitleClass = isHome
    ? "text-lg sm:text-xl font-semibold text-slate-300 mb-4"
    : "text-lg sm:text-xl font-semibold text-slate-700 mb-4";

  const linkClass = isHome
    ? " text-slate-200 hover:text-[#a8ffe0] transition-colors"
    : " text-slate-600 hover:text-blue-500 transition-colors";

  const copyrightClass = isHome
    ? "mt-10 text-center text-sm sm:text-base text-slate-500"
    : "mt-10 text-center text-sm sm:text-base text-slate-500";

  const termsAndCondition = isHome ? "bg-black/30" : "";

  return (
    <footer className={`w-full px-6 py-12 border-t ${footerClass}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={titleClass}>Graviti Finance</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div
            className={`${termsAndCondition} md:col-span-2 p-4 rounded-lg ${paragraphClass}`}
          >
            <p className="text-slate-50 text-sm lg:text-base">{policy}</p>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="">
              <h3 className={sectionTitleClass}>Contact</h3>
              <div className="flex flex-col lg:flex-col   gap-2 w-full lg:gap-3">
                <p className="text-sm sm:text-base">
                  We would love to hear from you:
                </p>
                <Link
                  href="mailto:info@graviti.finance"
                  className={`${linkClass} font-extrabold text-lg`}
                >
                  info@graviti.finance
                </Link>
              </div>
            </div>

            <div>
              <h3 className={sectionTitleClass}>Follow Us</h3>
              <div className="flex  gap-3">
                {socialLinks.map(({ logo, url }) => (
                  <Link
                    href={url}
                    target="_blank"
                    key={url}
                    className={linkClass}
                  >
                    {logo}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Graviti. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((section) =>
              section.links.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className={`${linkClass} text-sm`}
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin} from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
  }
];

const socialLinks = [
  { logo: <IoLogoInstagram className="text-2xl"/>, url: "https://www.instagram.com/graviti.finance" },
  { logo: <IoLogoFacebook className="text-2xl"/>, url: "https://www.facebook.com/graviti.finance" },
  { logo: <FaXTwitter className="text-2xl"/>, url: "https://twitter.com/graviti_finance" },
  { logo: <IoLogoLinkedin className="text-2xl"/>, url: "https://www.linkedin.com/company/graviti-finance" }
];

const policy = `Important Notice for All Visitors: Investing in US stocks and Exchange-Traded Funds (ETFs) through Graviti.Finance involves inherent risks that may result in the loss of your invested capital. Market volatility, currency exchange rate fluctuations, and regulatory changes in India and the United States could impact the value of your investments. The services are facilitated by Alphaquest Technovation Pvt. Ltd. in partnership with a licensed US broker-dealer, and we do not guarantee profits or protect against losses. Past performance is not a reliable indicator of future results. For a comprehensive understanding of these risks, please consult our full Risk Disclosure document available on this website. Your decision to invest should be based on your own assessment and, where necessary, independent financial advice.`

export default function Footer() {
  const pathname = usePathname();
  const isHome = true;

  const baseClass = "w-full px-6 py-12 border-t";
  const footerClass = isHome
    ? "bg-white/10 backdrop-blur-md border-white/10 text-slate-100"
    : "bg-[#f8fafc] border-gray-200 text-slate-800";

  const titleClass = isHome
    ? "text-xl sm:text-2xl md:text-3xl font-bold text-white"
    : "text-xl sm:text-2xl md:text-3xl font-bold text-slate-900";

  const paragraphClass = isHome
    ? "mt-2 text-sm sm:text-base md:text-lg text-slate-400"
    : "mt-2 text-sm sm:text-base md:text-lg text-slate-600";

  const sectionTitleClass = isHome
    ? "text-base sm:text-lg md:text-xl font-semibold text-slate-300 mb-3"
    : "text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-3";

  const linkClass = isHome
    ? "text-xs text-slate-200 hover:text-[#a8ffe0] transition-colors duration-200"
    : "text-xs text-slate-600 hover:text-blue-500 transition-colors duration-200";

  const copyrightClass = isHome
    ? "mt-10 text-center text-xs sm:text-sm md:text-base text-slate-500"
    : "mt-10 text-center text-xs sm:text-sm md:text-base text-slate-500";

  const termsAndCondition = isHome ? "bg-black/30" : ""

  return (
    <footer className={`${baseClass} ${footerClass}`}>
      <div>
        <h2 className={titleClass}>Graviti Finance</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[70%_25%] md:grid-cols-[70%_25%] gap-[2%] mt-2 w-full">
        <div className={`${termsAndCondition} h-full w-full md:p-3 sm:p-3 rounded-xl text-[14px]`}>
          <p>{policy}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="h-full">
            We love to hear from you, Reach out us on 
            <br/>
            <Link href={"mailto:info@graviti.finance"} className={`${linkClass} font-bold text-xl!`}>info@graviti.finance</Link>
          </p>
          <div className="h-full text-lg">
            Follow us on
            <div className="flex gap-2 mt-1">
              {socialLinks.map(({ logo, url }) => (
                <Link href={url} target="_blank" key={url} className={`${linkClass}`}>
                  {logo}
                </Link>
              )
              )}
            </div>
          </div>
          <div className="flex flex-col">
          </div>
        </div>

      </div>

      <div className={`${copyrightClass} flex justify-between text-xs`}>
        <p className="text-xs">
          © {new Date().getFullYear()} Graviti. All rights reserved.
        </p>
        <div className="flex gap-2">
          {footerLinks.map((section) => (
            section.links.map((link,index) => (
                <Link href={link.href}key={index} className={linkClass}>
                  {link.label}
                </Link>
            ))
          ))}
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    ? "text-sm sm:text-base md:text-lg text-slate-200 hover:text-[#a8ffe0] transition-colors duration-200"
    : "text-sm sm:text-base md:text-lg text-slate-600 hover:text-blue-500 transition-colors duration-200";

  const copyrightClass = isHome
    ? "mt-10 text-center text-xs sm:text-sm md:text-base text-slate-500"
    : "mt-10 text-center text-xs sm:text-sm md:text-base text-slate-500";

  return (
    <footer className={`${baseClass} ${footerClass}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h2 className={titleClass}>Graviti</h2>
          {/* <p className={paragraphClass}>
            Empowering the next generation of investors with smart tools and
            automation.
          </p> */}
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className={sectionTitleClass}>{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={copyrightClass}>
        © {new Date().getFullYear()} Graviti. All rights reserved.
      </div>
    </footer>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const toggleMenu = () => setOpen((prev) => !prev);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 
       `}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-end">
        {/* <Link href="/" className="text-xl font-bold text-black">
          Logo
        </Link> */}

        <nav className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[#FAF9F6] transition font-bold`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={open}
          className="md:hidden focus:outline-none z-50"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-[#FAF9F6] transition-transform duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#FAF9F6] transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#FAF9F6] transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 backdrop-blur-lg p-6 shadow-lg z-40 flex flex-col space-y-6 md:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`  text-lg font-medium text-[#FAF9F6]/70 hover:text-[#FAF9F6] duration-200 transition`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>

            <motion.div
              className="fixed inset-0 bg-white/10 backdrop-blur-sm z-30"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HamburgerMenu;

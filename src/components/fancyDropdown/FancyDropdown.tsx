import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { categories } from "@/constants/companyStocksImages";

type categoryType = {
  id: string;
  title: string;
  svgPath: string;
};
interface FancyDropdownProps {
  selectedCategory: categoryType;
  setSelectedCategory: (category: categoryType) => void;
}

export default function FancyDropdown({
  selectedCategory,
  setSelectedCategory,
}: FancyDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mx-auto my-10 z-50 md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 rounded-xl  text-[#1a1a1a] px-4 py-3 text-left shadow-sm  transition-colors"
      >
        <div className="flex items-center gap-3">
          <Image
            src={selectedCategory.svgPath}
            alt={selectedCategory.title}
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-base sm:text-lg font-semibold">
            {selectedCategory.title}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-xl shadow-xl z-10 overflow-hidden max-h-[60vh] overflow-y-auto"
          >
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpen(false);
                }}
              >
                <Image
                  src={cat.svgPath}
                  alt={cat.title}
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="text-sm sm:text-base font-medium text-gray-800">
                  {cat.title}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

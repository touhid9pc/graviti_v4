import {
  companiesImages,
  CompanySymbol,
} from "@/constants/companyStocksImages";
import { Company, companyData } from "@/constants/constant";
import { selectCompaniesByNumber } from "@/utils/common";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import "./Block.css";
import toast from "react-hot-toast";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const Block = () => {
  const extractedCompanyData = selectCompaniesByNumber(companyData as any, 10);

  const [shuffledData, setShuffledData] = useState(() => extractedCompanyData);
  const [selectedCard, setSelectedCard] = useState<Company[]>([]);

  // Memoize selected card IDs
  const selectedCardIds = useMemo(
    () => new Set(selectedCard.map((card) => card.symbol)),
    [selectedCard]
  );

  const handleCardSelect = useCallback(
    (item: Company) => {
      const isSelected = selectedCardIds.has(item.symbol);

      if (!isSelected && selectedCard.length === 4) {
        toast.error("Please select only 4 cards");
        return;
      }

      setSelectedCard((prev) => {
        if (isSelected) {
          return prev.filter((card) => card.symbol !== item.symbol);
        } else {
          return [...prev, item];
        }
      });
    },
    [selectedCardIds, selectedCard.length]
  );

  return (
    <motion.ul
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.7 }}
      className="list-wrapper w-full"
    >
      {shuffledData?.map((data, idx) => {
        const isSelected = selectedCardIds.has(data?.symbol);

        return (
          <li
            key={idx}
            className="list-items   border-slate-500"
            onClick={() => {
              handleCardSelect(data);
            }}
          >
            {isSelected && (
              <motion.div
                key={`overlay-${data?.symbol}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-10 left-[50%] translate-x-[-50%]  z-20 flex items-center justify-center bg-green-300 rounded-full p-2 "
              >
                <Check size={36} color="white" className="drop-shadow-md" />
              </motion.div>
            )}
            <div className="title-wrapper ">
              <p className="break-words text-2xl">{data?.name}</p>
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/881020/adidas02.png"
              alt=""
              className="company-image"
              style={{ width: "62%" }}
            />
            {/* <Image
              src={
                companiesImages[data?.symbol as CompanySymbol] ||
                "/fallback.webp"
              }
              alt={data?.name}
              width={100}
              height={100}
              loading="lazy"
              className="company-image !top-[50%] !left-[50%] t!ranslate-x-[-50%] !ranslate-y-[-50%] "
            /> */}
          </li>
        );
      })}
    </motion.ul>
  );
};

export default Block;

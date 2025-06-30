import { CarouselCardData } from "@/constants/constant";
import toast from "react-hot-toast";

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function calculateStockProfit(
  selectedStocks: CarouselCardData[],
  totalInvestment: number
) {
  if (!Number.isFinite(totalInvestment) || totalInvestment <= 0) {
    throw new Error("Total investment must be a positive number");
  }

  for (const stock of selectedStocks) {
    if (!stock || typeof stock !== "object" || !Number.isFinite(stock.growth)) {
      toast.error(`Invalid stock data for ${stock?.title || "unknown stock"}`);
    }
  }

  const individualInvestment = totalInvestment / selectedStocks.length;

  const totalProfit = selectedStocks.reduce((sum, stock) => {
    const profit = individualInvestment * (stock.growth / 100);
    return sum + (Number.isFinite(profit) ? profit : 0);
  }, 0);

  const percentageGrowth = (totalProfit / totalInvestment) * 100;

  return {
    profit: Number(totalProfit.toFixed(2)),
    totalAmountInvested: totalInvestment,
    percentageGrowth: Number(percentageGrowth.toFixed(2)),
  };
}

/**
 */
// function testCalculateStockProfit() {
//   // Select 4 stocks: Amazon, Walmart, Tesla, Hp
//   const selectedStocks = [
//     carouselData[5], // Amazon
//     carouselData[6], // Walmart
//     carouselData[7], // Tesla
//     carouselData[8], // Hp
//   ];

//   const totalInvestment = 1000; // 1000 rupees

//   try {
//     const result = calculateStockProfit(selectedStocks, totalInvestment);
//     console.log("Selected Stocks:", selectedStocks.map(stock => stock.title));
//     console.log("Total Investment:", totalInvestment);
//     console.log("Result:", result);
//   } catch (error) {
//     console.error("Error:", error instanceof Error ? error.message : error);
//   }
// }

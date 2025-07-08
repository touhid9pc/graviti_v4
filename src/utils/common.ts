import {
  CarouselCardData,
  carouselStyleData,
  Company,
  CompanyDataset,
} from "@/constants/constant";
import toast from "react-hot-toast";

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getRandomSample(arr: any, count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function pickRandomCompaniesPerCategory(data: any, count = 10) {
  const categories = Object.keys(data);
  const randomCategories = getRandomSample(categories, count);

  const result = randomCategories.map((category) => {
    const companies = data[category];
    const randomCompany =
      companies[Math.floor(Math.random() * companies.length)];
    return { company: randomCompany };
  });

  return result;
}

export function calculateStockProfit(
  selectedStocks: Company[],
  totalInvestment: number
) {
  if (!Number.isFinite(totalInvestment) || totalInvestment <= 0) {
    throw new Error("Total investment must be a positive number");
  }

  //   for (const stock of selectedStocks) {
  //     if (!stock || typeof stock !== "object" || !Number.isFinite(stock.growth)) {
  //       toast.error(`Invalid stock data for ${stock?.name || "unknown stock"}`);
  //     }
  //   }

  const individualInvestment = totalInvestment / selectedStocks.length;

  const totalProfit = selectedStocks.reduce((sum, stock) => {
    const profit = individualInvestment * (parseFloat(stock?.growth) / 100);
    return sum + (Number.isFinite(profit) ? profit : 0);
  }, 0);

  const percentageGrowth = (totalProfit / totalInvestment) * 100;

  return {
    profit: Number(totalProfit.toFixed(2)),
    totalAmountInvested: totalInvestment,
    percentageGrowth: Number(percentageGrowth.toFixed(2)),
  };
}

export function getRandomStyleObject(idx?: number) {
  const randomIndex = Math.floor(Math.random() * carouselStyleData.length);
  return carouselStyleData[idx ? idx : randomIndex];
}

export function selectCompaniesByNumber(
  data: CompanyDataset,
  count: number
): Company[] {
  const selected: Company[] = [];

  for (const category in data) {
    const companies = data[category];
    if (Array.isArray(companies) && companies.length) {
      selected.push(...companies.slice(0, count));
    }
  }

  return selected;
}

import {
  CarouselCardData,
  Company,
  CompanyDataset,
} from "@/constants/constant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface InterestsData {
  companies: Company[];
  triviaScore: number;
  // uid: string | undefined;
  timestamp: Date;
}

interface AppState {
  step: number;
  interestsData: InterestsData;
  user: any;
  isProceed: boolean;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setInterestsData: (data: InterestsData) => void;
  setUser: (user: any) => void;
  setIsProceed: (data: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      step: 1,
      interestsData: {
        companies: [],
        triviaScore: 0,
        uid: undefined,
        timestamp: new Date(),
      },
      user: null,
      isProceed: false,

      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

      setInterestsData: (data) => set({ interestsData: data }),
      setUser: (user) => set({ user }),

      setIsProceed: (data: boolean) => set({ isProceed: data }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        step: state.step,
        interestsData: state.interestsData,
        user: state.user,
        isProceed: state.isProceed,
      }),
    }
  )
);

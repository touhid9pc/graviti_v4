import { CarouselCardData, CompanyDataset } from "@/constants/constant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface InterestsData {
  companies: CompanyDataset[];
  triviaScore: number;
  // uid: string | undefined;
  timestamp: Date;
}

interface AppState {
  step: number;
  interestsData: InterestsData;
  user: any;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setInterestsData: (data: InterestsData) => void;
  setUser: (user: any) => void;
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

      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

      setInterestsData: (data) => set({ interestsData: data }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        step: state.step,
        interestsData: state.interestsData,
        user: state.user,
      }),
    }
  )
);

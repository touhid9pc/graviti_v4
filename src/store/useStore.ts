import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface InterestsData {
  companies: [];
  triviaScore: number;
  uid: string | undefined;
  timestamp: Date;
}

interface AppState {
  step: number;
  interestsData: InterestsData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setInterests: (data: InterestsData) => void;
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

      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

      setInterests: (data) => set({ interestsData: data }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        step: state.step,
        interestsData: state.interestsData,
      }),
    }
  )
);

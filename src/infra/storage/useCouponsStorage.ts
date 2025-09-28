import { create } from "zustand";
import { Coupons } from "../types";

interface CouponsStorage {
  coupons: Coupons[];
  couponsCache: Coupons[];
  isLoading: boolean;
}

interface CouponsAction {
  setCoupons: (coupons: Coupons[]) => void;
  setCouponsCache: (coupons: Coupons[]) => void;
  resetCoupons: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCouponsStorage = create<CouponsStorage & CouponsAction>(
  (set) => ({
    coupons: [],
    couponsCache: [],
    isLoading: false,
    setCoupons: (coupons: Coupons[]) => set({ coupons }),
    setCouponsCache: (coupons: Coupons[]) => set({ couponsCache: coupons }),
    resetCoupons: () => set((state) => ({ coupons: state.couponsCache })),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
  })
);

import { filterByRange } from "@/domain/use-cases";
import { useCouponsStorage } from "@/infra";
import { useState } from "react";

export const useFilterDays = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { setCoupons, couponsCache, resetCoupons } = useCouponsStorage();
  const handleSelectDay = (dayId: number, day: number) => {
    if (selectedDay === dayId) {
      handleRemoveFilter();
      return;
    }

    const filteredCoupons = filterByRange(couponsCache, day);
    setCoupons(filteredCoupons);
    setSelectedDay(dayId);
  };

  const handleRemoveFilter = () => {
    resetCoupons();
    setSelectedDay(null);
  };

  return { selectedDay, handleSelectDay, handleRemoveFilter };
};

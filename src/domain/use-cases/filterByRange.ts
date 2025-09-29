import { Coupons } from "@/infra";
import { isAfter, isBefore, subDays } from "date-fns";

export const filterByRange = (coupons: Coupons[], days: number) => {
  const today = new Date();
  const startDate = subDays(today, days);

  return coupons.filter((coupon) => {
    const expireDate = new Date(coupon.expire_at);
    // Inclui cupons que expiram entre startDate (inclusive) e today (exclusive)
    return !isBefore(expireDate, startDate) && isBefore(expireDate, today);
  });
};

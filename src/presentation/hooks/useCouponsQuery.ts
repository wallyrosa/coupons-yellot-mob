import { Coupons } from "@/infra";
import { couponsRepository } from "@/infra/repositories";
import { useQuery } from "@tanstack/react-query";

export const useCouponsQuery = () => {
  const { getCoupons } = couponsRepository();

  return useQuery<Coupons[]>({
    queryKey: ["coupons"],
    queryFn: getCoupons,
  });
};

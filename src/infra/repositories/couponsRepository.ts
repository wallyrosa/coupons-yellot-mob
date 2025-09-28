import { apiYellot } from "../services";

export const couponsRepository = () => {
  const getCoupons = async () => {
    const response = await apiYellot.get("/discount/api/front-end-test");
    return response.data;
  };

  return { getCoupons };
};

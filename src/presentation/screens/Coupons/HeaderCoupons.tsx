import { Card, FilterDays } from "@/presentation/components/Coupons";
import { View } from "react-native";

export const HeaderCoupons = () => {
  return (
    <View className="w-full gap-7">
      <Card />
      <FilterDays />
    </View>
  );
};

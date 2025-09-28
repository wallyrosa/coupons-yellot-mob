import { View } from "react-native";
import { CouponsScreen } from "@/presentation";

export default function Coupons() {
  return (
    <View className="flex-1 p-5 w-full justify-center items-center bg-background text-primary-text gap-7">
      <CouponsScreen.Header />
      <CouponsScreen.Main />
    </View>
  );
}

import { useCouponsStorage } from "@/infra";
import { Text, View } from "react-native";
import { ProgressBar } from "../ProgressBar";
import { Separator, Skeleton } from "../UI";

export const Card = () => {
  const { coupons, isLoading } = useCouponsStorage();
  const availableCoupons = coupons.filter((coupon) => coupon.is_active);
  const progress = (availableCoupons.length / coupons.length) * 100;

  return (
    <>
      {isLoading && (
        <Skeleton className="bg-primary rounded-lg p-5 w-full h-[160] min-h-[160] max-h-[160]" />
      )}
      {!isLoading && (
        <View className="bg-primary rounded-lg p-5 w-full h-[160] min-h-[160] max-h-[160]">
          <Text className="text-secondary-text">Total</Text>
          <Text className="text-primary-text text-5xl text-center font-bold">
            {coupons.length}
          </Text>
          <Separator className="my-4" />
          <View className="w-full flex-row items-end gap-2 px-4">
            <View className="flex-col w-full">
              <Text className="text-secondary-text">Cupons disponíveis</Text>
              <View className="flex-row items-center gap-2">
                <ProgressBar
                  className="w-[90%]"
                  label="Total"
                  progress={progress}
                />
                <Text className="text-primary-text h- justify-start text-center w-[10%]">
                  {availableCoupons.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

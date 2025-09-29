import { useCouponsStorage } from "@/infra";
import { Text, View } from "react-native";
import { ProgressBar } from "../UI";
import { Separator, Skeleton } from "../UI";

export const Card = () => {
  const { coupons, isLoading } = useCouponsStorage();
  const availableCoupons = coupons.filter((coupon) => coupon.is_active);
  const progress = (availableCoupons.length / coupons.length) * 100;

  return (
    <>
      {isLoading && (
        <Skeleton
          testID="skeleton"
          className="bg-primary rounded-lg p-5 w-full h-[160] min-h-[160] max-h-[160]"
        />
      )}
      {!isLoading && (
        <View
          testID="card-container"
          className="bg-primary rounded-lg p-5 w-full h-[160] min-h-[160] max-h-[160]"
        >
          <Text className="text-secondary-text">Total</Text>
          <Text className="text-5xl font-bold text-center text-primary-text">
            {coupons.length}
          </Text>
          <Separator testID="separator" className="my-4" />
          <View className="flex-row gap-2 items-end px-4 w-full">
            <View className="flex-col w-full">
              <Text className="text-secondary-text">Cupons disponíveis</Text>
              <View className="flex-row gap-2 items-center">
                <ProgressBar
                  testID="progress-bar"
                  className="w-[90%]"
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

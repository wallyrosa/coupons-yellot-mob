import { useCouponsStorage } from "@/infra";
import { useFilterDays } from "@/presentation/hooks";
import { colors } from "@/theme";
import { cn, daysFilters } from "@/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Skeleton } from "../UI";

export const FilterDays = () => {
  const { selectedDay, handleSelectDay, handleRemoveFilter } = useFilterDays();
  const { coupons, couponsCache, setCouponsCache, isLoading } =
    useCouponsStorage();

  useEffect(() => {
    if (couponsCache.length === 0 && coupons.length > 0) {
      setCouponsCache(coupons);
    }
  }, [coupons, couponsCache.length, setCouponsCache]);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {isLoading && (
        <View className="flex-row gap-2 items-center justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex-1 w-28 border rounded-full h-[40]"
            />
          ))}
        </View>
      )}

      {!isLoading &&
        daysFilters.map((day, index) => (
          <TouchableOpacity
            key={day.id}
            onPress={() => handleSelectDay(day.id, day.day)}
            className={cn(
              "bg-primary flex-row items-center justify-between gap-2 rounded-3xl px-7 py-2 h-[40]",
              {
                "ml-3": index !== 0,
                "bg-secondary px-3": selectedDay === day.id,
              }
            )}
          >
            <Text className="text-primary-text">{day.name}</Text>
            {selectedDay === day.id && (
              <TouchableOpacity
                className="justify-center items-center w-5 h-5 rounded-full bg-muted"
                onPress={handleRemoveFilter}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={10}
                  color={colors.primary.text}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

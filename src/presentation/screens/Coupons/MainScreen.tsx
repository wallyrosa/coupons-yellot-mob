import { groupByMonth } from "@/domain/use-cases";
import { useCouponsStorage } from "@/infra";
import {
  ItemListCoupons,
  Separator,
  Skeleton,
} from "@/presentation/components";
import { useCouponsQuery } from "@/presentation/hooks";
import { colors } from "@/theme";
import { firstLetterToUppercase } from "@/utils";
import { useEffect } from "react";
import { RefreshControl, SectionList, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const MainCoupons = () => {
  const { data, isPending, isError, refetch, isFetching } = useCouponsQuery();
  const { setCoupons, coupons, setIsLoading, isLoading } = useCouponsStorage();

  useEffect(() => {
    setIsLoading(isFetching || isPending);
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Erro ao carregar cupons",
        text2: "Tente novamente mais tarde",
      });
      return;
    }
    setCoupons(data ?? []);
  }, [data, isError, isPending, isFetching]);

  return (
    <View className="flex-1 w-full">
      <SectionList
        sections={isLoading ? [] : groupByMonth(coupons)}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <ItemListCoupons key={item.code} item={item} />
        )}
        ItemSeparatorComponent={() => <Separator />}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={5}
        ListEmptyComponent={() => (
          <View className="relative flex-1 justify-center items-center gap-4">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex-1 border bg-muted h-[60] w-full"
                />
              ))
            ) : (
              <Text className="absolute flex-1 justify-center items-center top-[-50%] translate-y-[50%] text-secondary-text text-2xl">
                Nenhum cupom encontrado
              </Text>
            )}
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="pt-4 text-secondary-text">
            {firstLetterToUppercase(section.title)}
          </Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isPending}
            onRefresh={refetch}
            tintColor={colors.background}
            colors={[colors.background]}
            progressBackgroundColor={colors.secondary.DEFAULT}
          />
        }
      />
    </View>
  );
};

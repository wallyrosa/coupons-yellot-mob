import { Text, View } from "react-native";
import { format } from "date-fns";
import { CouponsIcon } from "./CouponsIcon";
import { Coupons } from "@/infra";
import { cn } from "@/utils";
import { ptBR } from "date-fns/locale";

interface ItemListCouponsProps {
  item: Coupons;
}

export const ItemListCoupons = ({ item }: ItemListCouponsProps) => {
  const isActiveLabel = item.is_active ? "Ativo" : "Expirado";

  return (
    <View className="w-full flex-row items-center py-4 justify-between">
      <View className="flex-row items-center gap-5">
        <CouponsIcon />
        <View className="flex-col">
          <Text className="text-primary-text uppercase text-lg font-bold">
            {item.code}
          </Text>
          <Text className="text-secondary-text text-sm uppercase">
            {format(new Date(item.expire_at), "dd MMM", { locale: ptBR })}
          </Text>
        </View>
      </View>
      <View className="flex-row rounded-full border border-muted p-2 items-center justify-center gap-2">
        <View
          className={cn(
            "w-5 h-5 min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-success",
            {
              "bg-success": item.is_active,
              "bg-destructive": !item.is_active,
            }
          )}
        />
        <Text className="text-secondary-text text-sm">{isActiveLabel}</Text>
      </View>
    </View>
  );
};

export default ItemListCoupons;

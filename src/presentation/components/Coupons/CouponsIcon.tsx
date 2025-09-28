import { colors } from "@/theme";
import { cn } from "@/utils";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View } from "react-native";

export const CouponsIcon = ({ className }: { className?: string }) => {
  return (
    <View className={cn("relative flex-row items-center gap-2", className)}>
      <View className="absolute top-0 left-[25] w-5 h-5 rounded-full bg-background border border-tertiary z-20 items-center justify-center">
        <View className="w-[50%] h-[2] bg-tertiary" />
      </View>
      <View className="bg-tertiary rounded-full min-w-12 min-h-12 w-12 h-12 max-w-12 max-h-12 items-center justify-center">
        <FontAwesome6 name="dollar-sign" size={20} color={colors.background} />
      </View>
    </View>
  );
};

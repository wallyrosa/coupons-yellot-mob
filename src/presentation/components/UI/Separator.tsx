import { cn } from "@/utils";
import { View } from "react-native";

interface SeparatorProps {
  className?: string;
}

export const Separator = ({ className }: SeparatorProps) => (
  <View className={cn("h-[1] bg-separator", className)} />
);

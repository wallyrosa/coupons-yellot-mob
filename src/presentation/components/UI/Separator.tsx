import { cn } from "@/utils";
import { View } from "react-native";

interface SeparatorProps {
  className?: string;
  testID?: string;
}

export const Separator = ({ className, testID }: SeparatorProps) => (
  <View testID={testID} className={cn("h-[1] bg-separator", className)} />
);

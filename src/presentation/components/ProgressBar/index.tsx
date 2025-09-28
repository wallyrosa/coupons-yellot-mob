import { cn } from "@/utils";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  className?: string;
  label: string;
  progress: number;
}

export const ProgressBar = ({
  className,
  label,
  progress = 0,
}: ProgressBarProps) => {
  let progressWidth = progress;
  if (progress > 100) {
    progressWidth = 100;
  }
  const progressValue = useSharedValue(0);

  const progressAnimation = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  useEffect(() => {
    progressValue.value = withTiming(progressWidth, { duration: 300 });
  }, [progressWidth]);

  return (
    <View
      className={cn("relative gap-2 w-full rounded-full bg-primary", className)}
    >
      <View className="absolute top-0 left-0 w-full h-2 rounded-full min-h-2 bg-secondary" />
      <Animated.View
        className="absolute top-0 left-0 h-2 rounded-full min-h-2 bg-success"
        style={progressAnimation}
      />
    </View>
  );
};

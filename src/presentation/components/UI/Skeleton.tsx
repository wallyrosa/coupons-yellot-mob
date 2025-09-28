import { cn } from "@/utils";
import { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

export const Skeleton = ({ className, ...props }: ViewProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, [opacity]);

  return (
    <Animated.View
      style={{ opacity }}
      className={cn("bg-muted rounded-md", className)}
      {...props}
    />
  );
};

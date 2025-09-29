import { cn } from "@/utils";
import { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

export const Skeleton = ({ className, ...props }: ViewProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    const pulse = () => {
      if (!isMounted.current) return;

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
      ]).start(() => {
        if (isMounted.current) {
          pulse();
        }
      });
    };

    pulse();

    return () => {
      isMounted.current = false;
    };
  }, [opacity]);

  return (
    <Animated.View
      style={{ opacity }}
      className={cn("bg-muted rounded-md", className)}
      {...props}
    />
  );
};

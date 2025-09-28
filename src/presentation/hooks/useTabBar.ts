import { tabIcons } from "@/utils";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import {
  NavigationHelpers,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useTabBar = (
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
  state: TabNavigationState<ParamListBase>
) => {
  const getIconName = (routeName: string, isFocused: boolean): any => {
    const icon = tabIcons[routeName as keyof typeof tabIcons];
    return isFocused ? icon?.focused : icon?.unfocused;
  };

  const [dimensions, setDimensions] = useState({ width: 20, height: 100 });

  const buttonWidth = dimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);

  const animatedItem = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const onPress = (
    route: NavigationRoute<ParamListBase, string>,
    isFocused: boolean,
    index: number
  ) => {
    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = (key: string) => {
    navigation.emit({
      type: "tabLongPress",
      target: key,
    });
  };

  return {
    getIconName,
    onPress,
    onLongPress,
    animatedItem,
    setDimensions,
    dimensions,
    buttonWidth,
  };
};

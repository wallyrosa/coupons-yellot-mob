import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { TabBarButton } from "./TabBarButton";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      className="absolute bottom-3 flex-row gap-4 justify-around items-center px-2 py-2 w-[95%] max-h-20 rounded-3xl bg-muted left-[50%] -translate-x-[50%]"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TabBarButton
            key={route.key}
            isFocused={isFocused}
            route={route}
            navigation={navigation}
            options={options}
            state={state}
          />
        );
      })}
    </View>
  );
}

import { colors } from "@/theme";
import { cn } from "@/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTabBar } from "../../hooks";
import {
  NavigationHelpers,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export interface TabBarButtonProps {
  isFocused: boolean;
  route: NavigationRoute<ParamListBase, string>;
  navigation: NavigationHelpers<ParamListBase>;
  options: BottomTabNavigationOptions;
  state: TabNavigationState<ParamListBase>;
}

export const TabBarButton = ({
  isFocused,
  route,
  navigation,
  options,
  state,
}: TabBarButtonProps) => {
  const { getIconName, onLongPress, onPress } = useTabBar(navigation, state);
  const label = options.tabBarLabel ?? options.title ?? route.name ?? "";

  return (
    <TouchableOpacity
      className={cn(
        "justify-center items-center px-5 h-full my-2 rounded-2xl",
        {
          "bg-secondary": isFocused,
        }
      )}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onLongPress={() => onLongPress(route.key)}
      onPress={() => onPress(route, isFocused, state.index)}
    >
      <View className="justify-center items-center">
        <MaterialCommunityIcons
          name={getIconName(route.name, isFocused)}
          size={25}
          color={isFocused ? colors.primary.text : colors.muted.text}
        />
        <Text
          className={cn("text-xs", {
            "text-primary-text": isFocused,
            "text-muted-text": !isFocused,
          })}
        >
          {label as string}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

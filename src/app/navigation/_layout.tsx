import { colors } from "@/theme";
import { Tabs } from "expo-router";
import { TabBar } from "@/presentation";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function NavigationLayout() {
  return (
    <Tabs
      screenOptions={screenOptions}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="Coupons" options={{ title: "Cupons" }} />
      <Tabs.Screen name="Search" options={{ title: "Procurar" }} />
      <Tabs.Screen name="History" options={{ title: "Histórico" }} />
      <Tabs.Screen name="Wallet" options={{ title: "Carteira" }} />
    </Tabs>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.foreground,
  },
  headerTitleStyle: {
    color: colors.primary.text,
    fontSize: 20,
  },
  headerTitleAlign: "center",
} as BottomTabNavigationOptions;

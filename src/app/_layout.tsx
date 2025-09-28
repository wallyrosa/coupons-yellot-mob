import "@/theme/global.css";
import { queryClient } from "@/infra/services";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView className="flex-1" edges={["bottom"]}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="navigation" />
          </Stack>
          <Toast config={toastConfig} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </QueryClientProvider>
  );
}

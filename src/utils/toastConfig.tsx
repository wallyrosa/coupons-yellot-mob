import { BaseToast, ErrorToast } from "react-native-toast-message";
import { colors } from "@/theme";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.background,
        borderLeftColor: colors.success.DEFAULT,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftColor: colors.destructive.DEFAULT,
        borderColor: colors.destructive.DEFAULT,
        backgroundColor: colors.background,
      }}
      text1Style={{
        fontSize: 17,
        color: colors.primary.text,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.primary.text,
      }}
    />
  ),
};

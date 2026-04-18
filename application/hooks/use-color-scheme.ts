import { useThemeContext } from "@/core/presentation/provider/theme-provider";

export function useColorScheme() {
  return useThemeContext().colorScheme;
}

// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.down": "keyboard-arrow-down",
  "sportscourt.fill": "sports-soccer",
  "trophy.fill": "emoji-events",
  "chart.bar.fill": "bar-chart",
  "bell.fill": "notifications",
  "star.fill": "star",
  "clock.fill": "access-time",
  "calendar": "calendar-today",
  "magnifyingglass": "search",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "info.circle.fill": "info",
  "person.fill": "person",
  "gearshape.fill": "settings",
  "flame.fill": "local-fire-department",
  "bolt.fill": "bolt",
  "globe": "language",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

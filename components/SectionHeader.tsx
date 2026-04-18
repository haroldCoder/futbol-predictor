import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useColors } from "@/application/hooks/use-colors";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  const colors = useColors();
  return (
    <View style={styles.container}>
      <View style={[styles.accent, { backgroundColor: "#00C853" }]} />
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text style={[styles.seeAll, { color: "#00C853" }]}>Ver todo</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  accent: {
    width: 4,
    height: 18,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "600",
  },
});

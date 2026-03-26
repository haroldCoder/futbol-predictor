import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useColors } from "@/hooks/use-colors";

export function SkeletonCard() {
  const colors = useColors();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity }]}>
      <View style={[styles.line, { backgroundColor: colors.border, width: "40%" }]} />
      <View style={styles.teamsRow}>
        <View style={[styles.circle, { backgroundColor: colors.border }]} />
        <View style={[styles.line, { backgroundColor: colors.border, width: "20%", height: 6 }]} />
        <View style={[styles.circle, { backgroundColor: colors.border }]} />
      </View>
      <View style={[styles.line, { backgroundColor: colors.border, width: "100%" }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  line: {
    height: 10,
    borderRadius: 5,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

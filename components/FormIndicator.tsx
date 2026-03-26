import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FormResult } from "@/types/football";

interface FormIndicatorProps {
  form: FormResult[];
  size?: "sm" | "md";
}

const FORM_COLORS: Record<FormResult, string> = {
  W: "#00C853",
  D: "#FF9800",
  L: "#F44336",
};

export function FormIndicator({ form, size = "md" }: FormIndicatorProps) {
  const dotSize = size === "sm" ? 20 : 26;
  const fontSize = size === "sm" ? 9 : 11;

  return (
    <View style={styles.container}>
      {form.slice(0, 5).map((result, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: FORM_COLORS[result] + "33",
              borderColor: FORM_COLORS[result],
            },
          ]}
        >
          <Text style={[styles.letter, { color: FORM_COLORS[result], fontSize }]}>{result}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontWeight: "700",
  },
});

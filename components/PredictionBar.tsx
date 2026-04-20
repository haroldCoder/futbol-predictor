import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PredictionModel } from "@/core/domain/models";
import { useColors } from "@/application/hooks/use-colors";

interface PredictionBarProps {
  prediction: PredictionModel;
  compact?: boolean;
}

export function PredictionBar({ prediction, compact = false }: PredictionBarProps) {
  const colors = useColors();

  const { homeWin, draw, awayWin } = prediction;

  const confidenceColor = {
    high: "#00C853",
    medium: "#FF9800",
    low: "#F44336",
  }[prediction.confidence];

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={[styles.compactBar, { backgroundColor: colors.border }]}>
          <View style={[styles.compactSegment, { width: `${homeWin}%`, backgroundColor: "#00C853" }]} />
          <View style={[styles.compactSegment, { width: `${draw}%`, backgroundColor: "#7B9BB5" }]} />
          <View style={[styles.compactSegment, { width: `${awayWin}%`, backgroundColor: "#1565C0" }]} />
        </View>
        <View style={styles.compactLabels}>
          <Text style={[styles.compactPct, { color: "#00C853" }]}>{homeWin}%</Text>
          <Text style={[styles.compactPct, { color: "#7B9BB5" }]}>{draw}%</Text>
          <Text style={[styles.compactPct, { color: "#1565C0" }]}>{awayWin}%</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelsRow}>
        <Text style={[styles.label, { color: "#E8F4FD" }]}>Local</Text>
        <Text style={[styles.label, { color: "#E8F4FD" }]}>Empate</Text>
        <Text style={[styles.label, { color: "#E8F4FD" }]}>Visitante</Text>
      </View>

      <View style={[styles.barContainer, { backgroundColor: colors.border }]}>
        <View style={[styles.segment, { width: `${homeWin}%`, backgroundColor: "#00C853" }]} />
        <View style={[styles.segment, { width: `${draw}%`, backgroundColor: "#5A7A96" }]} />
        <View style={[styles.segment, { width: `${awayWin}%`, backgroundColor: "#1565C0" }]} />
      </View>

      <View style={styles.percentRow}>
        <Text style={[styles.percent, { color: "#00C853" }]}>{homeWin}%</Text>
        <Text style={[styles.percent, { color: "#7B9BB5" }]}>{draw}%</Text>
        <Text style={[styles.percent, { color: "#1565C0" }]}>{awayWin}%</Text>
      </View>

      <View style={styles.confidenceRow}>
        <View style={[styles.confidenceDot, { backgroundColor: confidenceColor }]} />
        <Text style={[styles.confidenceText, { color: colors.muted }]}>
          Confianza{" "}
          <Text style={{ color: confidenceColor }}>
            {prediction.confidence === "high" ? "Alta" : prediction.confidence === "medium" ? "Media" : "Baja"}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
  },
  barContainer: {
    height: 10,
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
  percentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percent: {
    fontSize: 15,
    fontWeight: "700",
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 12,
  },
  // Compact
  compactContainer: {
    gap: 4,
  },
  compactBar: {
    height: 4,
    borderRadius: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  compactSegment: {
    height: "100%",
  },
  compactLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compactPct: {
    fontSize: 10,
    fontWeight: "600",
  },
});

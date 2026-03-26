import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SectionHeader } from "@/components/SectionHeader";
import { useFootball } from "@/hooks/useFootball";
import { useColors } from "@/hooks/use-colors";

export default function StatsScreen() {
  const { getModelAccuracy, leagues } = useFootball();
  const colors = useColors();
  const accuracy = getModelAccuracy();

  const leagueAccuracyData = Object.entries(accuracy.byLeague).map(([id, pct]) => ({
    id,
    pct,
    league: leagues.find((l) => l.id === id),
  }));

  const maxPct = Math.max(...leagueAccuracyData.map((d) => d.pct));

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📊 Estadísticas</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Rendimiento del modelo IA</Text>
        </View>

        {/* Overall Accuracy */}
        <View style={[styles.accuracyCard, { backgroundColor: colors.surface, borderColor: "#00C853" }]}>
          <View style={[styles.topAccent, { backgroundColor: "#00C853" }]} />
          <Text style={[styles.accuracyLabel, { color: colors.muted }]}>Precisión Global</Text>
          <Text style={styles.accuracyValue}>{accuracy.overall}%</Text>
          <View style={[styles.accuracyBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.accuracyFill,
                { width: `${accuracy.overall}%`, backgroundColor: "#00C853" },
              ]}
            />
          </View>
          <View style={styles.accuracyStats}>
            <View style={styles.accuracyStat}>
              <Text style={[styles.accuracyStatValue, { color: colors.foreground }]}>
                {accuracy.totalPredictions}
              </Text>
              <Text style={[styles.accuracyStatLabel, { color: colors.muted }]}>Total</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.accuracyStat}>
              <Text style={[styles.accuracyStatValue, { color: "#00C853" }]}>
                {accuracy.correctPredictions}
              </Text>
              <Text style={[styles.accuracyStatLabel, { color: colors.muted }]}>Correctas</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.accuracyStat}>
              <Text style={[styles.accuracyStatValue, { color: "#F44336" }]}>
                {accuracy.totalPredictions - accuracy.correctPredictions}
              </Text>
              <Text style={[styles.accuracyStatLabel, { color: colors.muted }]}>Incorrectas</Text>
            </View>
          </View>
        </View>

        {/* Accuracy by League */}
        <View style={styles.section}>
          <SectionHeader title="Precisión por Liga" />
          <View style={[styles.leagueCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {leagueAccuracyData.map((item, i) => (
              <View key={item.id} style={[styles.leagueRow, i < leagueAccuracyData.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border }]}>
                <View style={styles.leagueInfo}>
                  <Text style={styles.leagueEmoji}>{item.league?.emoji ?? "⚽"}</Text>
                  <Text style={[styles.leagueName, { color: colors.foreground }]}>
                    {item.league?.shortName ?? item.id}
                  </Text>
                </View>
                <View style={styles.leagueBarContainer}>
                  <View style={[styles.leagueBarBg, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.leagueBarFill,
                        {
                          width: `${(item.pct / maxPct) * 100}%`,
                          backgroundColor: item.pct >= 70 ? "#00C853" : item.pct >= 65 ? "#FF9800" : "#1565C0",
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.leaguePct,
                      { color: item.pct >= 70 ? "#00C853" : item.pct >= 65 ? "#FF9800" : "#1565C0" },
                    ]}
                  >
                    {item.pct}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Model Info */}
        <View style={styles.section}>
          <SectionHeader title="Sobre el Modelo" />
          <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <InfoRow
              label="Algoritmo"
              value="Ensemble ML + Estadísticas"
              colors={colors}
            />
            <InfoRow
              label="Variables"
              value="Forma, H2H, Posesión, Goles"
              colors={colors}
            />
            <InfoRow
              label="Ligas analizadas"
              value={`${leagues.length} ligas europeas`}
              colors={colors}
            />
            <InfoRow
              label="Actualización"
              value="Diaria"
              colors={colors}
              isLast
            />
          </View>
        </View>

        {/* Prediction Types */}
        <View style={styles.section}>
          <SectionHeader title="Distribución de Predicciones" />
          <View style={styles.predTypeRow}>
            <PredTypeCard
              label="Victoria Local"
              pct={48}
              color="#00C853"
              colors={colors}
            />
            <PredTypeCard
              label="Empate"
              pct={24}
              color="#7B9BB5"
              colors={colors}
            />
            <PredTypeCard
              label="Victoria Visitante"
              pct={28}
              color="#1565C0"
              colors={colors}
            />
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

function InfoRow({
  label,
  value,
  colors,
  isLast = false,
}: {
  label: string;
  value: string;
  colors: any;
  isLast?: boolean;
}) {
  return (
    <View
      style={[
        infoStyles.row,
        !isLast && { borderBottomWidth: 0.5, borderBottomColor: colors.border },
      ]}
    >
      <Text style={[infoStyles.label, { color: colors.muted }]}>{label}</Text>
      <Text style={[infoStyles.value, { color: colors.foreground }]}>{value}</Text>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: { fontSize: 13 },
  value: { fontSize: 13, fontWeight: "600" },
});

function PredTypeCard({
  label,
  pct,
  color,
  colors,
}: {
  label: string;
  pct: number;
  color: string;
  colors: any;
}) {
  return (
    <View
      style={[
        predStyles.card,
        { backgroundColor: colors.surface, borderColor: color + "44" },
      ]}
    >
      <Text style={[predStyles.pct, { color }]}>{pct}%</Text>
      <Text style={[predStyles.label, { color: colors.muted }]}>{label}</Text>
      <View style={[predStyles.bar, { backgroundColor: colors.border }]}>
        <View style={[predStyles.fill, { height: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const predStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    gap: 6,
  },
  pct: { fontSize: 22, fontWeight: "800" },
  label: { fontSize: 10, fontWeight: "600", textAlign: "center" },
  bar: {
    width: "100%",
    height: 50,
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  fill: { width: "100%", borderRadius: 6 },
});

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 0 },
  header: {
    paddingBottom: 16,
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E8F4FD",
  },
  subtitle: { fontSize: 13 },
  accuracyCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    gap: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  accuracyLabel: { fontSize: 13, fontWeight: "600" },
  accuracyValue: {
    fontSize: 52,
    fontWeight: "900",
    color: "#00C853",
    lineHeight: 60,
  },
  accuracyBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  accuracyFill: {
    height: "100%",
    borderRadius: 4,
  },
  accuracyStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },
  accuracyStat: { alignItems: "center", gap: 2 },
  accuracyStatValue: { fontSize: 20, fontWeight: "800" },
  accuracyStatLabel: { fontSize: 11 },
  divider: { width: 1, height: 30 },
  section: { marginBottom: 20 },
  leagueCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  leagueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  leagueInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 90,
  },
  leagueEmoji: { fontSize: 18 },
  leagueName: { fontSize: 12, fontWeight: "600" },
  leagueBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  leagueBarBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  leagueBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  leaguePct: {
    fontSize: 13,
    fontWeight: "700",
    width: 36,
    textAlign: "right",
  },
  infoCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  predTypeRow: {
    flexDirection: "row",
    gap: 10,
  },
});

import React from "react";
import { ScrollView, Text, View, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FeaturedMatchBanner } from "@/components/FeaturedMatchBanner";
import { MatchCard } from "@/components/MatchCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useFootball } from "@/hooks/useFootball";
import { useColors } from "@/hooks/use-colors";

export default function HomeScreen() {
  const router = useRouter();
  const { getFeaturedMatch, matches, getModelAccuracy } = useFootball();
  const colors = useColors();
  const featuredMatch = getFeaturedMatch();
  const accuracy = getModelAccuracy();

  const upcomingMatches = matches.filter((m) => m.status === "upcoming").slice(0, 5);

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appName}>⚽ FutbolPredictor</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>Predicciones con IA</Text>
          </View>
          <View style={[styles.accuracyBadge, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
            <Text style={styles.accuracyValue}>{accuracy.overall}%</Text>
            <Text style={styles.accuracyLabel}>Aciertos</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.statValue}>{accuracy.totalPredictions}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Predicciones</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: "#00C853" }]}>{accuracy.correctPredictions}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Correctas</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: "#1565C0" }]}>{Object.keys(accuracy.byLeague).length}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Ligas</Text>
          </View>
        </View>

        {/* Featured Match */}
        {featuredMatch && (
          <View style={styles.section}>
            <SectionHeader title="Partido Destacado" />
            <FeaturedMatchBanner
              match={featuredMatch}
              onPress={() => router.push({ pathname: '/match/[id]', params: { id: featuredMatch.id } })}
            />
          </View>
        )}

        {/* Upcoming Matches */}
        <View style={styles.section}>
          <SectionHeader
            title="Próximos Partidos"
            onSeeAll={() => router.push('/matches')}
          />
          <View style={styles.matchList}>
            {upcomingMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onPress={() => router.push({ pathname: '/match/[id]', params: { id: match.id } })}
              />
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingTop: 4,
  },
  headerLeft: {
    gap: 2,
  },
  appName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E8F4FD",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
  },
  accuracyBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
  },
  accuracyValue: {
    color: "#00C853",
    fontSize: 18,
    fontWeight: "800",
  },
  accuracyLabel: {
    color: "#00C853",
    fontSize: 10,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#E8F4FD",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
  },
  matchList: {
    gap: 12,
  },
});

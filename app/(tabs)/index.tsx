import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MatchCard } from "@/components/MatchCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useTodayMatches } from "@/application/hooks/api";
import { useColors } from "@/application/hooks/use-colors";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { data: matches, loading, error } = useTodayMatches();

  // Convertir ApiMatch a Match y separar por estado
  const convertedMatches = matches ?? [];
  const upcomingMatches = convertedMatches.filter((m) => m.status === "upcoming").slice(0, 5);
  const liveMatches = convertedMatches.filter((m) => m.status === "live");
  const featuredMatch = liveMatches[0] ?? upcomingMatches[0];

  // Calcular estadísticas simuladas (en producción, vendría del backend)
  const accuracy = {
    overall: 68,
    totalPredictions: 342,
    correctPredictions: 233,
  };

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
            <Text style={[styles.subtitle, { color: colors.muted }]}>Datos en tiempo real</Text>
          </View>
          <View style={[styles.accuracyBadge, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
            <Text style={styles.accuracyValue}>{accuracy.overall}%</Text>
            <Text style={styles.accuracyLabel}>Aciertos</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.statValue}>{convertedMatches.length}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Partidos Hoy</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: "#00C853" }]}>{liveMatches.length}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>En Vivo</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: "#1565C0" }]}>{upcomingMatches.length}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Próximos</Text>
          </View>
        </View>

        {/* Error State */}
        {error && (
          <View style={[styles.errorContainer, { backgroundColor: "#F4433622", borderColor: "#F44336" }]}>
            <Text style={[styles.errorText, { color: "#F44336" }]}>
              Error al cargar partidos. Verifica tu conexión.
            </Text>
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.section}>
            <SectionHeader title="Cargando partidos..." />
            <View style={styles.matchList}>
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </View>
          </View>
        )}

        {/* Live Matches */}
        {!loading && liveMatches.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="⚡ En Vivo Ahora" />
            <View style={styles.matchList}>
              {liveMatches.slice(0, 3).map((match: any) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onPress={() => router.push({ pathname: "/match/[id]", params: { id: match.id.toString() } })}
                />
              ))}
            </View>
          </View>
        )}

        {/* Upcoming Matches */}
        {!loading && upcomingMatches.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Próximos Partidos"
              onSeeAll={() => router.push("/matches")}
            />
            <View style={styles.matchList}>
              {upcomingMatches.map((match: any) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onPress={() => router.push({ pathname: "/match/[id]", params: { id: match.id.toString() } })}
                />
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {!loading && !error && convertedMatches.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No hay partidos disponibles en este momento
            </Text>
          </View>
        )}

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
  errorContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

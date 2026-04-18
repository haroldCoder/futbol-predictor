import React from "react";
import { ScrollView, Text, View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PredictionBar } from "@/components/PredictionBar";
import { FormIndicator } from "@/components/FormIndicator";
import { SectionHeader } from "@/components/SectionHeader";
import { TeamLogo } from "@/components/TeamLogo";
import { useColors } from "@/application/hooks/use-colors";
import { useMatch } from "@/application/hooks/api";
import { FootballDataMapper } from "@/core/infrastructure/mappers";
import { useLeagues, useTeams, useGetMatchId } from "@/application/hooks";

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const { getLeague } = useLeagues();
  const { getTeam } = useTeams();

  // 1. Intentar obtener de mock/caching via useQuery
  const { data: mockMatch, isLoading: mockLoading } = useGetMatchId(id ?? "");

  // 2. Intentar obtener de API si no es mock o si queremos datos frescos
  const { data: apiMatchData, loading: apiLoading, error: apiError } = useMatch(id ?? "");

  // Determinar cuál usar
  const match = mockMatch || (apiMatchData ? FootballDataMapper.toDomain(apiMatchData) : null);

  const isLoading = (apiLoading && !mockMatch) || (mockLoading && !id);

  if (isLoading) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00C853" />
          <Text style={{ color: colors.muted, marginTop: 12 }}>Cargando detalles...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (!match) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={styles.center}>
          <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>⚽</Text>
          <Text style={{ color: colors.foreground, marginTop: 8 }}>Partido no encontrado</Text>
          <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
            <Text style={{ color: "#00C853", fontWeight: "600" }}>Volver al inicio</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  const homeTeam = getTeam(match.homeTeamId);
  const awayTeam = getTeam(match.awayTeamId);
  const league = getLeague(match.leagueId);

  const homeName = homeTeam?.name || match.homeTeam?.name;
  const awayName = awayTeam?.name || match.awayTeam?.name;
  const homeEmoji = homeTeam?.emoji || match.homeTeam?.logoUrl;
  const awayEmoji = awayTeam?.emoji || match.awayTeam?.logoUrl;

  const predictedTeam =
    match.prediction?.predicted === "home"
      ? homeName
      : match.prediction?.predicted === "away"
        ? awayName
        : "Empate";

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={[styles.backText, { color: colors.muted }]}>Volver</Text>
        </Pressable>

        {/* League Header */}
        <View style={styles.leagueRow}>
          <Text style={styles.leagueEmoji}>{league?.emoji || "⚽"}</Text>
          <Text style={[styles.leagueName, { color: colors.muted }]}>{league?.name || match.leagueId.toUpperCase()}</Text>
          <Text style={[styles.dot, { color: colors.muted }]}>•</Text>
          <Text style={[styles.matchTime, { color: colors.muted }]}>{match.date} {match.time}</Text>
        </View>

        {/* Teams Hero */}
        <View style={[styles.teamsHero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.topAccent, { backgroundColor: "#00C853" }]} />
          <View style={styles.teamsRow}>
            <View style={styles.teamCol}>
              <TeamLogo source={homeEmoji} size={40} />
              <Text style={[styles.teamNameHero, { color: colors.foreground }]} numberOfLines={2}>
                {homeName}
              </Text>
              <Text style={[styles.teamRole, { color: colors.muted }]}>Local</Text>
            </View>

            <View style={styles.centerCol}>
              <Text style={[styles.vsHero, { color: colors.muted }]}>VS</Text>
              <View style={[styles.scorePreview, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
                <Text style={styles.scorePreviewText}>
                  {match.prediction?.predictedScore.home}-{match.prediction?.predictedScore.away}
                </Text>
              </View>
              <Text style={[styles.stadiumText, { color: colors.muted }]} numberOfLines={1}>
                {match.stadium}
              </Text>
            </View>

            <View style={[styles.teamCol, styles.teamColRight]}>
              <TeamLogo source={awayEmoji} size={40} />
              <Text style={[styles.teamNameHero, { color: colors.foreground, textAlign: "right" }]} numberOfLines={2}>
                {awayName}
              </Text>
              <Text style={[styles.teamRole, { color: colors.muted }]}>Visitante</Text>
            </View>
          </View>
        </View>

        {/* Prediction Section */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SectionHeader title="Predicción IA" />
          {match.prediction && <PredictionBar prediction={match.prediction} />}
          <View style={styles.winnerBanner}>
            <Text style={[styles.winnerLabel, { color: colors.muted }]}>Ganador Predicho</Text>
            <Text style={styles.winnerValue}>{predictedTeam}</Text>
          </View>
        </View>

        {/* Team Form */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SectionHeader title="Forma Reciente" />
          <View style={styles.formRow}>
            <View style={styles.formTeam}>
              <Text style={[styles.formTeamName, { color: colors.foreground }]}>{homeTeam?.shortName || match.homeTeam?.shortName}</Text>
              <FormIndicator form={match.homeStats?.form ?? []} />
            </View>
            <View style={styles.formTeam}>
              <Text style={[styles.formTeamName, { color: colors.foreground, textAlign: "right" }]}>
                {awayTeam?.shortName || match.awayTeam?.shortName}
              </Text>
              <FormIndicator form={match.awayStats?.form ?? []} />
            </View>
          </View>
        </View>

        {/* Key Stats */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SectionHeader title="Estadísticas Clave" />
          <StatCompareRow
            label="Goles por partido"
            home={match.homeStats?.goalsPerGame.toFixed(1) ?? "0"}
            away={match.awayStats?.goalsPerGame.toFixed(1) ?? "0"}
            homeColor={colors.foreground}
            awayColor={colors.foreground}
            mutedColor={colors.muted}
          />
          <StatCompareRow
            label="Goles concedidos"
            home={match.homeStats?.concededPerGame.toFixed(1) ?? "0"}
            away={match.awayStats?.concededPerGame.toFixed(1) ?? "0"}
            homeColor={colors.foreground}
            awayColor={colors.foreground}
            mutedColor={colors.muted}
          />
          <StatCompareRow
            label="Posesión promedio"
            home={`${match.homeStats?.possession}%`}
            away={`${match.awayStats?.possession}%`}
            homeColor={colors.foreground}
            awayColor={colors.foreground}
            mutedColor={colors.muted}
          />
          <StatCompareRow
            label="Posición en liga"
            home={`#${match.homeStats?.position}`}
            away={`#${match.awayStats?.position}`}
            homeColor={colors.foreground}
            awayColor={colors.foreground}
            mutedColor={colors.muted}
          />
          <StatCompareRow
            label="Puntos"
            home={`${match.homeStats?.points}`}
            away={`${match.awayStats?.points}`}
            homeColor="#00C853"
            awayColor="#1565C0"
            mutedColor={colors.muted}
          />
        </View>

        {/* Head to Head */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <SectionHeader title="Historial de Enfrentamientos" />
          <View style={styles.h2hRow}>
            <View style={styles.h2hBlock}>
              <Text style={[styles.h2hValue, { color: "#00C853" }]}>{match.headToHead?.homeWins}</Text>
              <Text style={[styles.h2hLabel, { color: colors.muted }]}>{homeTeam?.shortName || match.homeTeam?.shortName}</Text>
            </View>
            <View style={styles.h2hBlock}>
              <Text style={[styles.h2hValue, { color: colors.muted }]}>{match.headToHead?.draws}</Text>
              <Text style={[styles.h2hLabel, { color: colors.muted }]}>Empates</Text>
            </View>
            <View style={styles.h2hBlock}>
              <Text style={[styles.h2hValue, { color: "#1565C0" }]}>{match.headToHead?.awayWins}</Text>
              <Text style={[styles.h2hLabel, { color: colors.muted }]}>{awayTeam?.shortName || match.awayTeam?.shortName}</Text>
            </View>
          </View>

          <View style={styles.h2hBarContainer}>
            <View
              style={[
                styles.h2hBarSegment,
                {
                  flex: match.headToHead?.homeWins,
                  backgroundColor: "#00C853",
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                },
              ]}
            />
            <View style={[styles.h2hBarSegment, { flex: match.headToHead?.draws, backgroundColor: "#5A7A96" }]} />
            <View
              style={[
                styles.h2hBarSegment,
                {
                  flex: match.headToHead?.awayWins,
                  backgroundColor: "#1565C0",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            />
          </View>

          {/* Last Matches */}
          <View style={styles.lastMatchesContainer}>
            <Text style={[styles.lastMatchesTitle, { color: colors.muted }]}>Últimos Enfrentamientos</Text>
            {match.headToHead?.lastMatches.map((lm: any, i: number) => {
              const isHome = lm.homeTeamId === match.homeTeamId;
              const homeTeamName = isHome ? (homeTeam?.shortName || match.homeTeam?.shortName) : (awayTeam?.shortName || match.awayTeam?.shortName);
              const awayTeamName = isHome ? (awayTeam?.shortName || match.awayTeam?.shortName) : (homeTeam?.shortName || match.homeTeam?.shortName);
              return (
                <View key={i} style={[styles.lastMatchRow, { borderColor: colors.border }]}>
                  <Text style={[styles.lastMatchDate, { color: colors.muted }]}>{lm.date}</Text>
                  <Text style={[styles.lastMatchTeams, { color: colors.foreground }]}>
                    {homeTeamName} {lm.homeScore} - {lm.awayScore} {awayTeamName}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

function StatCompareRow({
  label,
  home,
  away,
  homeColor,
  awayColor,
  mutedColor,
}: {
  label: string;
  home: string;
  away: string;
  homeColor: string;
  awayColor: string;
  mutedColor: string;
}) {
  return (
    <View style={statStyles.row}>
      <Text style={[statStyles.value, { color: homeColor }]}>{home}</Text>
      <Text style={[statStyles.label, { color: mutedColor }]}>{label}</Text>
      <Text style={[statStyles.value, { color: awayColor, textAlign: "right" }]}>{away}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#1E3A55",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    width: 60,
  },
  label: {
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 14 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  backArrow: {
    color: "#00C853",
    fontSize: 20,
    fontWeight: "700",
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
  },
  leagueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  leagueEmoji: { fontSize: 16 },
  leagueName: { fontSize: 13, fontWeight: "600" },
  dot: { fontSize: 13 },
  matchTime: { fontSize: 12 },
  teamsHero: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  teamCol: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4,
  },
  teamColRight: { alignItems: "flex-end" },
  teamEmojiHero: { fontSize: 40 },
  teamNameHero: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  teamRole: { fontSize: 11 },
  centerCol: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  vsHero: { fontSize: 16, fontWeight: "800" },
  scorePreview: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  scorePreviewText: {
    color: "#00C853",
    fontSize: 20,
    fontWeight: "800",
  },
  stadiumText: { fontSize: 10, textAlign: "center" },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  winnerBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 4,
    padding: 10,
    backgroundColor: "#00C85311",
    borderRadius: 10,
  },
  winnerLabel: { fontSize: 13 },
  winnerValue: { color: "#00C853", fontSize: 14, fontWeight: "700" },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  formTeam: { gap: 8 },
  formTeamName: { fontSize: 13, fontWeight: "600" },
  h2hRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  h2hBlock: { alignItems: "center", gap: 4 },
  h2hValue: { fontSize: 28, fontWeight: "800" },
  h2hLabel: { fontSize: 11, fontWeight: "600" },
  h2hBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  h2hBarSegment: { height: "100%" },
  lastMatchesContainer: { gap: 8 },
  lastMatchesTitle: { fontSize: 12, fontWeight: "600" },
  lastMatchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
  },
  lastMatchDate: { fontSize: 11 },
  lastMatchTeams: { fontSize: 12, fontWeight: "600" },
});

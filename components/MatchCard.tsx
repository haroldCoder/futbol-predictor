import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Match } from "@/types/football";
import { useFootball } from "@/application/hooks/useFootball";
import { TeamLogo } from "./TeamLogo";
import { PredictionBar } from "./PredictionBar";
import { useColors } from "@/application/hooks/use-colors";

interface MatchCardProps {
  match: Match;
  onPress?: () => void;
  compact?: boolean;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  upcoming: { label: "Próximo", color: "#7B9BB5" },
  live: { label: "En Vivo", color: "#00C853" },
  finished: { label: "Finalizado", color: "#5A7A96" },
};

export function MatchCard({ match, onPress, compact = false }: MatchCardProps) {
  const { getTeam, getLeague } = useFootball();
  const colors = useColors();
  const homeTeam = getTeam(match.homeTeamId);
  const awayTeam = getTeam(match.awayTeamId);
  const league = getLeague(match.leagueId);
  const status = STATUS_LABELS[match.status];

  const predictedLabel =
    match.prediction.predicted === "home"
      ? homeTeam?.shortName || match.homeTeam?.shortName
      : match.prediction.predicted === "away"
        ? awayTeam?.shortName || match.awayTeam?.shortName
        : "Empate";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      {/* League + Status */}
      <View style={styles.topRow}>
        <View style={styles.leagueChip}>
          <Text style={styles.leagueEmoji}>{league?.emoji}</Text>
          <Text style={[styles.leagueName, { color: colors.muted }]}>{league?.shortName}</Text>
        </View>
        <View style={styles.statusRow}>
          {match.status === "live" && (
            <View style={[styles.liveDot, { backgroundColor: "#00C853" }]} />
          )}
          <Text style={[styles.statusLabel, { color: status.color }]}>{status.label}</Text>
          <Text style={[styles.time, { color: colors.muted }]}>{match.time}</Text>
        </View>
      </View>

      {/* Teams */}
      <View style={styles.teamsRow}>
        <View style={styles.teamBlock}>
          <TeamLogo source={homeTeam?.emoji || match.homeTeam?.logoUrl} size={22} />
          <Text style={[styles.teamName, { color: colors.foreground }]} numberOfLines={1}>
            {homeTeam?.shortName || match.homeTeam?.shortName}
          </Text>
        </View>

        <View style={styles.vsBlock}>
          {match.status === "finished" && match.score ? (
            <Text style={[styles.score, { color: colors.foreground }]}>
              {match.score.home} - {match.score.away}
            </Text>
          ) : (
            <Text style={[styles.vs, { color: colors.muted }]}>VS</Text>
          )}
          <View style={[styles.predictedBadge, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
            <Text style={[styles.predictedText, { color: "#00C853" }]} numberOfLines={1}>
              {predictedLabel}
            </Text>
          </View>
        </View>

        <View style={[styles.teamBlock, styles.teamBlockRight]}>
          <TeamLogo source={awayTeam?.emoji || match.awayTeam?.logoUrl} size={22} />
          <Text style={[styles.teamName, { color: colors.foreground }]} numberOfLines={1}>
            {awayTeam?.shortName || match.awayTeam?.shortName}
          </Text>
        </View>
      </View>

      {/* Prediction Bar */}
      {!compact && (
        <View style={styles.predictionSection}>
          <PredictionBar prediction={match.prediction} compact />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leagueChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  leagueEmoji: {
    fontSize: 13,
  },
  leagueName: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  time: {
    fontSize: 11,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamBlock: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4,
  },
  teamBlockRight: {
    alignItems: "flex-end",
  },
  teamEmoji: {
    fontSize: 22,
  },
  teamName: {
    fontSize: 13,
    fontWeight: "600",
  },
  vsBlock: {
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  vs: {
    fontSize: 14,
    fontWeight: "700",
  },
  score: {
    fontSize: 20,
    fontWeight: "800",
  },
  predictedBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  predictedText: {
    fontSize: 10,
    fontWeight: "700",
  },
  predictionSection: {
    marginTop: 2,
  },
});

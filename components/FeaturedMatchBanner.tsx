import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Match } from "@/types/football";
import { useFootball } from "@/application/hooks/useFootball";
import { PredictionBar } from "./PredictionBar";

interface FeaturedMatchBannerProps {
  match: Match;
  onPress?: () => void;
}

export function FeaturedMatchBanner({ match, onPress }: FeaturedMatchBannerProps) {
  const { getTeam, getLeague } = useFootball();
  const homeTeam = getTeam(match.homeTeamId);
  const awayTeam = getTeam(match.awayTeamId);
  const league = getLeague(match.leagueId);

  const predictedTeam =
    match.prediction.predicted === "home"
      ? homeTeam?.name
      : match.prediction.predicted === "away"
        ? awayTeam?.name
        : "Empate";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.9 }]}
    >
      {/* Background gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* League Badge */}
      <View style={styles.leagueBadge}>
        <Text style={styles.leagueEmoji}>{league?.emoji}</Text>
        <Text style={styles.leagueName}>{league?.name}</Text>
      </View>

      {/* Featured Label */}
      <View style={styles.featuredLabel}>
        <View style={styles.featuredDot} />
        <Text style={styles.featuredText}>PARTIDO DESTACADO</Text>
      </View>

      {/* Teams */}
      <View style={styles.teamsContainer}>
        <View style={styles.teamSide}>
          <Text style={styles.teamEmojiLarge}>{homeTeam?.emoji}</Text>
          <Text style={styles.teamNameLarge} numberOfLines={2}>{homeTeam?.name}</Text>
        </View>

        <View style={styles.centerBlock}>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.timeText}>{match.time}</Text>
          <Text style={styles.dateText}>{match.date}</Text>
        </View>

        <View style={[styles.teamSide, styles.teamSideRight]}>
          <Text style={styles.teamEmojiLarge}>{awayTeam?.emoji}</Text>
          <Text style={[styles.teamNameLarge, { textAlign: "right" }]} numberOfLines={2}>
            {awayTeam?.name}
          </Text>
        </View>
      </View>

      {/* Predicted Score */}
      <View style={styles.predictedScoreRow}>
        <Text style={styles.predictedScoreLabel}>Resultado Predicho</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>
            {match.prediction.predictedScore.home} - {match.prediction.predictedScore.away}
          </Text>
        </View>
      </View>

      {/* Prediction Bar */}
      <View style={styles.predictionBarContainer}>
        <PredictionBar prediction={match.prediction} />
      </View>

      {/* Winner Prediction */}
      <View style={styles.winnerRow}>
        <Text style={styles.winnerLabel}>Ganador Predicho: </Text>
        <Text style={styles.winnerName}>{predictedTeam}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F2236",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1E3A55",
    overflow: "hidden",
    gap: 14,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#00C853",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  leagueBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#1A3A5C",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  leagueEmoji: {
    fontSize: 14,
  },
  leagueName: {
    color: "#E8F4FD",
    fontSize: 12,
    fontWeight: "600",
  },
  featuredLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  featuredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00C853",
  },
  featuredText: {
    color: "#00C853",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamSide: {
    flex: 1,
    alignItems: "flex-start",
    gap: 6,
  },
  teamSideRight: {
    alignItems: "flex-end",
  },
  teamEmojiLarge: {
    fontSize: 36,
  },
  teamNameLarge: {
    color: "#E8F4FD",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  centerBlock: {
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  vsText: {
    color: "#7B9BB5",
    fontSize: 18,
    fontWeight: "800",
  },
  timeText: {
    color: "#E8F4FD",
    fontSize: 16,
    fontWeight: "700",
  },
  dateText: {
    color: "#7B9BB5",
    fontSize: 11,
  },
  predictedScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  predictedScoreLabel: {
    color: "#7B9BB5",
    fontSize: 12,
  },
  scoreBox: {
    backgroundColor: "#00C85322",
    borderWidth: 1,
    borderColor: "#00C853",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  scoreText: {
    color: "#00C853",
    fontSize: 16,
    fontWeight: "800",
  },
  predictionBarContainer: {
    marginTop: 2,
  },
  winnerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  winnerLabel: {
    color: "#7B9BB5",
    fontSize: 13,
  },
  winnerName: {
    color: "#00C853",
    fontSize: 13,
    fontWeight: "700",
  },
});

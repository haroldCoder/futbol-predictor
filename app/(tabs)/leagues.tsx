import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFootball } from "@/hooks/useFootball";
import { useColors } from "@/hooks/use-colors";
import { StandingEntry } from "@/types/football";

export default function LeaguesScreen() {
  const { leagues, getStandings, getTeam } = useFootball();
  const colors = useColors();
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]?.id ?? "pl");

  const standings = getStandings(selectedLeague);
  const selectedLeagueData = leagues.find((l) => l.id === selectedLeague);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Ligas</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Tablas de posiciones</Text>
      </View>

      {/* League Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.leagueScroll}
        contentContainerStyle={styles.leagueContent}
      >
        {leagues.map((league) => {
          const isActive = selectedLeague === league.id;
          return (
            <Pressable
              key={league.id}
              onPress={() => setSelectedLeague(league.id)}
              style={({ pressed }) => [
                styles.leagueChip,
                {
                  backgroundColor: isActive ? "#00C853" : colors.surface,
                  borderColor: isActive ? "#00C853" : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.leagueEmoji}>{league.emoji}</Text>
              <Text style={[styles.leagueLabel, { color: isActive ? "#050D14" : colors.muted }]}>
                {league.shortName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* League Title */}
      <View style={styles.leagueTitleRow}>
        <Text style={styles.leagueTitleEmoji}>{selectedLeagueData?.emoji}</Text>
        <View>
          <Text style={[styles.leagueTitleName, { color: colors.foreground }]}>
            {selectedLeagueData?.name}
          </Text>
          <Text style={[styles.leagueTitleCountry, { color: colors.muted }]}>
            {selectedLeagueData?.country}
          </Text>
        </View>
      </View>

      {/* Standings Table */}
      {standings.length > 0 ? (
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableHeader, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.colPos, styles.headerText, { color: colors.muted }]}>#</Text>
            <Text style={[styles.colTeam, styles.headerText, { color: colors.muted }]}>Equipo</Text>
            <Text style={[styles.colNum, styles.headerText, { color: colors.muted }]}>PJ</Text>
            <Text style={[styles.colNum, styles.headerText, { color: colors.muted }]}>G</Text>
            <Text style={[styles.colNum, styles.headerText, { color: colors.muted }]}>E</Text>
            <Text style={[styles.colNum, styles.headerText, { color: colors.muted }]}>P</Text>
            <Text style={[styles.colNum, styles.headerText, { color: colors.muted }]}>GD</Text>
            <Text style={[styles.colPts, styles.headerText, { color: "#00C853" }]}>Pts</Text>
          </View>

          <FlatList
            data={standings}
            keyExtractor={(item) => item.teamId}
            renderItem={({ item, index }) => (
              <StandingRow
                entry={item}
                index={index}
                teamName={getTeam(item.teamId)?.shortName ?? item.teamId}
                teamEmoji={getTeam(item.teamId)?.emoji ?? "⚽"}
                colors={colors}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            No hay datos para esta liga
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

function StandingRow({
  entry,
  index,
  teamName,
  teamEmoji,
  colors,
}: {
  entry: StandingEntry;
  index: number;
  teamName: string;
  teamEmoji: string;
  colors: any;
}) {
  const isTop3 = entry.position <= 3;
  const positionColor = entry.position === 1 ? "#FFD700" : entry.position === 2 ? "#C0C0C0" : entry.position === 3 ? "#CD7F32" : colors.muted;

  return (
    <View
      style={[
        rowStyles.row,
        {
          backgroundColor: index % 2 === 0 ? colors.surface : "transparent",
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[rowStyles.colPos, { color: positionColor, fontWeight: isTop3 ? "800" : "600" }]}>
        {entry.position}
      </Text>
      <View style={rowStyles.colTeam}>
        <Text style={rowStyles.teamEmoji}>{teamEmoji}</Text>
        <Text style={[rowStyles.teamName, { color: colors.foreground }]} numberOfLines={1}>
          {teamName}
        </Text>
      </View>
      <Text style={[rowStyles.colNum, { color: colors.muted }]}>{entry.played}</Text>
      <Text style={[rowStyles.colNum, { color: "#00C853" }]}>{entry.wins}</Text>
      <Text style={[rowStyles.colNum, { color: colors.muted }]}>{entry.draws}</Text>
      <Text style={[rowStyles.colNum, { color: "#F44336" }]}>{entry.losses}</Text>
      <Text style={[rowStyles.colNum, { color: entry.goalDifference >= 0 ? "#00C853" : "#F44336" }]}>
        {entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}
      </Text>
      <Text style={[rowStyles.colPts, { color: "#E8F4FD", fontWeight: "800" }]}>{entry.points}</Text>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
  },
  colPos: { width: 24, fontSize: 13 },
  colTeam: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  teamEmoji: { fontSize: 16 },
  teamName: { fontSize: 13, fontWeight: "600", flex: 1 },
  colNum: { width: 28, textAlign: "center", fontSize: 12 },
  colPts: { width: 32, textAlign: "center", fontSize: 13 },
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E8F4FD",
  },
  subtitle: {
    fontSize: 13,
  },
  leagueScroll: { maxHeight: 50 },
  leagueContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 4,
  },
  leagueChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  leagueEmoji: { fontSize: 14 },
  leagueLabel: { fontSize: 12, fontWeight: "600" },
  leagueTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leagueTitleEmoji: { fontSize: 32 },
  leagueTitleName: { fontSize: 18, fontWeight: "700" },
  leagueTitleCountry: { fontSize: 12 },
  tableContainer: { flex: 1 },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  colPos: { width: 24 },
  colTeam: { flex: 1 },
  colNum: { width: 28, textAlign: "center" },
  colPts: { width: 32, textAlign: "center" },
  headerText: { fontSize: 11, fontWeight: "700" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 15, fontWeight: "500" },
});

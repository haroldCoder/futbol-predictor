import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MatchCard } from "@/components/MatchCard";
import { useFootball } from "@/hooks/useFootball";
import { useColors } from "@/hooks/use-colors";

export default function MatchesScreen() {
  const router = useRouter();
  const { leagues, getMatchesByLeague } = useFootball();
  const colors = useColors();
  const [selectedLeague, setSelectedLeague] = useState("all");

  const allLeaguesOption = { id: "all", shortName: "Todos", emoji: "⚽" };
  const leagueOptions = [allLeaguesOption, ...leagues];

  const filteredMatches = getMatchesByLeague(selectedLeague);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⚽ Partidos</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {filteredMatches.length} partidos encontrados
        </Text>
      </View>

      {/* League Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {leagueOptions.map((league) => {
          const isActive = selectedLeague === league.id;
          return (
            <Pressable
              key={league.id}
              onPress={() => setSelectedLeague(league.id)}
              style={({ pressed }) => [
                styles.filterChip,
                {
                  backgroundColor: isActive ? "#00C853" : colors.surface,
                  borderColor: isActive ? "#00C853" : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.filterEmoji}>{league.emoji}</Text>
              <Text
                style={[
                  styles.filterLabel,
                  { color: isActive ? "#050D14" : colors.muted },
                ]}
              >
                {league.shortName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Matches List */}
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() => router.push({ pathname: "/match/[id]", params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No hay partidos disponibles
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

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
  filterScroll: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    paddingTop: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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

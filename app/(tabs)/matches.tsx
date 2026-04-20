import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, TextInput, Modal } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { MatchCard } from "@/components/MatchCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useCompetitions, useTodayMatches } from "@/application/hooks/api";
import { useColors } from "@/application/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FootballDataMapper } from "@/core/infrastructure/mappers";

export default function MatchesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { data: competitions, loading: competitionsLoading } = useCompetitions();
  const { data: allMatches, loading: matchesLoading, error: matchesError } = useTodayMatches();

  const allLeaguesOption = { id: "all" as any, shortName: "Todos", emoji: "⚽", code: "all" };
  const leagueOptions = [allLeaguesOption, ...(competitions || [])];

  const selectedLeagueObj = leagueOptions.find(l => (l.id.toString() === selectedLeague));

  // Convertir y filtrar partidos
  const convertedMatches = allMatches ?? [];
  const filteredMatches = useMemo(() => convertedMatches.filter((m) => {
    const matchesLeague = selectedLeague === "all" || m.leagueId === (selectedLeagueObj as any)?.code?.toLowerCase();
    const searchLower = searchText.toLowerCase();
    const matchesSearch = !searchText ||
      (m.homeTeam?.name?.toLowerCase().includes(searchLower) ?? false) ||
      (m.homeTeam?.shortName?.toLowerCase().includes(searchLower) ?? false) ||
      (m.awayTeam?.name?.toLowerCase().includes(searchLower) ?? false) ||
      (m.awayTeam?.shortName?.toLowerCase().includes(searchLower) ?? false);
    return matchesLeague && matchesSearch;
  }), [convertedMatches, selectedLeague, searchText]);

  return (
    <ScreenContainer containerClassName="bg-background">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>⚽ Partidos</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {matchesLoading ? "Cargando..." : `${filteredMatches.length} partidos ${selectedLeague !== "all" ? `en ${(selectedLeagueObj as any)?.name || ""}` : "encontrados"}`}
        </Text>
      </View>

      {/* League Filter & Search */}
      <View style={styles.filterRow}>
        {competitionsLoading ? (
          <View style={styles.loadingFilter}>
            <ActivityIndicator size="small" color="#00C853" />
          </View>
        ) : (
          <Pressable
            style={[styles.dropdownButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={[styles.dropdownText, { color: colors.text }]} numberOfLines={1}>
              {(selectedLeagueObj as any)?.emoji || "⚽"} {(selectedLeagueObj as any)?.shortName || (selectedLeagueObj as any)?.name}
            </Text>
            <IconSymbol name="chevron.down" size={16} color={colors.muted} />
          </Pressable>
        )}

        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar equipo..."
            placeholderTextColor={colors.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <Pressable onPress={() => setSearchText("")}>
              <IconSymbol name="xmark.circle.fill" size={18} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* League Selection Modal */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Seleccionar Competición</Text>
              <Pressable onPress={() => setIsDropdownVisible(false)}>
                <IconSymbol name="xmark.circle.fill" size={24} color={colors.muted} />
              </Pressable>
            </View>
            <FlatList
              data={leagueOptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const isActive = selectedLeague === item.id.toString();
                return (
                  <Pressable
                    style={[
                      styles.modalItem,
                      isActive && { backgroundColor: "#00C85322" }
                    ]}
                    onPress={() => {
                      setSelectedLeague(item.id.toString());
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemEmoji}>{(item as any).emoji || "⚽"}</Text>
                    <Text style={[
                      styles.modalItemLabel,
                      { color: isActive ? "#00C853" : colors.text },
                      isActive && { fontWeight: "bold" }
                    ]}>
                      {(item as any).name}
                    </Text>
                    {isActive && <IconSymbol name="checkmark.circle.fill" size={20} color="#00C853" />}
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <View style={[styles.modalSeparator, { backgroundColor: colors.border }]} />}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Error State */}
      {matchesError && (
        <View style={[styles.errorContainer, { backgroundColor: "#F4433622", borderColor: "#F44336" }]}>
          <Text style={[styles.errorText, { color: "#F44336" }]}>
            Error al cargar partidos. Verifica tu conexión.
          </Text>
        </View>
      )}

      {/* Matches List */}
      {matchesLoading ? (
        <View style={styles.listContent}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <SkeletonCard />
            </View>
          ))}
        </View>
      ) : (
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
      )}
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
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    alignItems: "center",
  },
  dropdownButton: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: 4,
  },
  searchContainer: {
    flex: 1.8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: "70%",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  modalItemEmoji: {
    fontSize: 20,
  },
  modalItemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  modalSeparator: {
    height: 1,
    marginHorizontal: 20,
    opacity: 0.5,
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
  loadingFilter: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorContainer: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

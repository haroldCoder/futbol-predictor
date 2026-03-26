import { useMemo } from "react";
import { LEAGUES, MATCHES, TEAMS, STANDINGS } from "@/data/mockData";
import { League, Match, Team, StandingEntry } from "@/types/football";

export function useFootball() {
  const leagues = useMemo(() => LEAGUES, []);
  const teams = useMemo(() => TEAMS, []);
  const matches = useMemo(() => MATCHES, []);

  const getTeam = (id: string): Team | undefined =>
    teams.find((t) => t.id === id);

  const getLeague = (id: string): League | undefined =>
    leagues.find((l) => l.id === id);

  const getMatchesByLeague = (leagueId: string): Match[] =>
    leagueId === "all" ? matches : matches.filter((m) => m.leagueId === leagueId);

  const getFeaturedMatch = (): Match | undefined =>
    matches.find((m) => m.isFeatured) ?? matches[0];

  const getMatchById = (id: string): Match | undefined =>
    matches.find((m) => m.id === id);

  const getStandings = (leagueId: string): StandingEntry[] =>
    STANDINGS[leagueId] ?? [];

  const getModelAccuracy = () => ({
    overall: 68,
    byLeague: {
      pl: 71,
      laliga: 69,
      ucl: 65,
      seriea: 67,
      bundesliga: 72,
      ligue1: 64,
    },
    totalPredictions: 342,
    correctPredictions: 233,
  });

  return {
    leagues,
    teams,
    matches,
    getTeam,
    getLeague,
    getMatchesByLeague,
    getFeaturedMatch,
    getMatchById,
    getStandings,
    getModelAccuracy,
  };
}

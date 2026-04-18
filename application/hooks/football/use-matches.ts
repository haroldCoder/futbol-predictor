import { useMemo } from "react";
import { MATCHES } from "@/data/mockData";
import { MatchModel } from "@/core/domain/models";

export function useMatches() {
    const matches = useMemo(() => MATCHES, []);

    const getMatchesByLeague = (leagueId: string): MatchModel[] =>
        leagueId === "all" ? matches : matches.filter((m) => m.leagueId === leagueId);

    const getFeaturedMatch = (): MatchModel | undefined =>
        matches.find((m) => m.isFeatured) ?? matches[0];

    const getMatchById = (id: string): MatchModel | undefined =>
        matches.find((m) => m.id === id);

    return { matches, getMatchesByLeague, getFeaturedMatch, getMatchById };
}
